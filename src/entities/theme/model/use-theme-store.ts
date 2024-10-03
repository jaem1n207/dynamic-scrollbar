import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ThemePreference } from '../types';

interface ThemePreferenceState {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

/** 사용자의 선호 테마 저장 및 관리 */
export const useThemePreferenceStore = create<ThemePreferenceState>()(
  persist(
    (set) => ({
      preference: 'system',
      setPreference: (preference: ThemePreference) => set({ preference }),
    }),
    {
      name: 'theme-preference',
    },
  ),
);
