import { AppearanceSwitch } from '~/features/theme';
import { ThemeCustomizer } from '~/widgets/theme';
import IconSliders from '~icons/pixelarticons/sliders';

const Options = () => {
  return (
    <main className="flex-1">
      <div border="x-2" text="sm white primary/90" className="container relative">
        <section className="mx-auto py-2 max-w-screen-lg flex flex-col items-center gap-2 md:pb-8 lg:pb-20">
          <h1 className="text-center text-3xl">Dynamic Scrollbar Options</h1>
        </section>
      </div>
      <IconSliders className="icon-btn mx-2 text-2xl" />
      <p className="mt-2 opacity-50">This is the options page</p>
      <ThemeCustomizer />
      <AppearanceSwitch />
    </main>
  );
};

export default Options;
