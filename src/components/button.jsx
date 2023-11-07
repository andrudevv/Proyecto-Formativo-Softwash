import React from 'react'

function button(text,estilos,tipo) {
  return (
    <button type={tipo} className={estilos}> {text}</button>
  )
}

export default button