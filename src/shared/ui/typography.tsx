import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '../lib/utils';

const titleVariants = cva(null, {
  variants: {
    variant: {
      default: '',
      primary: 'text-primary',
    },
    size: {
      h1: 'tracking-tight font-extrabold text-4xl md:text-5xl',
      h2: 'tracking-tight font-semibold text-3xl md:text-4xl',
      h3: 'tracking-tight font-semibold text-2xl md:text-3xl',
      h4: 'font-semibold text-xl md:text-2xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'h1',
  },
});

type TitleProps = {
  asChild?: boolean;
} & HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof titleVariants>;

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h1';
    return (
      <Comp className={cn(titleVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);

Title.displayName = 'Title';

const paragraphVariants = cva(null, {
  variants: {
    variant: {
      default: '',
      primary: 'text-primary',
      muted: 'text-muted-foreground',
    },
    size: {
      default: 'leading-7',
      sm: 'font-medium leading-none text-sm',
      lg: 'font-semibold text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ParagraphProps = {
  asChild?: boolean;
} & HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof paragraphVariants>;

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return (
      <Comp className={cn(paragraphVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);

export { Paragraph, Title };
