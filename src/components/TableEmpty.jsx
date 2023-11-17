import React from 'react'

export default function TableEmpty({text}) {
  return (
    <div className="flex justify-center items-center h-40 mt-10 border-2 text-xl bg-blue-100" >
        <p className='text-center'>{text}</p>
    </div>
  )
}
