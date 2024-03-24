import { runtime, tabs, type Runtime, type Tabs } from 'webextension-polyfill';

/**
 * Send Message to Background Script
 *
 * @param message
 * @returns
 */
export const sendMessage = (
  message: EXTMessage,
  options?: Runtime.SendMessageOptionsType,
): Promise<EXTResponse> => {
  return runtime.sendMessage(message, options);
};

/**
 * Send Message to Content Script
 */
export const sendMessageToTab = (
  tab: Tabs.Tab,
  message: EXTMessage,
  options?: Tabs.SendMessageOptionsType,
): Promise<Response> => {
  return tabs.sendMessage(tab.id as number, message, options);
};

/**
 * Send Message to Content Script
 */
export const sendMessageToActiveTab = async (
  message: EXTMessage,
  options?: Tabs.SendMessageOptionsType,
): Promise<Response> => {
  let activeTab: Tabs.Tab;
  try {
    const activeTabs = await tabs.query({ active: true, currentWindow: true });
    activeTab = activeTabs[0];
  } catch (error) {
    console.log('[===== Error in sendMessageToActiveTab =====]', error);
    throw 'Error in sendMessageToActiveTab';
  }
  return sendMessageToTab(activeTab, message, options);
};
