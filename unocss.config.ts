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
  ],
  shortcuts: [
    {
      'icon-btn':
        'text-size-sm inline-block cursor-pointer select-none opacity-75 transition-color hover:opacity-100 hover:color-primary/90',
    },
  ],
  transformers: [transformerDirectives()],
});
