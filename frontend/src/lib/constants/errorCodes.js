// lib/constants/errorCodes.js
export const ERROR_CODES = {
  AUTH_FAILED: {
    code: 'AUTH_001',
    message: 'Invalid email or password.',
  },
  SESSION_EXPIRED: {
    code: 'AUTH_002',
    message: 'Your session has expired. Please log in again.',
  },
  NETWORK_ERROR: {
    code: 'NET_001',
    message: 'Network issue. Please check your internet connection.',
  },
  FORM_INVALID: {
    code: 'FORM_001',
    message: 'Some fields are invalid or missing.',
  },
  UNKNOWN: {
    code: 'GEN_000',
    message: 'Unexpected error occurred. Please try again later.',
  },
};
