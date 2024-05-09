import { useDark } from '~/entities/theme';
import { themes } from '~/features/theme/const/themes';
import { cn } from '~/shared/lib/utils';
import { Button, Label } from '~/shared/ui';
import { Paragraph } from '~/shared/ui/typography';
import IconCheck from '~icons/lucide/check';
import IconsReset from '~icons/radix-icons/reset';

const builtinColors = themes.map((theme) => theme.name);
const builtinRadiuses = [0, 0.3, 0.5, 0.75, 1] as const;
const DEFAULT_CONFIG: Config = {
  theme: 'neutral',
  radius: 0.5,
};

type Config = {
  theme: (typeof builtinColors)[number];
  radius: (typeof builtinRadiuses)[number];
};

export const ThemeCustomizer = () => {
  const { isDark } = useDark();
  const [config, setConfig] = useLocalStorageState<Config>('config', {
    defaultValue: DEFAULT_CONFIG,
  });

  const handleColorChange = (theme: Config['theme']) => {
    document.body.classList.remove(`theme-${config?.theme}`);
    document.body.classList.add(`theme-${theme}`);
    setConfig((prev) => ({
      ...(prev ?? DEFAULT_CONFIG),
      theme,
    }));
  };

  const handleRadiusChange = (radius: Config['radius']) => {
    document.body.style.setProperty('--radius', `${radius}rem`);
    setConfig((prev) => ({
      ...(prev ?? DEFAULT_CONFIG),
      radius,
    }));
  };

  const handleReset = () => {
    document.body.classList.remove(`theme-${config?.theme}`);
    document.body.classList.add(`theme-${DEFAULT_CONFIG.theme}`);
    document.body.style.setProperty('--radius', `${DEFAULT_CONFIG.radius}rem`);
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <div className="flex flex-col space-y-4 md:space-y-6">
      <div className="flex items-start pt-4 md:pt-0">
        <div className="space-y-1 pr-2">
          <Paragraph size="lg">Customize</Paragraph>
          <Paragraph size="sm" variant="muted">
            Pick your favorite theme and radius.
          </Paragraph>
        </div>
        <Button variant="ghost" size="icon" onClick={handleReset}>
          <IconsReset className="size-4" />
        </Button>
      </div>
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <Label>Color</Label>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((theme) => {
              const isActive = config?.theme === theme.name;

              return (
                <Button
                  variant={'outline'}
                  size="sm"
                  key={theme.name}
                  onClick={() => {
                    handleColorChange(theme.name);
                  }}
                  className={cn('justify-start', isActive && 'border-2 border-primary')}
                  style={
                    {
                      '--theme-primary': `hsl(${theme.activeColor[isDark ? 'dark' : 'light']})`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      'mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]',
                    )}
                  >
                    {isActive && <IconCheck className="h-4 w-4 text-white" />}
                  </span>
                  {theme.label}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Radius</Label>
          <div className="grid grid-cols-5 gap-2">
            {builtinRadiuses.map((radius) => (
              <Button
                key={radius}
                onClick={() => {
                  handleRadiusChange(radius);
                }}
                variant={radius === config?.radius ? 'default' : 'secondary'}
              >
                {radius}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
