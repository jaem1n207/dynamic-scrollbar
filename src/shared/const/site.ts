import { join } from 'string-ts';

const SITE_GITHUB_REPO_URL = 'https://github.com/jaem1n207/dynamic-scrollbar';
export const siteConfig = {
  links: {
    github: {
      repo: SITE_GITHUB_REPO_URL,
      readme: join([SITE_GITHUB_REPO_URL, 'blob/main/README.md'], '/'),
      changeLog: join([SITE_GITHUB_REPO_URL, 'blob/main/CHANGELOG.md'], '/'),
      issues: join([SITE_GITHUB_REPO_URL, 'issues/new/choose'], '/'),
    },
  },
};

export type SiteConfig = typeof siteConfig;
