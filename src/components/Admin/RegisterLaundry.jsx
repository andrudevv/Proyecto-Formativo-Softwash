// import img from '../imginterfaz/Element_Genshin_Hydro.jpg';
import React, { useState } from 'react';
const formRegistro = () => {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes realizar el envío de los datos del formulario a través de una API, por ejemplo
    // Puedes usar los valores de estado: codigo, nombre, ciudad, correo, direccion
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full sm:w-96  bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Registrarse como lavadero
        </h2>
        <div className='border border-solid p-10 mr-60 rounded-md'>
          <p /*className="text-white rounded-full w-12" src={img} alt="logo"*/>logo</p>
        </div>
        <form className='mt-10' onSubmit={handleSubmit}>
          <div className="mb-2">
            <div className="flex items-center mb-2">
              <label className="block text-sm font-medium text-gray-600 w-1/4 pr-4">
                Código
              </label>
              <input
                type="text"
                id="codigo"
                required
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="mt-1 p-2 flex-grow border rounded-md focus:ring focus:ring-blue-300"
               
              />
            </div>

            <div className="flex items-center mb-2">
              <label className="block text-sm font-medium text-gray-600 w-1/4 pr-4">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 p-2 flex-grow border rounded-md focus:ring focus:ring-blue-300"
                
              />
            </div>

            <div className="flex items-center mb-2">
              <label className="block text-sm font-medium text-gray-600 w-1/4 pr-4">
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                required
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="mt-1 p-2 flex-grow border rounded-md focus:ring focus:ring-blue-300"
               
              />
            </div>

            <div className="flex items-center mb-2">
              <label className="block text-sm font-medium text-gray-600 w-1/4 pr-4">
                Correo
              </label>
              <input
                type="email"
                id="correo"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="mt-1 p-2 flex-grow border rounded-md focus:ring focus:ring-blue-300"
                
              />
            </div>

            <div className="flex items-center mb-2">
              <label className="block text-sm font-medium text-gray-600 w-1/4 pr-4">
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                required
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="mt-1 p-2 flex-grow border rounded-md focus:ring focus:ring-blue-300"
                
              />
            </div>
          </div>
          
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-10"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default formRegistro;