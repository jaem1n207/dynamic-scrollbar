import { useThemeStore } from '~/entities/theme';
import { useSystemDark } from '~/entities/theme/model/use-system-dark';
import type { Theme } from '~/entities/theme/types';

const isDarkMode = (theme?: Theme | null, isSystemDark?: boolean | null) => {
  return theme === 'dark' || (!!isSystemDark && theme !== 'light');
};

export const useDark = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isSystemDark = useSystemDark();

  useEffect(() => {
    useThemeStore.setState({ isSystemDark });
  }, [isSystemDark]);

  const isDark = useMemo(() => isDarkMode(theme, isSystemDark), [theme, isSystemDark]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    if ((theme === 'dark' && isSystemDark) || (theme === 'light' && !isSystemDark)) {
      toggleTheme();
    }
  }, [isDark, theme, isSystemDark, toggleTheme]);

  return { isDark, toggleTheme };
};
