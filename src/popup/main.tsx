import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles';
import App from './Popup';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
