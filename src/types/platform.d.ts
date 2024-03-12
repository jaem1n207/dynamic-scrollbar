declare global {
  interface UserAgentData {
    brands: Array<{
      brand: string;
      version: string;
    }>;
    mobile: boolean;
    platform: string;
  }

  interface NavigatorID {
    userAgentData: UserAgentData;
  }

  type Brand = 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera';
  type Platform = 'mac' | 'win' | 'mobile';
}

export type {};
