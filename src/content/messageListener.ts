import type { Runtime } from 'webextension-polyfill';

export const onRequest = async (
  msg: EXTMessage<'CHANGE_COLOR'> | EXTMessage<'CHANGE_NAME'>,
  sender: Runtime.SendMessageOptionsType,
): Promise<EXTResponse | undefined> => {
  console.log('🚀 ~ sender:', sender);
  console.log('~~~~~~~', msg);
  try {
    switch (msg.type) {
      case 'CHANGE_COLOR': {
        document.body.style.background = msg?.data?.color;
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
