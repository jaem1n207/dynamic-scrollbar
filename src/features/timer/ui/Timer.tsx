import { useAppStore } from '~/entities/app';
import { useTimerApp } from '~/features/timer';

export const Timer = () => {
  const timerApp = useTimerApp();

  const { registerApp, getSimplifiedView } = useAppStore();

  useEffect(() => {
    registerApp(timerApp);
    // FIXME: 컴포넌트가 언마운트될 때 타이머 앱을 등록 해제하는 로직도 추가하기
    // return () => unregisterApp(timerApp.key);
  }, [registerApp, timerApp]);

  const simplifiedView = getSimplifiedView();

  return (
    <div>
      <h1>Timer App</h1>
      <div>
        {timerApp.feature()}
        {timerApp.detailView()}
        {simplifiedView}
      </div>
    </div>
  );
};
