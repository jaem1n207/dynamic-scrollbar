import { type Storage, storage } from 'webextension-polyfill';

type WebExtensionStorageOptions = {
  listenToStorageChanges?: boolean;
  writeDefaults?: boolean;
  onError?: (error: unknown) => void;
};

type Awaitable<T> = Promise<T> | T;

type StorageLikeAsync = {
  getItem: (key: string) => Awaitable<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

const storageLocalInterface: StorageLikeAsync = {
  async getItem(key: string) {
    const storedData = await storage.local.get(key);
    return storedData[key];
  },
  setItem(key: string, value: string) {
    return storage.local.set({ [key]: value });
  },
  removeItem(key: string) {
    return storage.local.remove(key);
  },
};

const storageSyncInterface: StorageLikeAsync = {
  async getItem(key: string) {
    const storedData = await storage.sync.get(key);
    return storedData[key];
  },
  setItem(key: string, value: string) {
    return storage.sync.set({ [key]: value });
  },
  removeItem(key: string) {
    return storage.sync.remove(key);
  },
};

const prepareSyncStorage = async (value: string) => {
  const bytesInUse = await storage.sync.getBytesInUse();
  const newValueSize = new TextEncoder().encode(JSON.stringify(value)).length;
  const totalSize = bytesInUse + newValueSize;

  if (newValueSize > 8192) {
    throw new Error('The item size exceeds the maximum limit of 8,192 bytes.');
  }
  if (totalSize > 102400) {
    throw new Error('Storing the item would exceed the total storage limit of 102,400 bytes.');
  }

  return value;
};

export const useWebExtensionStorageLocal = <T>(
  key: string,
  initialValue: T,
  options: WebExtensionStorageOptions = {},
) => {
  const {
    listenToStorageChanges = true,
    writeDefaults = true,
    onError = (e) => {
      console.error(e);
    },
  } = options;

  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        let value = await storageLocalInterface.getItem(key);
        if (value == null && writeDefaults) {
          value = JSON.stringify(initialValue);
          await storageLocalInterface.setItem(key, value);
        }
        if (isMounted) {
          setStoredValue(value != null ? JSON.parse(value) : initialValue);
        }
      } catch (error) {
        onError(error);
      }
    };

    init();

    if (listenToStorageChanges) {
      const handleChange = (changes: Record<string, Storage.StorageChange>, areaName: string) => {
        if (areaName === 'loca' && changes[key]?.newValue !== undefined) {
          setStoredValue(JSON.parse(changes[key].newValue));
        }
      };

      storage.onChanged.addListener(handleChange);
      return () => {
        storage.onChanged.removeListener(handleChange);
        isMounted = false;
      };
    }
  }, [initialValue, key, listenToStorageChanges, onError, writeDefaults]);

  const setValue = async (newValue: T) => {
    try {
      const stringValue = JSON.stringify(newValue);
      await storageLocalInterface.setItem(key, stringValue);
      setStoredValue(newValue);
    } catch (error) {
      onError(error);
    }
  };

  return [storedValue, setValue] as const;
};

export const useWebExtensionStorageSync = <T>(
  key: string,
  initialValue: T,
  options: WebExtensionStorageOptions = {},
) => {
  const {
    listenToStorageChanges = true,
    writeDefaults = true,
    onError = (e) => {
      console.error(e);
    },
  } = options;

  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        let value = await storageSyncInterface.getItem(key);
        if (value == null && writeDefaults) {
          value = JSON.stringify(initialValue);
          await storageSyncInterface.setItem(key, value);
        }
        if (isMounted) {
          setStoredValue(value != null ? JSON.parse(value) : initialValue);
        }
      } catch (error) {
        onError(error);
      }
    };

    init();

    if (listenToStorageChanges) {
      const handleChange = (changes: Record<string, Storage.StorageChange>, areaName: string) => {
        if (areaName === 'sync' && changes[key]?.newValue !== undefined) {
          setStoredValue(JSON.parse(changes[key].newValue));
        }
      };

      storage.onChanged.addListener(handleChange);
      return () => {
        storage.onChanged.removeListener(handleChange);
        isMounted = false;
      };
    }
  }, [initialValue, key, listenToStorageChanges, onError, writeDefaults]);

  const setValue = async (newValue: T) => {
    try {
      const stringValue = JSON.stringify(newValue);
      const preparedValue = await prepareSyncStorage(stringValue);
      await storageSyncInterface.setItem(key, preparedValue);
      setStoredValue(newValue);
    } catch (error) {
      onError(error);
    }
  };

  return [storedValue, setValue] as const;
};
