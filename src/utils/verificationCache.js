import { LRUCache } from 'lru-cache';

const VERIFICATION_CACHE_TTL = 5 * 60 * 1000; // 5분

export const verificationCache = new LRUCache({
  max: 10000,
  ttl: VERIFICATION_CACHE_TTL, // 항목 기본 TTL 5분
});

export const keyFor = (email) => `signup:${email.toLowerCase().trim()}`;
