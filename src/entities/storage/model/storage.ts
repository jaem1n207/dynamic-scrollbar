import { useWebExtensionStorageLocal } from './useWebExtensionStorage';

export const useStorageDemo = () => {
  return useWebExtensionStorageLocal('webext-demo', 'Storage Demo');
};

export const useStorageTheme = () => {
  return useWebExtensionStorageLocal('theme', 'dark');
};
