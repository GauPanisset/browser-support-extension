import React from 'react'

// import mockBrowserSupports from 'mocks/gauthier.panisset.fr.json'
import type { BrowserSupport } from 'types'

/**
 * Hook retrieving the browsers support data.
 */
const useBody = () => {
  const [groupedBrowserSupports, setGroupedBrowserSupports] = React.useState<
    Record<string, BrowserSupport[]>
  >({})

  React.useEffect(() => {
    if (chrome?.storage) {
      const getBrowserSupportsFromStorage = async (): Promise<void> => {
        const currentTab = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        })
        const currentTabId = currentTab[0]?.id ?? 0
        const browserSupportsKey = `browserSupports-${currentTabId}`
        const { [browserSupportsKey]: browserSupports } =
          await chrome.storage.local.get([browserSupportsKey])

        setGroupedBrowserSupports(browserSupports)
      }

      getBrowserSupportsFromStorage()
    } else {
      /**
       * * Add some mock data HERE in local environment.
       */
      // setGroupedBrowserSupports(
      //   mockBrowserSupports as unknown as Record<string, BrowserSupport[]>
      // )
    }
  }, [])

  return {
    groupedBrowserSupports,
    isEmpty: Object.values(groupedBrowserSupports).flat().length === 0,
  }
}

export default useBody
