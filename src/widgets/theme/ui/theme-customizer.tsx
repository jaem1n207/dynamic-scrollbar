import { useDark } from '~/entities/theme';
import { themes } from '~/features/theme/const/themes';
import { cn } from '~/shared/lib/utils';
import { Button, Label } from '~/shared/ui';
import CheckIcon from '~icons/lucide/check';

const builtinColors = [
  'zinc',
  'slate',
  'stone',
  'gray',
  'neutral',
  'red',
  'rose',
  'orange',
  'green',
  'blue',
  'yellow',
  'violet',
] as const;
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

  const handleConfigChange = (key: keyof Config, value: Config[keyof Config]) => {
    if (typeof value === 'string' && key === 'theme') {
      document.body.classList.remove(`theme-${config?.theme}`);
      document.body.classList.add(`theme-${value}`);
    } else if (typeof value === 'number' && key === 'radius') {
      document.body.style.setProperty('--radius', `${value}rem`);
    }

    if (config === undefined) {
      return setConfig(DEFAULT_CONFIG);
    }
    setConfig({ ...config, [key]: value });
  };

  return (
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
                handleConfigChange('theme', theme.name);
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
                {isActive && <CheckIcon className="h-4 w-4 text-white" />}
              </span>
              {theme.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
