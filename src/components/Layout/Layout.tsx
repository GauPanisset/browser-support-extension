type LayoutProps = {
  children: React.ReactNode
}

/**
 * Render the popup layout which looks like a old MacOs window.
 *
 * Note: default Google Chrome Extension popup dimensions are 800x600
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="box-border h-[600px] w-fit max-w-[800px] bg-stone-900 font-mono">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border-4 border-stone-900">
        <div className="flex h-12 items-center justify-between rounded-t-xl border-b-4 border-stone-900 bg-stone-100 px-4">
          <div className="flex gap-2">
            <div className="h-6 w-6 rounded-full border-4 border-stone-900 bg-stone-900" />
            <div className="h-6 w-6 rounded-full border-4 border-stone-900" />
            <div className="h-6 w-6 rounded-full border-4 border-stone-900" />
          </div>

          <div className="ml-4 whitespace-nowrap text-lg font-bold">
            Browser compatibility
          </div>
        </div>
        <div className="flex-1 overflow-scroll bg-stone-100 p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
