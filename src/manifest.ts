import type { Manifest } from 'webextension-polyfill';

import { processLog } from 'shared/lib/log';
import type PkgType from '../package.json';
import { config } from '../webpack.config.utils';
import { rootPath } from './scripts.utils';
import { readJSON, writeJSON } from './shared/lib/node-utils';

const validateManifest = (manifest: Manifest.WebExtensionManifest) => {
  if (!manifest.name) {
    throw new Error('Manifest must have a name');
  }
  if (!manifest.version) {
    throw new Error('Manifest must have a version');
  }
};

export const getManifest = async () => {
  const pkg = await readJSON<typeof PkgType>(rootPath('package.json'));

  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.name,
    author: pkg.author,
    version: pkg.version,
    description: pkg.description,
    icons: {
      16: 'assets/icons/icon-16.png',
      24: 'assets/icons/icon-24.png',
      48: 'assets/icons/icon-48.png',
      64: 'assets/icons/icon-64.png',
      128: 'assets/icons/icon-128.png',
    },
    default_locale: 'en',
    content_scripts: [
      {
        matches: ['<all_urls>'],
        js: ['content/content.js'],
      },
    ],
    background: {
      service_worker: 'background/background.js',
    },
    permissions: ['tabs', 'storage', 'scripting'],
    host_permissions: ['http://*/*', 'https://*/*'],
    options_ui: {
      page: 'options/index.html',
      open_in_tab: true,
    },
    action: {
      default_icon: {
        16: 'assets/icons/icon-16.png',
        48: 'assets/icons/icon-48.png',
      },
      default_title: pkg.name,
      default_popup: 'popup/index.html',
    },
    web_accessible_resources: [
      {
        resources: ['assets/*', 'content/*', 'options/*', 'popup/*', 'background/*'],
        matches: ['<all_urls>'],
      },
    ],
  };

  if (config.TARGET === 'firefox') {
    manifest.browser_specific_settings = {
      gecko: {
        id: 'addon@dynamic-scrollbar.org',
      },
    };
    manifest.background = {
      scripts: ['background/background.js'],
      type: 'module',
    };
    manifest.options_ui = {
      page: manifest.options_ui?.page || 'options/index.html',
      // its not support in MV3: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/options_ui#syntax
      browser_style: false,
    };
  } else {
    manifest.background = {
      service_worker: 'background/background.js',
    };
    delete manifest.options_ui?.browser_style;
  }

  if (config.NODE_ENV === 'development') {
    manifest.name = `(Debug) ${pkg.name}`;
    manifest.version = '1';
  }

  validateManifest(manifest);

  processLog('PRE', `write ${config.TARGET} manifest.json`);

  return manifest;
};

const writeManifest = async () => {
  const manifest = await getManifest();
  await writeJSON(rootPath('src/manifest.json'), manifest as unknown as Record<string, unknown>);
};

(async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await writeManifest().catch((error: any) => {
    processLog('ERROR', error);
  });
})();
