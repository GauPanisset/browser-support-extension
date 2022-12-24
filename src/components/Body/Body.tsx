import BrowserCard from 'components/BrowserCard'

import useBody from './useBody'

/**
 * Component displaying the content of the popup.
 * It shows the BrowserCards if any
 */
const Body = () => {
  const { groupedBrowserSupports, isEmpty } = useBody()

  return (
    <div className="flex flex-col gap-6">
      {isEmpty ? (
        <div className="text-lg text-stone-900">No data to display...</div>
      ) : (
        Object.entries(groupedBrowserSupports).map(
          ([browserName, browserSupportsByBrowser]) =>
            browserSupportsByBrowser.length > 0 && (
              <BrowserCard
                key={browserName}
                name={browserName}
                supports={browserSupportsByBrowser}
              />
            )
        )
      )}
    </div>
  )
}

export default Body
