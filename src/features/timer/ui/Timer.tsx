import { useAppStore } from '~/entities/app';
import { useTimerApp } from '~/features/timer';
import { getTranslation } from '~/shared/i18n/getTranslation';

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
      <h1>{getTranslation('timerAppName')} App</h1>
      <div>
        {simplifiedView}
        {timerApp.feature()}
        {timerApp.detailView()}
      </div>
    </div>
  );
};
