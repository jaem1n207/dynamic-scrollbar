import Logo from '~/components/Logo';
import { useStorageDemo } from '~/entities/storage';

const Sidebar = () => {
  const [storageDemo] = useStorageDemo();

  return (
    <main className="w-[300px] px-4 py-5 text-center">
      <Logo />
      <p className="mt-2">This is the sidebar page</p>
      <span>{storageDemo}</span>
    </main>
  );
};

export default Sidebar;
