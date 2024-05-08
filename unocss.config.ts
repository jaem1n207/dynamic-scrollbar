import { presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss';
import presetAnimations from 'unocss-preset-animations';
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn';
import { defineConfig } from 'unocss/vite';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetAnimations(),
    presetShadcn(builtinColors.map((c) => ({ color: c }))),
  ],
  rules: [
    // credit: https://www.joshwcomeau.com/animation/css-transitions/#custom-curves-7
    [
      'animate-ease-out',
      {
        'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
    ],
    [
      'animate-ease-in',
      {
        'animation-timing-function': 'cubic-bezier(0.75, 0, 1, 1)',
      },
    ],
    [
      'animate-ease-in-out',
      {
        'animation-timing-function': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
    ],
    [
      'animate-ease',
      {
        'animation-timing-function': 'cubic-bezier(0.44, 0.21, 0, 1)',
      },
    ],
    [
      'z-header',
      {
        'z-index': 50,
      },
    ],
    [
      'z-tooltip',
      {
        'z-index': 100,
      },
    ],
  ],
  shortcuts: {
    'icon-btn':
      'text-size-sm inline-block cursor-pointer select-none opacity-75 transition-color hover:opacity-100 hover:color-primary/90',
    container:
      'w-full mx-auto px-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl',
    'interactive-focus-ring':
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
  },
  transformers: [transformerDirectives()],
});
