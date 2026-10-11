export interface MappedError {
  userMessage: string;
  code: string;
  retryable: boolean;
}

const ERROR_MESSAGE_MAP: Record<string, string> = {
  ERR_INSUFFICIENT_FUNDS: 'Insufficient balance to complete the requested transaction.',
  ERR_SLIPPAGE_EXCEEDED: 'Slippage limit exceeded. Try increasing slippage tolerance.',
  ERR_NONCE_MISMATCH: 'Session authentication expired. Please reconnect your wallet.',
  ERR_RATE_LIMIT: 'Request limit reached. Please wait a moment before trying again.',
  ERR_NETWORK_TIMEOUT: 'Network request timed out. Please check your connection.',
  ERR_TRANSACTION_REJECTED: 'Transaction was cancelled by user.'
};

export function mapApiError(err: unknown): MappedError {
  if (typeof err === 'object' && err !== null) {
    const errorObj = err as Record<string, unknown>;
    const code = typeof errorObj.code === 'string' ? errorObj.code : 'ERR_UNKNOWN';
    if (ERROR_MESSAGE_MAP[code]) {
      return {
        userMessage: ERROR_MESSAGE_MAP[code],
        code,
        retryable: code === 'ERR_RATE_LIMIT' || code === 'ERR_NETWORK_TIMEOUT'
      };
    }
    if (typeof errorObj.message === 'string' && errorObj.message.includes('User rejected')) {
      return {
        userMessage: ERROR_MESSAGE_MAP.ERR_TRANSACTION_REJECTED,
        code: 'ERR_TRANSACTION_REJECTED',
        retryable: false
      };
    }
  }
  return {
    userMessage: 'An unexpected transaction error occurred. Please try again.',
    code: 'ERR_UNKNOWN',
    retryable: true
  };
}