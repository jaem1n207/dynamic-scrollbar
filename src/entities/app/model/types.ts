import { z } from 'zod';

export const AppStatusSchema = z.object({
  isActive: z.boolean(),
  lastUsed: z.date(),
  progress: z.string(),
});

export type AppStatus = z.infer<typeof AppStatusSchema>;

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateStatus: (status: any) => AppStatus;
};
