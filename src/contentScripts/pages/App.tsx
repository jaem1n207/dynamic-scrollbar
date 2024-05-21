import 'uno.css';

import { useSystemFullscreen } from '~/shared/use';
import { DynamicScrollbar } from '~/features/dynamic-scrollbar';

export const App = () => {
  const isFullScreen = useSystemFullscreen();

  if (isFullScreen) {
    return null;
  }

  return (
    <div className="fixed h-dvh w-0 top-0 right-0 theme-slate">
      <div className="absolute w-10 select-none top-0 right-0 transform-translate-x-0 transform-translate-y-80">
        <div className="w-10 h-54 shadow-scrollbar-container rounded-6 transform-translate-x-0 transition-transform">
          {/* <Button variant="secondary" className="size-full rounded-6!">
            <IconCat />
          </Button> */}
          <DynamicScrollbar />
        </div>
      </div>
    </div>
  );
};
