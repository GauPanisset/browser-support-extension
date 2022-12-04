import { compareVersions } from 'background/helpers'
import type { BrowserSupport } from 'types'

/**
 * Sort the browser supports given as parameter by version (ascending order).
 * @param browserSupports list of BrowserSupport objects
 */
const sortBrowserSupportsByVersion = (
  browserSupports: BrowserSupport[]
): void => {
  browserSupports.sort((browserSupportA, browserSupportB) => {
    if (!browserSupportA.version) return -1
    if (!browserSupportB.version) return 1
    if (typeof browserSupportA.version === 'boolean') return -1
    if (typeof browserSupportB.version === 'boolean') return 1
    return compareVersions(browserSupportA.version, browserSupportB.version)
  })
}

export { sortBrowserSupportsByVersion }
