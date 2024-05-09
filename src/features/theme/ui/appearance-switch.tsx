import { transitionViewIfSupported } from '~/shared/lib';
import { useDark } from '~/entities/theme';
import { Button } from '~/shared/ui';
import { usePrefersReducedMotion } from '~/shared/use/use-prefers-reduced-motion';

export const AppearanceSwitch = () => {
  const { isDark, toggleTheme } = useDark();
  const prefersReducedMotion = usePrefersReducedMotion();
  const handleToggleTheme = () => {
    prefersReducedMotion
      ? toggleTheme()
      : transitionViewIfSupported(() => {
          toggleTheme();
        });
  };

  return (
    <Button variant="ghost" onClick={handleToggleTheme} aria-pressed={isDark}>
      <div className="i-radix-icons:sun size-4 scale-100 dark:scale-0 transition-transform duration-300 rotate-0 dark:-rotate-90" />
      <div className="i-radix-icons:moon size-4 absolute scale-0 dark:scale-100 transition-transform duration-300 rotate-90 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
