import { AppearanceSwitch } from '~/features/theme';
import { ThemeCustomizer } from '~/widgets/theme';
import IconSliders from '~icons/pixelarticons/sliders';
import IconZap from '~icons/pixelarticons/zap';

const Options = () => {
  return (
    <main className="px-4 py-10 text-center transition-colors">
      <IconSliders className="icon-btn mx-2 text-2xl" />
      <div>Options</div>
      <p className="mt-2 opacity-50">This is the options page</p>
      <ThemeCustomizer />
      <AppearanceSwitch />

      <div className="mt-4 flex items-center">
        Powered by Vite <IconZap className="align-middle" />
      </div>
    </main>
  );
};

export default Options;
