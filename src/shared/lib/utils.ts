import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const arrayCache: Record<number, readonly number[]> = {};
/**
 * Create shared fixed-size read-only arrays.
 * @example
 * ```jsx
 * <div className="space-y-2">
 *  {createFixedArray(5).map((i) => (
 *     <Skeleton key={i} className="h-4 w-[200px]" />
 *   ))}
 * </div>
 * ```
 */
export const createFixedArray = (length: number): readonly number[] => {
  arrayCache[length] ||=
    arrayCache[length] ||
    Array(length)
      .fill(0)
      .map((_, i) => i);

  return arrayCache[length];
};
