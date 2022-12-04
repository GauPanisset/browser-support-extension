import mdnDb from '@mdn/browser-compat-data'
import type { CompatStatement } from '@mdn/browser-compat-data'

/**
 * Retrieve the compatibility data of a given property from `@mdn/browser-compat-data`.
 *
 * It returns `null` when no data are found.
 * @param property the name of the property
 * @param prefix a vendor prefix see `types/VendorPrefix`
 * @returns either the compatibility statement or `null` if no data is found
 */
const getPropertyCompatibilities = (
  property: string,
  prefix = ''
): CompatStatement | null => {
  const propertyWithoutPrefix = property.replace(prefix, '')

  const compatibilities =
    mdnDb.css.properties[propertyWithoutPrefix] ??
    mdnDb.css.properties[property] ??
    mdnDb.svg.attributes.presentation[property]

  return compatibilities?.__compat ?? null
}

export { getPropertyCompatibilities }
