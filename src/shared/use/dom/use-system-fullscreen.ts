const subscribeSystemFullscreen = (onStoreChange: () => void) => {
  document.addEventListener('fullscreenchange', onStoreChange);

  return () => document.removeEventListener('fullscreenchange', onStoreChange);
};

const getSystemFullscreenSnapshot = () => {
  return document.fullscreenElement !== null;
};

const getServerSnapshot = () => {
  return undefined;
};

export const useSystemFullscreen = () => {
  return useSyncExternalStore(
    subscribeSystemFullscreen,
    getSystemFullscreenSnapshot,
    getServerSnapshot,
  );
};
