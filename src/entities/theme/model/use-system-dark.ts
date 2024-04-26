const QUERY = '(prefers-color-scheme: dark)';

const subscribeSystemDark = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener('change', onStoreChange);

  return () => mediaQuery.removeEventListener('change', onStoreChange);
};

const getSystemDarkSnapshot = () => {
  return window.matchMedia(QUERY).matches;
};

const getServerSnapshot = () => {
  return undefined;
};

export const useSystemDark = () => {
  return useSyncExternalStore(subscribeSystemDark, getSystemDarkSnapshot, getServerSnapshot);
};
