import type { Declaration } from 'css'

import { BrowserSupport } from 'types'

import {
  getPropertySupport,
  groupBrowserSupportsByBrowser,
  isCssVariable,
  sortBrowserSupportsByVersion,
} from './helpers'

type Message = {
  type: 'declarations'
  payload: {
    declarations: Declaration[]
  }
}

const messageListener = (message: Message) => {
  const { type, payload } = message
  if (type === 'declarations') {
    console.log(payload.declarations)

    const alreadySeenProperties: string[] = []
    const browserSupports: BrowserSupport[] = []
    const unknownDeclarations: Declaration[] = []
    let hasCssVariable = false

    for (const declaration of payload.declarations) {
      const property = declaration.property
      if (property && !alreadySeenProperties.includes(property)) {
        alreadySeenProperties.push(property)
        if (isCssVariable(property)) hasCssVariable = true
        else {
          const supports = getPropertySupport(property)
          if (supports === null) unknownDeclarations.push(declaration)
          else browserSupports.push(...supports)
        }
      }
    }

    if (hasCssVariable) {
      const cssSupports = getPropertySupport('custom-property')
      if (cssSupports !== null) browserSupports.push(...cssSupports)
    }

    sortBrowserSupportsByVersion(browserSupports)
    const groupedBrowserSupports =
      groupBrowserSupportsByBrowser(browserSupports)

    /**
     * Chrome Locale Storage is used to shared the global state with the popup.
     */
    chrome.storage.local.set({
      browserSupports: groupedBrowserSupports,
      unknownDeclarations,
    })

    console.log(groupedBrowserSupports)
  }
}

chrome.runtime.onMessage.addListener(messageListener)

export {}
