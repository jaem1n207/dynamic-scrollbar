import type { Options, Theme } from '~/entities/theme/lib';
import { isDarkMode, mergeDefaultOptions } from '~/entities/theme/lib';
import { useSystemDark } from '~/entities/theme/model/use-system-dark';

export const useDark = (options?: Options) => {
  const { storageKey } = mergeDefaultOptions(options);

  const [theme, setTheme] = useLocalStorageState<Theme>(storageKey, {
    defaultValue: 'system',
  });
  const isSystemDark = useSystemDark();

  const isDark = useMemo(() => isDarkMode(theme, isSystemDark), [theme, isSystemDark]);

  const toggleDark = () => {
    theme === 'system' ? setTheme(isSystemDark ? 'light' : 'dark') : setTheme('system');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);

    if ((theme === 'dark' && isSystemDark) || (theme === 'light' && !isSystemDark)) {
      setTheme('system');
    }
  }, [isDark, isSystemDark, setTheme, theme]);

  return { isDark, toggleDark };
};
