import { useWebExtensionStorageLocal } from '~/hooks/useWebExtensionStorage';

export function useStorageDemo() {
  return useWebExtensionStorageLocal('webext-demo', 'Storage Demo');
}
