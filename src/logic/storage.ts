import { useWebExtensionStorageLocal } from '~/shared/model/useWebExtensionStorage';

export function useStorageDemo() {
  return useWebExtensionStorageLocal('webext-demo', 'Storage Demo');
}
