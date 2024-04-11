import { type Storage, storage } from 'webextension-polyfill';
import { z } from 'zod';

type StorageMap = {
  'webext-demo': string;
  theme: 'light' | 'dark' | 'purple';
};

const storageMapSchema = z.object({
  'webext-demo': z.string(),
  theme: z.union([z.literal('light'), z.literal('dark'), z.literal('purple')]),
});

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

export const useWebExtensionStorageLocal = <K extends keyof StorageMap>(
  key: K,
  initialValue: StorageMap[K],
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
        if (value === null && writeDefaults) {
          value = JSON.stringify(initialValue);
          await storageLocalInterface.setItem(key, value);
        }
        if (isMounted) {
          setStoredValue(value !== null ? JSON.parse(value) : initialValue);
        }
      } catch (error) {
        onError(error);
      }
    };

    init();

    if (listenToStorageChanges) {
      const handleChange = (changes: Record<string, Storage.StorageChange>, areaName: string) => {
        if (areaName === 'local' && changes[key]?.newValue !== undefined) {
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

  const setValue = async (newValue: StorageMap[K]) => {
    try {
      const validatedValue = storageMapSchema.shape[key].parse(newValue);

      const stringValue = JSON.stringify(validatedValue);
      await storageLocalInterface.setItem(key, stringValue);
      setStoredValue(newValue);
    } catch (error) {
      onError(error);
    }
  };

  return [storedValue, setValue] as const;
};
