import mdnDb from '@mdn/browser-compat-data'

import type { BrowserSupport } from 'types'

/**
 * Group the BrowserSupport objects by their browser name.
 * @param browserSupports list of BrowserSupport objects
 * @returns an object containing the browser name as key and a list of BrowserSupports as value.
 */
const groupBrowserSupportsByBrowser = (
  browserSupports: BrowserSupport[]
): Record<string, BrowserSupport[]> => {
  const group = Object.fromEntries(
    Object.keys(mdnDb.browsers).map((browserName) => [
      browserName,
      [] as BrowserSupport[],
    ])
  )

  for (const browserSupport of browserSupports) {
    group[browserSupport.browser].push(browserSupport)
  }

  return group
}

export { groupBrowserSupportsByBrowser }
