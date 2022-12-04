/**
 * Check whether the property is a css variable name or not.
 * @param property the name of the property
 * @returns `true` if the property is a css variable and `false` otherwise.
 */
const isCssVariable = (property: string): boolean => /^--.*/iu.test(property)

export { isCssVariable }
