import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Theme } from '~/entities/theme/types';

interface ThemeState {
  theme: Theme;
  isSystemDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      isSystemDark: false,
      toggleTheme: () => {
        const { theme, isSystemDark } = get();
        if (theme === 'system') {
          set({ theme: isSystemDark ? 'light' : 'dark' });
        } else {
          set({ theme: 'system' });
        }
      },
    }),
    {
      name: 'theme',
    },
  ),
);
