import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '~/shared/styles';
import './transition.css';
import { TooltipProvider } from '~/shared/ui';
import { Options } from './options';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <TooltipProvider>
      <Options />
    </TooltipProvider>
  </StrictMode>,
);
