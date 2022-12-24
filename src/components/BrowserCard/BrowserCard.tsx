import { browsers } from 'browsers'
import Tag from 'components/Tag'
import type { BrowserSupport } from 'types'

type BrowserCardProps = {
  name: string
  supports: BrowserSupport[]
}

/**
 * Display a browser support report.
 * It shows basic browser information, the minimum supported version and the property that
 * constrain this minimum version.
 */
const BrowserCard = ({ name, supports }: BrowserCardProps) => {
  const lastSupport = supports.length ? supports[supports.length - 1] : null

  const { Logo, name: label, type } = browsers[name] ?? {}
  const isMobile = type === 'mobile'

  const handleClick = () => {
    if (lastSupport) navigator.clipboard.writeText(lastSupport.property)
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border-4 border-stone-900 bg-stone-300 p-4 text-stone-900 shadow-fat">
      <div className="flex items-start justify-between gap-8">
        <div className="flex gap-4 text-3xl">
          <Logo />
          <div className="flex flex-col gap-2">
            {label}
            {isMobile && (
              <div className="flex text-sm">
                <Tag>Mobile</Tag>
              </div>
            )}
          </div>
        </div>

        {lastSupport && (
          <h2 className="text-3xl font-bold">{lastSupport.version}</h2>
        )}
      </div>

      <div
        className="cursor-pointer	rounded-md bg-stone-900 p-2 px-4"
        onClick={handleClick}
      >
        {lastSupport && (
          <code className="text-stone-50">{lastSupport.property}</code>
        )}
      </div>
    </div>
  )
}

export default BrowserCard
