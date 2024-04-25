export const useSyncLocalStorageState = <T>(key: string, defaultValue: T) => {
  const [state, setState] = useLocalStorageState<T>(key, { defaultValue });

  const getStorageSnapshot = useCallback(() => {
    return state;
  }, [state]);

  const subscribeStorage = useCallback(
    (onStoreChange: () => void) => {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key) {
          onStoreChange();
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    },
    [key],
  );

  const getServerSnapshot = useCallback(() => {
    return undefined;
  }, []);

  const syncedState = useSyncExternalStore(subscribeStorage, getStorageSnapshot, getServerSnapshot);

  useEffect(() => {
    setState(syncedState);
  }, [syncedState, setState]);

  return [syncedState, setState] as const;
};
