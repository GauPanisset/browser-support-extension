import React from 'react'

type TagProps = {
  children: React.ReactNode
}

/**
 * Display a simple tag.
 */
const Tag = ({ children }: TagProps) => {
  return (
    <div className="rounded-full border-2 border-stone-900 bg-stone-50 px-2 font-bold shadow-fat-xs">
      {children}
    </div>
  )
}

export default Tag
