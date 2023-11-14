import React from 'react'

export default function DivContent({className, children}) {
  return (
    <div className={className}>
        {children}
    </div>
  )
}
