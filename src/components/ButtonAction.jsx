import React from 'react'

export default function ButtonAction({tipo,estilos,text,onClick}) {
  return (
    <button type={tipo} className={estilos} onClick={onClick}> {text}</button>
  )
}

