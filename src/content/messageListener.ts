import type { Runtime } from 'webextension-polyfill';

export const onRequest = async (
  message: EXTMessage,
  sender: Runtime.SendMessageOptionsType,
): Promise<EXTResponse | undefined> => {
  console.log('🚀 ~ sender:', sender);
  console.log('~~~~~~~', message);
  try {
    switch (message.type) {
      case 'CHANGE_COLOR': {
        document.body.style.background = message?.data?.color;
        break;
      }
      default:
        return { type: 'SUCCESS' };
    }
  } catch (error) {
    console.error('Error in content script:', error);
    throw error;
  }
};

export default onRequest;
