import mdnDb, { BrowserStatement } from '@mdn/browser-compat-data'
import { IconType } from 'react-icons'
import {
  FaAndroid,
  FaChrome,
  FaEdge,
  FaFirefox,
  FaInternetExplorer,
  FaOpera,
  FaSafari,
} from 'react-icons/fa'
import { SiOculus, SiSamsung } from 'react-icons/si'

/**
 * Browsers configuration.
 */
const browsers: Record<string, BrowserStatement & { Logo: IconType }> = {
  chrome: {
    ...mdnDb.browsers.chrome,
    Logo: FaChrome,
  },
  chrome_android: {
    ...mdnDb.browsers.chrome_android,
    Logo: FaChrome,
  },
  edge: {
    ...mdnDb.browsers.edge,
    Logo: FaEdge,
  },
  firefox: {
    ...mdnDb.browsers.firefox,
    Logo: FaFirefox,
  },
  firefox_android: {
    ...mdnDb.browsers.firefox_android,
    Logo: FaFirefox,
  },
  ie: {
    ...mdnDb.browsers.ie,
    Logo: FaInternetExplorer,
  },
  oculus: {
    ...mdnDb.browsers.oculus,
    Logo: SiOculus,
  },
  opera: {
    ...mdnDb.browsers.opera,
    Logo: FaOpera,
  },
  opera_android: {
    ...mdnDb.browsers.opera_android,
    Logo: FaOpera,
  },
  safari: {
    ...mdnDb.browsers.safari,
    Logo: FaSafari,
  },
  safari_ios: {
    ...mdnDb.browsers.safari_ios,
    Logo: FaSafari,
  },
  samsunginternet_android: {
    ...mdnDb.browsers.samsunginternet_android,
    Logo: SiSamsung,
  },
  webview_android: {
    ...mdnDb.browsers.webview_android,
    Logo: FaAndroid,
  },
}

export { browsers }
