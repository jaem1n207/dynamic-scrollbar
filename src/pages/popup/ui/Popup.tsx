import React from 'react';

import { sendMessageToActiveTab } from 'shared/lib/send-messages';
import Button from 'shared/ui/Button';

function setGreen() {
  sendMessageToActiveTab({ type: 'CHANGE_COLOR', data: { color: 'green' } });
}

function setRed() {
  sendMessageToActiveTab({ type: 'CHANGE_COLOR', data: { color: 'red' } });
}

export const Popup = () => (
  <div>
    <Button label="green" action={setGreen} />
    <Button label="red" action={setRed} />
  </div>
);
