import { Button } from '~/shared/ui';

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

export const ThemeSwitch = () => {
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
    <div className="space-y-4">
      <p>Color</p>
      <div className="grid grid-cols-6 gap-2">
        {builtinColors.map((color) => (
          <Button
            key={color}
            onClick={() => handleConfigChange('theme', color)}
            variant={color === config?.theme ? 'default' : 'secondary'}
          >
            {color}
          </Button>
        ))}
      </div>
      <p>Radius</p>
      <div className="flex gap-2">
        {builtinRadiuses.map((radius) => (
          <Button
            key={radius}
            onClick={() => handleConfigChange('radius', radius)}
            variant={radius === config?.radius ? 'default' : 'secondary'}
          >
            {radius}
          </Button>
        ))}
      </div>
    </div>
  );
};
