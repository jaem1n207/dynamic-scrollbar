import { cva, type VariantProps } from 'class-variance-authority';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { cn } from '~/shared/lib/utils';

const linkVariants = cva('select-none interactive-focus-ring transition-color', {
  variants: {
    variant: {
      default: 'color-foreground/60 hover:color-foreground/100',
      primary: 'color-primary/85 hover:color-primary/100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type LinkProps = {
  /**
   * 링크에 `target="_blank"` 속성을 추가하고 보안 취약점을 방지합니다.
   *
   * @default false
   */
  external?: boolean;
  /**
   * 자식 요소의 앞에 표시할 요소입니다.
   */
  prefixEl?: ReactNode;
  /**
   * 자식 요소의 뒤에 표시할 요소입니다.
   */
  suffixEl?: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant,
      external = false,
      disabled = false,
      prefixEl,
      suffixEl,
      children,
      ...props
    },
    ref,
  ) => {
    const externalAttributes = {
      ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
    };

    return (
      <a
        className={cn(
          {
            'pointer-events-none opacity-50': disabled,
            'flex items-center space-x-1 leading-tight': prefixEl || suffixEl,
          },
          linkVariants({ variant, className }),
        )}
        ref={ref}
        disabled={disabled}
        {...externalAttributes}
        {...props}
      >
        {prefixEl}
        {children}
        {suffixEl}
      </a>
    );
  },
);

Link.displayName = 'Link';
