import IconCat from '~icons/arcticons/cats-and-soup';
import 'uno.css';

import { Button } from '~/shared/ui';

const subscribeSystemFullscreen = (onStoreChange: () => void) => {
  document.addEventListener('fullscreenchange', onStoreChange);

  return () => document.removeEventListener('fullscreenchange', onStoreChange);
};

const getSystemFullscreenSnapshot = () => {
  return document.fullscreenElement !== null;
};

const getServerSnapshot = () => {
  return undefined;
};

const useSystemFullscreen = () => {
  return useSyncExternalStore(
    subscribeSystemFullscreen,
    getSystemFullscreenSnapshot,
    getServerSnapshot,
  );
};

export const App = () => {
  const isFullScreen = useSystemFullscreen();

  if (isFullScreen) {
    return null;
  }

  return (
    <div className="fixed h-dvh w-0 top-0 right-0 theme-blue">
      <div className="absolute w-14 select-none top-0 right-0 transform-translate-x-0 transform-translate-y-80">
        <div className="w-14 h-64 shadow-scrollbar-container rounded-6 cursor-pointer bg-primary transform-translate-x-0 transition-transform">
          <Button className="size-full rounded-6!">
            <IconCat />
          </Button>
        </div>
      </div>
    </div>
  );
};
