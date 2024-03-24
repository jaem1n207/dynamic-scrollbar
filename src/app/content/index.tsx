import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  Content,
  sendMessageWithHideScrollbar,
  startListeningContentMessages,
} from 'pages/content';

startListeningContentMessages();

sendMessageWithHideScrollbar();

const app = document.createElement('div');
app.id = 'dynamic-scrollbar-root';
document.body.appendChild(app);
const root = ReactDOM.createRoot(app);
root.render(<Content />);
