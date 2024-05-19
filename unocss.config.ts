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
    // timing function credit: https://www.joshwcomeau.com/animation/css-transitions/#custom-curves-7
    [
      /**
       * @example
       * ```html
       * <div class="animate-ease-out"></div>
       * ```
       */
      /^animate-(ease-out|ease-in-out|ease-in|ease)$/,
      (match) => {
        const timing = {
          'ease-out': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          'ease-in': 'cubic-bezier(0.75, 0, 1, 1)',
          'ease-in-out': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
          ease: 'cubic-bezier(0.44, 0.21, 0, 1)',
        }[match[1]];

        return {
          'animation-timing-function': timing,
        };
      },
    ],
    [
      /**
       * @example
       * ```html
       * <div class="z-header"></div>
       * ```
       */
      /^z-(header|tooltip)$/,
      (match) => {
        const z = {
          header: 50,
          tooltip: 100,
        }[match[1]];

        return {
          'z-index': z,
        };
      },
      {
        autocomplete: 'z-(header|tooltip)',
      },
    ],
    [
      /**
       * @example
       * ```html
       * <div className="flex-col-6">flex direction justify-content align-items</div>
       * ```
       */
      /^flex-(row|col)-([1-9])$/,
      (match) => {
        const [, direction, number] = match as [unknown, 'row' | 'col', number];

        type PositionProps = Readonly<'start' | 'center' | 'end'>;
        const positions = {
          1: ['start', 'start'],
          2: ['center', 'start'],
          3: ['end', 'start'],
          4: ['start', 'center'],
          5: ['center', 'center'],
          6: ['end', 'center'],
          7: ['start', 'end'],
          8: ['center', 'end'],
          9: ['end', 'end'],
        } as const satisfies Record<number, readonly [PositionProps, PositionProps]>;

        const columORrow: 'column' | 'row' = direction === 'row' ? 'row' : 'column';

        const [justify, align] = positions[number as keyof typeof positions];

        return {
          display: 'flex',
          'flex-direction': columORrow,
          'justify-content': justify,
          'align-items': align,
        };
      },
      { autocomplete: 'flex-(col|row)-(1|2|3|4|5|6|7|8|9)' },
    ],
    [
      /**
       * @example
       * ```html
       * <div className="p-0-4-6-2"></div>
       * ```
       */
      /^(p|m)-(\d+)-(\d+)?-?(\d+|auto)?-?(\d+|auto)?$/,
      (match) => {
        const [, PaddingOrMargin, t, r, b, l] = match as [
          unknown,
          'p' | 'm',
          number,
          number,
          number | 'auto',
          number | 'auto',
        ];

        const isPadding = PaddingOrMargin === 'm' ? false : (true as boolean);

        const List: string[] = [];
        for (const e of [t, r, b, l].filter(Boolean)) {
          if (!e || e === 'auto') {
            List.push('auto');
          } else List.push(`${Number(e) / 4}rem`);
        }

        return isPadding ? { padding: List.join(' ') } : { margin: List.join(' ') };
      },
      { autocomplete: 'p|m-<num>-<num>-<num>-<num>' },
    ],
    [
      /**
       * @example
       * ```html
       * <div className="flex|1|0|120px">flex grow shrink basis flex: 1 0 7.5rem;</div>
       * ```
       */
      /^flex\|([0-9])\|([0-9])\|?([a-z0-9%]{2,})?$/,
      (match) => {
        const [, grow, shrink] = match as [unknown, number, number];
        let basis = match[3];

        if (Number(basis) && !basis.includes('%')) {
          basis &&= `${Number(basis) / 4}rem`;
        }
        basis ??= 'auto';

        return {
          flex: `${grow} ${shrink} ${basis}`,
        };
      },
    ],
    [
      'shadow-scrollbar-container',
      {
        'box-shadow':
          'rgba(0, 0, 0, 0.4) 0px 0px 0.5px 0px, rgba(0, 0, 0, 0.09) 0px 1px 3px 0px, rgba(0, 0, 0, 0.09) 0px 4px 8px 0px',
      },
    ],
  ],
  shortcuts: {
    container:
      'w-full mx-auto px-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl',
    'interactive-focus-ring':
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
  },
  transformers: [transformerDirectives()],
});
