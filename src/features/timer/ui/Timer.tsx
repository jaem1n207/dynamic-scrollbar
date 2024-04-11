import { useAppStore } from '~/entities/app';
import { useTimerApp } from '~/features/timer';

export const Timer = () => {
  const timerApp = useTimerApp();

  const { registerApp, unregisterApp, getSimplifiedView } = useAppStore();

  useEffect(() => {
    console.log(timerApp);
    registerApp(timerApp);
    return () => unregisterApp(timerApp.key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerApp, unregisterApp]);

  const simplifiedView = getSimplifiedView();

  return (
    <div>
      <h1>Timer App</h1>
      <div>
        {simplifiedView}
        {timerApp.feature()}
        {timerApp.detailView()}
      </div>
    </div>
  );
};
