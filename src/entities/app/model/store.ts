import { create } from 'zustand';

import type { App } from './types';

interface AppState {
  apps: App[];
  registerApp: (app: App) => void;
  unregisterApp: (appKey: string) => void;
  lastUsedAppKey: string | null;
  setLastUsedAppKey: (appKey: string | null) => void;
  getSimplifiedView: () => JSX.Element | null;
}

export const useAppStore = create<AppState>((set, get) => ({
  apps: [],
  registerApp: (app) => set((state) => ({ apps: [...state.apps, app] })),
  unregisterApp: (appKey) => set((state) => ({ apps: state.apps.filter((a) => a.key !== appKey) })),
  lastUsedAppKey: null,
  setLastUsedAppKey: (appKey) => set({ lastUsedAppKey: appKey }),
  getSimplifiedView: () => {
    const { apps, lastUsedAppKey } = get();
    const lastUsedApp = apps.find((app) => app.key === lastUsedAppKey);
    return lastUsedApp
      ? lastUsedApp.simplifiedView()
      : apps.length > 0
        ? apps[0].simplifiedView()
        : null;
  },
}));
