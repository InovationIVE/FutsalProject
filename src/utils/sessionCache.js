import { LRUCache } from 'lru-cache';
import 'dotenv/config';

// --- 상수 정의 ---
const LRU_TTL_SECONDS = parseInt(process.env.LRU_TTL_SECONDS, 10) || 300; // 기본값 5분
const NEGATIVE_TTL_SECONDS = parseInt(process.env.NEGATIVE_TTL_SECONDS, 10) || 60; // 기본값 1분
const LRU_MAX_ENTRIES = parseInt(process.env.LRU_MAX_ENTRIES, 10) || 5000; // 기본값 5000개

// --- LRU 캐시 옵션 ---
const sessionCacheOptions = {
  max: LRU_MAX_ENTRIES,
  ttl: LRU_TTL_SECONDS * 1000, // ms 단위로 설정
  ttlAutopurge: true,
};

const negativeSessionCacheOptions = {
  max: LRU_MAX_ENTRIES,
  ttl: NEGATIVE_TTL_SECONDS * 1000, // ms 단위로 설정
  ttlAutopurge: true,
};

// --- 캐시 인스턴스 생성 및 export ---
export const sessionCache = new LRUCache(sessionCacheOptions); // 유효한 토큰을 기본본 1시간 동안 저장합니다.
export const negativeSessionCache = new LRUCache(negativeSessionCacheOptions); // 유효하지 않은 토큰을 일시적으로 5분 동안 저장합니다.

/**
 * 세션 캐시에 토큰과 페이로드를 저장합니다. (TTL 로직 포함)
 * @param {string} token - 저장할 세션 토큰
 * @param {object} payload - 저장할 페이로드 (e.g., { accountId, expiresAt })
 * @param {number} ttlSeconds - 이 항목에 대한 특정 TTL (초 단위)
 */
sessionCache.setWithTTL = function (token, payload, ttlSeconds) {
  // DB의 남은 유효시간과 LRU의 기본 TTL 중 더 짧은 시간을 사용
  const effectiveTTL = Math.min(ttlSeconds, LRU_TTL_SECONDS);
  this.set(token, payload, { ttl: effectiveTTL * 1000 });
};

// lru-cache의 delete가 예약어와 충돌할 수 있으므로 'del' 별칭을 제공합니다.
sessionCache.del = sessionCache.delete;

/**
 * 네거티브 캐시에 유효하지 않은 토큰을 기록합니다.
 * @param {string} token - 기록할 유효하지 않은 토큰
 */
negativeSessionCache.setNegative = function (token) {
  this.set(token, true);
};

/**
 * 해당 토큰이 네거티브 캐시에 있는지 확인합니다.
 * @param {string} token - 확인할 토큰
 * @returns {boolean} - 네거티브 캐시에 있으면 true, 아니면 false
 */
negativeSessionCache.isNegative = function (token) {
  return this.has(token);
};
