import { defineConfig } from 'unocss/vite';
import { presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss';
import presetAnimations from 'unocss-preset-animations';
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetAnimations(),
    presetShadcn(builtinColors.map((c) => ({ color: c }))),
  ],
  transformers: [transformerDirectives()],
});
