import React from 'react';
import ReactDOM from 'react-dom/client';
import { runtime } from 'webextension-polyfill';
import MessageListener from './messageListener';

runtime.onMessage.addListener(MessageListener);

const hideScrollbarMessage: HideScrollbarMessage = {
  type: 'HIDE_SCROLLBAR',
  data: {
    url: '*',
  },
};
runtime.sendMessage(hideScrollbarMessage);

function Main() {
  return (
    <div className="dynamic-scrollbar-content">
      <h1>Hello Dynamic Scrollbar!</h1>
    </div>
  );
}

const app = document.createElement('div');
app.id = 'dynamic-scrollbar-root';
document.body.appendChild(app);
const root = ReactDOM.createRoot(app);
root.render(<Main />);
