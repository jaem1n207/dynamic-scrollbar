declare type EXTResponseType = 'SUCCESS' | 'FAILED' | 'PENDING' | 'UNAUTHORIZED' | 'AUTHENTICATED';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type EXTResponse<T = any> = {
  type: EXTResponseType;
  data?: T;
};
