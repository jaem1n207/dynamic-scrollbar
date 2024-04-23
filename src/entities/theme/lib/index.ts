export type Options = {
  /**
   * @default 'theme'
   */
  storageKey?: string;
};

export const mergeDefaultOptions = (options?: Options): Required<Options> => {
  return {
    storageKey: 'theme',
    ...options,
  };
};

export type Theme = 'system' | 'light' | 'dark';

export const isDarkMode = (theme?: Theme | null, isSystemDark?: boolean | null) => {
  return theme === 'dark' || (!!isSystemDark && theme !== 'light');
};
