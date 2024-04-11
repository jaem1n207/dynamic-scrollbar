import { useWebExtensionStorageLocal } from './use-web-extension-storage';

export const useStorageDemo = () => {
  return useWebExtensionStorageLocal('webext-demo', 'Storage Demo');
};

export const useStorageTheme = () => {
  return useWebExtensionStorageLocal('theme', 'dark');
};
