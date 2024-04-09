import { useCallback } from 'react';
import { type App, type AppStatus, AppStatusSchema } from '~/entities/app';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateTimerStatus = (status: any): AppStatus => {
  return AppStatusSchema.parse(status);
};

export const useTimerApp = (): App => {
  const feature = useCallback(() => {
    return <div>Timer Feature</div>;
  }, []);

  const detailView = useCallback(() => {
    return <div>Timer Settings</div>;
  }, []);

  const simplifiedView = useCallback(() => {
    return <div>Remaining Time: 00:00</div>;
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateStatus = useCallback((status: any) => {
    return validateTimerStatus(status);
  }, []);

  return {
    key: 'timerApp',
    feature,
    detailView,
    simplifiedView,
    validateStatus,
  };
};
