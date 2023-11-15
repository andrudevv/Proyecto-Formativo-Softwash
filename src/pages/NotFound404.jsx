import React from 'react'
import { Link } from 'react-router-dom';
export default function NotFound404() {
  return (
    <>
    <div className="flex flex-col items-center text-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Página no encontrada</h1>
      <p className="text-gray-600 mb-8">La página que estás buscando no existe.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Ir a la página de inicio
      </Link>
    </div>
    </>
  )
}
