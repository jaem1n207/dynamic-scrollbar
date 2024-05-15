import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../shared/styles';
import App from './popup';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
