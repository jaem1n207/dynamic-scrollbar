import React from 'react';
import ReactDOM from 'react-dom/client';

import { Popup } from 'pages/popup';

const Index = () => <Popup />;

const root = ReactDOM.createRoot(document.getElementById('dynamic-scrollbar-display-container')!);
root.render(<Index />);
