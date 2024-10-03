import { useSystemDark } from '~/entities/theme/model/use-system-dark';
import { useThemePreferenceStore } from '~/entities/theme/model/use-theme-store';
import { getEffectiveTheme, getNextTheme } from '../utils/theme-utils';

export const useDark = (): { isDark: boolean; toggleTheme: () => void } => {
  const { preference, setPreference } = useThemePreferenceStore();
  const isSystemDark = useSystemDark() || false;

  const effectiveTheme = useMemo(
    () => getEffectiveTheme(preference, isSystemDark),
    [preference, isSystemDark],
  );

  const toggleTheme = useCallback(() => {
    const nextPreference = getNextTheme(preference, isSystemDark);
    setPreference(nextPreference);
  }, [preference, isSystemDark, setPreference]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark');
  }, [effectiveTheme]);

  return { isDark: effectiveTheme === 'dark', toggleTheme };
};
