import { bgCyan, black } from 'kolorist';

type ProcessType = 'PRE' | 'ERROR' | 'ELIFECYCLE';

export const processLog = (type: ProcessType, message: string) => {
  console.log(black(bgCyan(` ${type} `)), message);
};
