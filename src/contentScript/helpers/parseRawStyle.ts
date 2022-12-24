import type { Rule, Stylesheet } from 'css'
import parse from 'css/lib/parse'

/**
 * Parse a chunk of css into a rule.
 *
 * The chuck must be valid css and contains at least the selector and the brackets.
 * For example:
 * ```css
 * #selector-id {
 *  height: 24px;
 * }
 * ```
 * @param rawStyle a chunk of css
 * @returns a list of css Rules. May be empty if an error occurred during css parsing.
 */
const parseRawStyle = (rawStyle: string): Rule[] => {
  try {
    const parsedStyle = parse(rawStyle) as Stylesheet
    const maybeRules = parsedStyle.stylesheet?.rules

    if (!maybeRules) return []
    return maybeRules.filter((rule) => rule.type === 'rule')
  } catch (error) {
    console.warn(`Error from 'browser-support-extension:`, error)

    return []
  }
}

export { parseRawStyle }
