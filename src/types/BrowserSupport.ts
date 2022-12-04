import type { BrowserName, VersionValue } from '@mdn/browser-compat-data'

/**
 * Structured browser support data.
 */
type BrowserSupport = {
  /**
   * The name of a browser. For example: `'chrome'`, `'firefox'`, ...
   */
  browser: BrowserName
  /**
   * Whether the property is standard or not.
   * It can be `null` if the information is missing.
   */
  isStandard: boolean | null
  /**
   * Name of the css property.
   */
  property: string
  /**
   * Version at which the property was added to the browser.
   * The version can be:
   * - a **string** representing one or multiple numbers separated by ".".
   * - a **boolean** either `true` when the browser supports the property or `false` when it doesn't.
   * - `null` is the information is missing.
   */
  version: VersionValue
}

export type { BrowserSupport }
