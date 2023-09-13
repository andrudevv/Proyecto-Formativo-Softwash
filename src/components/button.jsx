import React from 'react'

function button(text,estilos) {
  return (
    <button className={estilos}> {text}</button>
  )
}

export default button