import browser from 'webextension-polyfill';

import Logo from '~/components/Logo';
import { Timer } from '~/features/timer';
import { Button } from '~/shared/ui';

const openOptionsPage = () => {
  browser.runtime.openOptionsPage();
};

const Popup = () => {
  return (
    <main className="w-[300px] px-4 py-5 text-center">
      <Logo />
      <div>Popup</div>
      <p className="mt-2 opacity-50">This is the popup page</p>
      <Button size="sm" onClick={openOptionsPage}>
        Open Options
      </Button>
      <Timer />
    </main>
  );
};

export default Popup;
