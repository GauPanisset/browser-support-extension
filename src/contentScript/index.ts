import { extractCssDeclarations } from 'contentScript/helpers'

const getDeclarations = async () => {
  const declarations = await extractCssDeclarations()

  chrome.runtime.sendMessage({
    type: 'declarations',
    payload: { declarations },
  })
}

getDeclarations()
