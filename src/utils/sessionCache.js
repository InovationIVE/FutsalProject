import { LRUCache } from 'lru-cache';

// --- 정책 상수 ---
const LRU_TTL_SECONDS = 60; // LRU 캐시 항목의 기본 TTL (60초)
const NEGATIVE_CACHE_TTL_SECONDS = 10; // 네거티브 캐시 TTL (10초)
const MAX_ITEMS = 5000; // 캐시에 저장할 최대 항목 수

// --- 캐시 인스턴스 ---

// 세션 정보를 저장하는 기본 캐시
const sessionCache = new LRUCache({
  max: MAX_ITEMS,
  ttl: LRU_TTL_SECONDS * 1000, // TTL은 밀리초 단위로 설정
});

// 유효하지 않은 토큰 정보를 잠시 저장하는 네거티브 캐시
const negativeCache = new LRUCache({
  max: MAX_ITEMS,
  ttl: NEGATIVE_CACHE_TTL_SECONDS * 1000,
});

// --- 캐시 유틸리티 함수 ---

/**
 * 세션 캐시에서 토큰에 해당하는 페이로드를 조회합니다.
 * @param {string} token - 조회할 세션 토큰
 * @returns {object | undefined} - 캐시된 페이로드 또는 undefined
 */
const get = (token) => {
  return sessionCache.get(token);
};

/**
 * 세션 캐시에 토큰과 페이로드를 저장합니다.
 * @param {string} token - 저장할 세션 토큰
 * @param {object} payload - 저장할 페이로드 (e.g., { accountId, expiresAt })
 * @param {number} ttlSeconds - 이 항목에 대한 특정 TTL (초 단위)
 */
const set = (token, payload, ttlSeconds) => {
  // DB의 남은 유효시간과 LRU의 기본 TTL 중 더 짧은 시간을 사용
  const effectiveTTL = Math.min(ttlSeconds, LRU_TTL_SECONDS);
  sessionCache.set(token, payload, { ttl: effectiveTTL * 1000 });
};

/**
 * 세션 캐시에서 토큰을 삭제합니다.
 * @param {string} token - 삭제할 세션 토큰
 */
const del = (token) => {
  sessionCache.delete(token);
};

/**
 * 네거티브 캐시에 유효하지 않은 토큰을 기록합니다.
 * @param {string} token - 기록할 유효하지 않은 토큰
 */
const setNegative = (token) => {
  negativeCache.set(token, true);
};

/**
 * 해당 토큰이 네거티브 캐시에 있는지 확인합니다.
 * @param {string} token - 확인할 토큰
 * @returns {boolean} - 네거티브 캐시에 있으면 true, 아니면 false
 */
const isNegative = (token) => {
  return negativeCache.has(token);
};

export const cache = {
  get,
  set,
  del,
  setNegative,
  isNegative,
};
