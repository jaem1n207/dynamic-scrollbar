import { StrictMode } from 'react';
import type { Root } from 'react-dom/client';

import App from './pages/App';

export const renderApp = ({ root, frameUrl }: { root: Root; frameUrl: string }) => {
  return root.render(
    <StrictMode>
      <App frameUrl={frameUrl} />
    </StrictMode>,
  );
};
