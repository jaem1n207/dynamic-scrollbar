import { sendMessage } from 'shared/lib/send-messages';

export const sendMessageWithHideScrollbar = () => {
  sendMessage({
    type: 'HIDE_SCROLLBAR',
    data: {
      url: '*',
    },
  });
};
