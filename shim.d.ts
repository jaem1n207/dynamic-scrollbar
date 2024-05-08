import type { AttributifyAttributes } from '@unocss/preset-attributify';
import type { ProtocolWithReturn } from 'webext-bridge';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> extends Omit<AttributifyAttributes, 'size'> {}
}

declare module 'webext-bridge' {
  export interface ProtocolMap {
    // define message protocol types
    // see https://github.com/antfu/webext-bridge#type-safe-protocols
    'tab-prev': { title: string | undefined };
    'get-current-tab': ProtocolWithReturn<{ tabId: number }, { title?: string }>;
  }
}
