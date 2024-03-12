import { isEdge, isFirefox } from 'shared/platform';
import { runtime, scripting, tabs, type Runtime, type Tabs } from 'webextension-polyfill';

/**
 * Define background script functions
 * @type {class}
 */
class Background {
  _port: number;
  constructor() {
    this.init();
  }

  /**
   * Document Ready
   *
   * @returns {void}
   */
  init = () => {
    console.log('[===== Loaded Background Scripts =====]');

    //When extension installed
    runtime.onInstalled.addListener(this.onInstalled);

    //Add message listener in Browser.
    runtime.onMessage.addListener(this.onMessage);

    //Add Update listener for tab
    tabs.onUpdated.addListener(this.onUpdatedTab);

    //Add New tab create listener
    tabs.onCreated.addListener(this.onCreatedTab);
  };

  //TODO: Listeners

  /**
   * Extension Installed
   */
  onInstalled = () => {
    console.log('[===== Installed Extension!] =====');
  };

  /**
   * Message Handler Function
   *
   * @param message
   * @param sender
   * @returns
   */
  onMessage = async (message: EXTMessage, sender: Runtime.MessageSender) => {
    try {
      console.log('[===== Received message =====]', message, sender);
      switch (message.type) {
        case 'HIDE_SCROLLBAR': {
          const isSafe = await this.detectSafeTabFromUrl(sender.tab?.url);
          if (!isSafe) break;

          const tabId = sender.tab?.id!;
          const cssStyle = () => {
            if (isFirefox) {
              return 'body { scrollbar-width: none; }';
            }
            if (isEdge) {
              return 'body { -ms-overflow-style: none; }';
            }
            return 'body::-webkit - scrollbar { display: none; }';
          };
          await scripting.insertCSS({
            css: cssStyle(),
            target: { tabId },
          });
          break;
        }
      }
      return true; // result to reply
    } catch (error) {
      console.log('[===== Error in MessageListener =====]', error);
      return error;
    }
  };

  /**
   * Message from Long Live Connection
   *
   * @param message
   */
  onMessageFromExtension = (message: EXTMessage) => {
    console.log('[===== Message from Long Live Connection =====]', message);
  };

  /**
   *
   * @param tab
   */
  onCreatedTab = (tab: Tabs.Tab) => {
    console.log('[===== New Tab Created =====]', tab);
  };

  /**
   * When changes tabs
   *
   * @param {*} tabId
   * @param {*} changeInfo
   * @param {*} tab
   */
  onUpdatedTab = (tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, tab: Tabs.Tab) => {
    console.log('[===== Tab Created =====]', tabId, changeInfo, tab);
  };

  detectSafeTabFromUrl = async (url: string | undefined) => {
    const googleServices = [
      'https://accounts.google.com',
      'https://analytics.google.com/analytics',
      'https://search.google.com/search-console',
      'https://chromewebstore.google.com',
    ];
    if (isFirefox) {
      return Boolean(
        url &&
          !url.startsWith('about:') &&
          !url.startsWith('moz') &&
          !url.startsWith('view-source:') &&
          !url.startsWith('resource:') &&
          !url.startsWith('chrome:') &&
          !url.startsWith('jar:') &&
          !url.startsWith('https://addons.mozilla.org/') &&
          !googleServices.some((serviceUrl) => url.startsWith(serviceUrl)),
      );
    }

    if (isEdge) {
      return Boolean(
        url &&
          !url.startsWith('chrome') &&
          !url.startsWith('data') &&
          !url.startsWith('devtools') &&
          !url.startsWith('edge') &&
          !url.startsWith('https://chrome.google.com/webstore') &&
          !url.startsWith('https://microsoftedge.microsoft.com/addons') &&
          !url.startsWith('view-source') &&
          !googleServices.some((serviceUrl) => url.startsWith(serviceUrl)),
      );
    }

    return Boolean(
      url &&
        !url.startsWith('chrome') &&
        !url.startsWith('https://chrome.google.com/webstore') &&
        !url.startsWith('data') &&
        !url.startsWith('devtools') &&
        !url.startsWith('view-source') &&
        !googleServices.some((serviceUrl) => url.startsWith(serviceUrl)),
    );
  };

  /**
   * Get url from tabId
   *
   */
  getURLFromTab = async (tabId: number) => {
    try {
      const tab = await tabs.get(tabId);
      return tab.url || '';
    } catch (error) {
      console.log('[===== Could not get Tab Info$(tabId) in getURLFromTab =====]', error);
      throw '';
    }
  };

  /**
   * Open new tab by url
   *
   */
  openNewTab = async (url: string) => {
    try {
      const tab = await tabs.create({ url });
      return tab;
    } catch (error) {
      console.log('[===== Error in openNewTab =====]', error);
      return null;
    }
  };

  /**
   * Close specific tab
   *
   * @param {number} tab
   */
  closeTab = async (tab: Tabs.Tab) => {
    try {
      await tabs.remove(tab.id ?? 0);
    } catch (error) {
      console.log('[===== Error in closeTab =====]', error);
    }
  };

  /**
   * send message
   */
  sendMessage = async (tab: Tabs.Tab, message: EXTMessage) => {
    try {
      const res = await tabs.sendMessage(tab.id ?? 0, message);
      return res;
    } catch (error) {
      console.log('[===== Error in sendMessage =====]', error);
      return null;
    }
  };
}

export const background = new Background();
