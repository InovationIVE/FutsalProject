import { SESSION_DURATION_MINUTES, VERIFICATION_MINUTES } from '../constants/auth.constants.js';

const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: SESSION_DURATION_MINUTES * 60 * 1000,
};

const verificationCookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: VERIFICATION_MINUTES * 60 * 1000,
};

export const setSessionCookie = (res, token) => {
  res.cookie('sessionToken', token, sessionCookieOptions);
};

export const clearSessionCookie = (res) => {
  res.clearCookie('sessionToken', sessionCookieOptions);
};

export const setVerificationCookie = (res, token) => {
  res.cookie('signupToken', token, verificationCookieOptions);
};

export const clearVerificationCookie = (res) => {
  res.clearCookie('signupToken', verificationCookieOptions);
};
