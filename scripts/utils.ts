import { bgCyan, black } from 'kolorist';
import process from 'node:process';
import { resolve } from 'node:path';

export const port = Number(process.env.PORT || '') || 3303;
export const r = (...args: string[]) => resolve(__dirname, '..', ...args);
export const isDev = process.env.NODE_ENV !== 'production';
export const isFirefox = process.env.EXTENSION === 'firefox';

export function log(name: string, message: string) {
  console.log(black(bgCyan(` ${name} `)), message);
}
