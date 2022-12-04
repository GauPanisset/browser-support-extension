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
 * @returns a list of css Rules.
 */
const parseRawStyle = (rawStyle: string): Rule[] => {
  const parsedStyle = parse(rawStyle) as Stylesheet

  const maybeRules = parsedStyle.stylesheet?.rules

  if (!maybeRules) return []
  return maybeRules.filter((rule) => rule.type === 'rule')
}

export { parseRawStyle }
