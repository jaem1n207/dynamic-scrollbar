const MEDIA = '(prefers-color-scheme: dark)';

const subscribeSystemDark = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(MEDIA);
  mediaQuery.addEventListener('change', onStoreChange);

  return () => mediaQuery.removeEventListener('change', onStoreChange);
};

const getSystemDarkSnapshot = () => {
  return window.matchMedia(MEDIA).matches;
};

const getServerSnapshot = () => {
  return undefined;
};

export const useSystemDark = () => {
  return useSyncExternalStore(subscribeSystemDark, getSystemDarkSnapshot, getServerSnapshot);
};
