import fs from 'fs-extra';
import type { Manifest } from 'webextension-polyfill';
import type PkgType from '../package.json';
import { isDev, isFirefox, port, r } from '../scripts/utils';

export async function getManifest(): Promise<Manifest.WebExtensionManifest> {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType;
  const pkgName = pkg.displayName || pkg.name;

  // update this file to update this manifest.json
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: isDev ? `(Debug) ${pkgName}` : pkgName,
    version: isDev ? '0.0.1' : pkg.version,
    description: pkg.description,
    default_locale: 'en',
    action: {
      default_icon: './assets/icon-512.png',
    },
    options_ui: {
      page: './dist/options/index.html',
      open_in_tab: true,
    },
    background: isFirefox
      ? {
          scripts: ['dist/background/index.mjs'],
          type: 'module',
        }
      : {
          service_worker: './dist/background/index.mjs',
        },
    icons: {
      16: './assets/icon-512.png',
      48: './assets/icon-512.png',
      128: './assets/icon-512.png',
    },
    permissions: ['tabs', 'storage', 'activeTab'],
    host_permissions: ['<all_urls>'],
    content_scripts: [
      {
        matches: ['<all_urls>'],
        js: ['dist/contentScripts/index.global.js'],
      },
    ],
    web_accessible_resources: [
      {
        resources: ['dist/contentScripts/style.css', 'dist/sidebar/index.html'],
        matches: ['<all_urls>'],
      },
    ],
    content_security_policy: {
      extension_pages: isDev
        ? // this is required on dev for Vite script to load
          `script-src 'self' http://localhost:${port}; object-src 'self'`
        : "script-src 'self'; object-src 'self'",
    },
  };

  if (isFirefox) {
    manifest.browser_specific_settings = {
      gecko: {
        id: 'addon@localhost',
        strict_min_version: '91.0',
      },
    };
  }

  return manifest;
}
