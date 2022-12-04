import type { Declaration, Rule } from 'css'

import { isCssFilePath, parseRawStyle } from 'contentScript/helpers'

/**
 * Type guard for Declaration.
 *
 * It checks only the properties specific to the Declaration type not Node.
 * @param maybeDeclaration a declaration to type check
 * @returns `true` if the unknown object is a Declaration, `false` otherwise.
 */
const isDeclaration = (
  maybeDeclaration: unknown
): maybeDeclaration is Declaration => {
  const typedMaybeDeclaration = maybeDeclaration as Declaration

  return (
    typedMaybeDeclaration.type === 'declaration' &&
    (!typedMaybeDeclaration.property ||
      typeof typedMaybeDeclaration.property === 'string') &&
    (!typedMaybeDeclaration.value ||
      typeof typedMaybeDeclaration.value === 'string')
  )
}

/**
 * Extract all the css declarations from the DOM.
 *
 * It checks:
 * - `<style />` tags
 * - `<link />` tags when they import `.css` files
 * - style attribute of each other element (inline style)
 * @returns A promise resolving in a list of Declarations.
 */
const extractCssDeclarations = async (): Promise<Declaration[]> => {
  const allElements = document.querySelectorAll('*')

  const cssRules: Rule[] = []

  for (const element of allElements) {
    if (element.tagName === 'STYLE') {
      const rawStyle = element.innerHTML
      cssRules.push(...parseRawStyle(rawStyle))
    }

    if (element.tagName === 'LINK') {
      const htmlElement = element as HTMLLinkElement
      if (isCssFilePath(htmlElement.href)) {
        const response = await fetch(htmlElement.href)
        const rawStyle = await response.text()
        cssRules.push(...parseRawStyle(rawStyle))
      }
    }

    const rawInlineStyle = element.getAttribute('style')
    if (rawInlineStyle) {
      const selector = 'inline'
      /**
       * To be able to parse the inline style with the same parser, we have to add a dummy selector.
       */
      const rawStyle = `${selector}{${rawInlineStyle}}`
      cssRules.push(...parseRawStyle(rawStyle))
    }
  }

  return cssRules.flatMap((rule) => {
    if (rule.declarations) {
      return rule.declarations.filter((declaration) =>
        isDeclaration(declaration)
      )
    }
    return []
  })
}

export { extractCssDeclarations }
