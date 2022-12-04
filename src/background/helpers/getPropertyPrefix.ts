import type { VendorPrefix } from 'types'

/**
 * Extract the vendor prefix from the given property.
 *
 * If the property doesn't have any prefix, it returns the empty string.
 * @param property the name of the property
 * @returns either the vendor prefix or the empty string.
 */
const getPropertyPrefix = (property: string): VendorPrefix | '' => {
  const match = property.match(/-moz-|-ms-|-o-|-webkit-/u)
  return match ? (match[0] as VendorPrefix) : ''
}

export { getPropertyPrefix }
