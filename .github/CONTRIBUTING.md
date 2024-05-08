# Welcome to dynamic scrollbar contributing guide

_Pull requests, bug reports, and all other forms of contribution are welcomed and highly encouraged!_ :octocat:

## Features

- ⚡️ Instant HMR - use Vite on dev (no more refresh!)
- ⚛️ React18 - Declarative Hooks API, Stateful Component and more!
- 💬 Effortless communications - powered by [`webext-bridge`](https://github.com/antfu/webext-bridge)
- 🌈 [UnoCSS](https://github.com/unocss/unocss) - The instant on-demand Atomic CSS engine.
- 🦾 [TypeScript](https://www.typescriptlang.org/) - type safe
- 📦 [Components auto importing](./src/components)
- 🌟 [Icons](./src/components) - Access to icons from any iconset directly
- 🖥 Content Script - Use React even in content script
- 🌍 WebExtension - isomorphic extension for Chrome, Firefox, and others
- 📃 Dynamic `manifest.json` with full type support

## Pre-packed

### WebExtension Libraries

- [`webextension-polyfill`](https://github.com/mozilla/webextension-polyfill) - WebExtension browser API Polyfill with types
- [`webext-bridge`](https://github.com/antfu/webext-bridge) - effortlessly communication between contexts

### Vite Plugins

- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use `browser` and Vue Composition API without importing
- [`unplugin-icons`](https://github.com/antfu/unplugin-icons) - icons as components
  - [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
- [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react) - Vite plugin for React

### UI Frameworks

- [UnoCSS](https://github.com/unocss/unocss) - the instant on-demand Atomic CSS engine

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager
- [esno](https://github.com/antfu/esno) - TypeScript / ESNext node runtime powered by esbuild
- [npm-run-all](https://github.com/mysticatea/npm-run-all) - Run multiple npm-scripts in parallel or sequential
- [web-ext](https://github.com/mozilla/web-ext) - Streamlined experience for developing web extensions

### Folders

- `src` - main source.
- `extension` - extension package root.
  - `assets` - static assets (mainly for `manifest.json`).
  - `dist` - built files, also serve stub entry for Vite on development.
- `scripts` - development and bundling helper scripts.

### Development

```bash
pnpm dev
```

Then **load extension in browser with the `extension/` folder**.

For Firefox developers, you can run the following command instead:

```bash
pnpm start:firefox
```

`web-ext` auto reload the extension when `extension/` files changed.

> While Vite handles HMR automatically in most of the case, [Extensions Reloader](https://chrome.google.com/webstore/detail/fimgfedafeadlieiabdeeaodndnlbhid) is still recommended for cleaner hard reloading.

## Safely Code

### z-index

`z-index` 값을 이용해야 하는 요소를 개발하는 경우, `z-10` 또는 `z-50`처럼 사용하지 마세요. `unocss.config.ts`에 [새로운 규칙을 추가](https://unocss.dev/config/rules)해서 `z-modal` 또는 `z-header`처럼 사용해야 합니다.

`z-index` 속성은 [Stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)를 생성합니다.

Stacking context 내 요소의 렌더링 순서는 `z-index` 속성 값에 따라 서로 겹쳐서 쌓이는 context가 생성됩니다. `z-index`를 잘못 사용할 경우 아래 두 가지 문제가 발생합니다.

첫 번째로 각각의 Stacking context는 독립적이므로 **자식의 `z-index` 값은 부모에게만 의미**있습니다. 예를 들어 Stacking context 내부에서 부모 요소가 `z-index: 1`이라면 이 부모의 자식 요소는 `z-index: 9999`를 가지고 있더라도 이 요소의 부모 요소와 형제인 `z-index: 2`인 요소의 아래로 쌓이게 됩니다. 무조건 높다고 최상위에 쌓이는 것은 아닙니다.

```jsx
<div id='top' className="absolute top-0 z-2">
  I am on top
</div>

<div style="absolute top-0 z-1">
  <div style="absolute z-9999">
    I want to be in front of #top
  </div>
</div>
```

이러한 문제는 React에서 제공하는 [createPortal](https://react.dev/reference/react-dom/createPortal) API를 활용하면 해결할 수 있는 문제입니다.

두 번째로 `z-index`가 필요한 다양한 컴포넌트를 구현하다 보면 `Popup`의 `z-index`가 왜 `Modal`보다 크게 부여되었는지 알기 힘듭니다. 그리고 `z-index`가 각 컴포넌트에 흩어져 있으므로 이후 `z-index`가 필요한 컴포넌트를 구현할 때 값을 적절히 정하기 어렵습니다.

이러한 문제를 해결하기 위해 `Context API`를 사용해 관리할 수도 있지만 현재 Unocss를 사용하고 있으므로 별다른 추가 코드 작성없이 `unocss.config.ts` 파일에서 새로운 규칙을 추가해서 간단하게 해결할 수 있습니다:

```typescript
rules: [
  ['z-header', { 'z-index': 50 }],
  ['z-modal', { 'z-index': 100 }],
];
```

이렇게 하면 번거로운 코드 작성 없이 `z-index` 값을 한 곳에서 관리하고 각 컴포넌트에 적절한 값을 지정할 수 있게 됩니다.

## Using Gitpod

If you have a web browser, you can get a fully pre-configured development environment with one click:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/jaem1n207/dynamic-scrollbar)

### Build

To build the extension, run

```bash
pnpm build
```

And then pack files under `extension`, you can upload `extension.crx` or `extension.xpi` to appropriate extension store.
