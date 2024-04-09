import { z } from 'zod';

export type App = {
  key: string;
  /**
   * 기능을 실행하는 메소드
   */
  feature(): JSX.Element;
  /**
   * 상세 화면을 반환하는 메소드
   */
  detailView(): JSX.Element;
  /**
   * 간소화된 화면을 반환하는 메소드
   */
  simplifiedView(): JSX.Element;
  /**
   * 상태의 유효성을 검사하는 메소드
   */
  validateStatus: (status: any) => AppStatus;
};

export type AppState = {
  apps: App[];
  registerApp: (app: App) => void;
  unregisterApp: (appKey: string) => void;
  lastUsedAppKey: string | null;
  setLastUsedAppKey: (appKey: string | null) => void;
  getSimplifiedView: () => JSX.Element | null;
};

export const AppStatusSchema = z.object({
  isActive: z.boolean(),
  lastUsed: z.date(),
  progress: z.string(),
});

export type AppStatus = z.infer<typeof AppStatusSchema>;
