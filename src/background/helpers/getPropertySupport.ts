import type { BrowserName } from '@mdn/browser-compat-data'

import {
  getPropertyPrefix,
  getPropertyCompatibilities,
  getVersionFromSupportStatement,
} from 'background/helpers'
import type { BrowserSupport } from 'types'

/**
 * Create a list of BrowserSupport objects for a given property based on compatibility data.
 * See more about BrowserSupport in `types/BrowserSupport`.
 *
 * If no compatibility data are found, it returns `null`.
 * @param property the name of the property
 * @returns either the list of BrowserSupport objects or `null`.
 */
const getPropertySupport = (property: string): BrowserSupport[] | null => {
  const prefix = getPropertyPrefix(property)
  const compatibilities = getPropertyCompatibilities(property, prefix)

  if (!compatibilities) return null

  const browserSupports: BrowserSupport[] = []

  const supportEntries = Object.entries(compatibilities.support)
  const isStandard = compatibilities.status?.standard_track ?? null

  for (const [browserName, supportStatement] of supportEntries) {
    const version = getVersionFromSupportStatement(supportStatement, prefix)

    browserSupports.push({
      browser: browserName as BrowserName,
      isStandard,
      property,
      version,
    })
  }

  return browserSupports
}

export { getPropertySupport }
