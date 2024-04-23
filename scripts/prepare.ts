// generate stub index.html files for dev entry
import chokidar from 'chokidar';
import fs from 'fs-extra';
import { execSync } from 'node:child_process';
import path from 'node:path';

import { isDev, log, port, r } from './utils';

/**
 * Stub index.html to use Vite in development
 */
async function stubIndexHtml() {
  const views = ['options', 'popup', 'background', 'sidebar'];

  for (const view of views) {
    await fs.ensureDir(r(`extension/dist/${view}`));
    let data = await fs.readFile(r(`src/${view}/index.html`), 'utf-8');
    data = data
      .replace(
        '</head>',
        '<script type="module" src="/dist/refreshPreamble.js"></script><script type="module" src="/dist/themeSync.js"></script></head>',
      )
      .replace('"./main.tsx"', `"http://localhost:${port}/${view}/main.tsx"`)
      .replace('<div id="app"></div>', '<div id="app">Vite server did not start</div>');
    await fs.writeFile(r(`extension/dist/${view}/index.html`), data, 'utf-8');
    log('PRE', `stub ${view}`);
  }
}

// This enables hot module reloading
async function writeRefreshPreamble() {
  const data = `
    import RefreshRuntime from "http://localhost:${port}/@react-refresh";
    RefreshRuntime.injectIntoGlobalHook(window);
    window.$RefreshReg$ = () => {};
    window.$RefreshSig$ = () => (type) => type;
    window.__vite_plugin_react_preamble_installed__ = true;
  `;

  await fs.ensureDir(r('extension/dist'));
  await fs.writeFile(path.join(r('extension/dist/'), 'refreshPreamble.js'), data, 'utf-8');
}

async function writeThemeSyncScript() {
  const data = `var e = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
  t = localStorage.getItem('theme') || 'system';
('"dark"' === t || (e && '"light"' !== t)) && document.documentElement.classList.toggle('dark', !0);

var configItem = localStorage.getItem('config');
var { theme = 'neutral', radius = 0.5 } = configItem ? JSON.parse(configItem) : {};
document.body.classList.add(\`theme-\${theme}\`);
document.body.style.setProperty('--radius', \`\${radius}rem\`);
`;

  await fs.ensureDir(r('extension/dist'));
  await fs.writeFile(r('extension/dist/themeSync.js'), data, 'utf-8');
  log('PRE', 'write theme settings script');
}

function writeManifest() {
  execSync('npx esno ./scripts/manifest.ts', { stdio: 'inherit' });
}

writeManifest();
writeThemeSyncScript();

if (isDev) {
  writeRefreshPreamble();
  stubIndexHtml();
  chokidar.watch(r('src/**/*.html')).on('change', () => {
    stubIndexHtml();
  });
  chokidar.watch([r('src/manifest.ts'), r('package.json')]).on('change', () => {
    writeManifest();
  });
}
