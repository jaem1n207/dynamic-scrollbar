import { resolve } from 'node:path';

export const rootPath = (...args: string[]) => resolve(__dirname, '..', ...args);
