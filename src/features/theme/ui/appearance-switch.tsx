import { useDark } from '~/entities/theme';

export const AppearanceSwitch = () => {
  const { toggleDark } = useDark();

  return (
    <button type="button" onClick={toggleDark} className="flex">
      <div className="i-lucide-sun scale-100 dark:scale-0 transition-transform duration-300 rotate-0 dark:-rotate-90" />
      <div className="i-lucide-moon absolute scale-0 dark:scale-100 transition-transform duration-300 rotate-90 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
