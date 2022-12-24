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

const messageListener = (
  message: Message,
  sender: chrome.runtime.MessageSender
) => {
  const senderTabId = sender?.tab?.id ?? 0

  const { type, payload } = message
  if (type === 'declarations') {
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

    console.log(groupedBrowserSupports, unknownDeclarations)

    /**
     * Chrome Locale Storage is used to shared the global state with the popup.
     */
    chrome.storage.local.set({
      [`browserSupports-${senderTabId}`]: groupedBrowserSupports,
      [`unknownDeclarations-${senderTabId}`]: unknownDeclarations,
    })
  }
}

chrome.runtime.onMessage.addListener(messageListener)

export {}
