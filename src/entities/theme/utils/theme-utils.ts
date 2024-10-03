import type { EffectiveTheme, ThemePreference } from '../types';

/**
 * @name getEffectiveTheme
 * @description
 * 현재 설정과 시스템 테마를 고려해 실제 적용되는 테마를 반환합니다.
 * ```typescript
 * getEffectiveTheme(
 *    // 사용자 설정 테마
 *    preference: 'system' | 'light' | 'dark',
 *    // 시스템 테마가 다크 모드인지 여부
 *    isSystemDark: boolean,
 *  ): 'light' | 'dark';
 * ```
 * @example
 * getEffectiveTheme('system', true); // 'dark'
 * getEffectiveTheme('system', false); // 'light'
 * getEffectiveTheme('light', true); // 'light'
 * getEffectiveTheme('dark', false); // 'dark'
 */
export const getEffectiveTheme = (
  preference: ThemePreference,
  isSystemDark: boolean,
): EffectiveTheme => {
  if (preference === 'system') {
    return isSystemDark ? 'dark' : 'light';
  }

  return preference;
};

/**
 * @name getNextTheme
 * @description
 * 현재 설정과 시스템 테마를 고려해 다음 테마를 결절해 반환합니다.
 * ```typescript
 * getNextTheme(
 *   // 현재 설정
 *   currentPreference: 'system' | 'light' | 'dark',
 *   // 시스템 테마가 다크 모드인지 여부
 *   isSystemDark: boolean,
 * ): 'system' | 'light' | 'dark';
 * ```
 * @example
 * getNextTheme('system', true); // 'light'
 * getNextTheme('system', false); // 'dark'
 * getNextTheme('light', true); // 'dark'
 */
export const getNextTheme = (
  currentPreference: ThemePreference,
  isSystemDark: boolean,
): ThemePreference => {
  if (currentPreference === 'system') {
    return isSystemDark ? 'light' : 'dark';
  }

  return 'system';
};
