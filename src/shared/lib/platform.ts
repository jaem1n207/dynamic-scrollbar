const isNavigatorDefined = typeof navigator !== 'undefined';
const userAgent = isNavigatorDefined
  ? navigator.userAgentData && Array.isArray(navigator.userAgentData.brands)
    ? navigator.userAgentData.brands
        .map((brand) => `${brand.brand.toLowerCase()} ${brand.version}`)
        .join(' ')
    : navigator.userAgent.toLowerCase()
  : 'some useragent';

const platform = isNavigatorDefined
  ? navigator.userAgentData && typeof navigator.userAgentData.platform === 'string'
    ? navigator.userAgentData.platform.toLowerCase()
    : navigator.platform.toLowerCase()
  : 'some platform';

const isMacOs = platform.startsWith('mac');
const isWindows = platform.startsWith('win');
const isMobile =
  isNavigatorDefined && navigator.userAgentData
    ? navigator.userAgentData.mobile
    : userAgent.includes('mobile');

const isChromium = userAgent.includes('chrome') || userAgent.includes('chromium');
const isFirefox =
  userAgent.includes('firefox') ||
  userAgent.includes('thunderbird') ||
  userAgent.includes('librewolf');
const isOpera = isChromium && (userAgent.includes('opr') || userAgent.includes('opera'));
const isEdge = isChromium && userAgent.includes('edg');
const isChrome = isChromium && !isOpera && !isEdge;
const isSafari = !isChromium && userAgent.includes('safari');

export {
  isChrome,
  isChromium,
  isEdge,
  isFirefox,
  isMacOs,
  isMobile,
  isOpera,
  isSafari,
  isWindows,
  platform,
  userAgent,
};
