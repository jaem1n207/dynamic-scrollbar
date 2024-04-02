import Logo from '~/components/Logo';
import { useStorageDemo } from '~/logic/storage';

const openOptionsPage = () => {
  browser.runtime.openOptionsPage();
};

const Popup = () => {
  const [storageDemo] = useStorageDemo();

  return (
    <main className="w-[300px] px-4 py-5 text-center text-gray-700">
      <Logo />
      <div>Popup</div>
      <p className="mt-2 opacity-50">This is the popup page</p>
      <button className="btn mt-2" onClick={openOptionsPage}>
        Open Options
      </button>
      <div className="mt-2">
        <span className="opacity-50">Storage: {storageDemo}</span>
      </div>
    </main>
  );
};

export default Popup;