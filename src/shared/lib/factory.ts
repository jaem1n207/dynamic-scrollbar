/**
 * dys -> dynamic scrollbar
 */
const SUFFIX_NAME = 'dys';

export const keyFactory = (name: string) => {
  return `${SUFFIX_NAME}-${name}`;
};
