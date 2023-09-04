import img from '../imginterfaz/Element_Genshin_Hydro.jpg';
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginAdmin = () => {
  const [emailU, setEmailU] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nombreU, setNombreU] = useState('');
  const [lastName, setLastName] = useState('');
  const [idNumber, setIdNumber] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();


  };
  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>

      <div className="flex items-center justify-center h-screen bg-gray-100">

        <form onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded-lg w-full md:w-1/2 p-4 flex flex-col items-center justify-center">



          <div className="forn-container">
            <h2 className="text-2xl font-semibold mb-6 text-center">Registrarse como Cliente</h2>
            <div className=''>
              <img className='h-16 w-16 object-cover rounded-full bg-left-top mb-2' src={img} alt="Logo_img/" />
            </div>
            <div className="mb-4">
              <label htmlForm="correo" className="block text-black font-bold content-center ">
                Correo Electronico
              </label>
              <input
                id="Codigo"
                type="text"
                placeholder="Correo Eletronico"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={emailU}
                onChange={(e) => setEmailU(e.target.value)}
                required
              />
            </div>


            <div>
              <label htmlForm="name" className='block text-black font-bold content-center '>
                Ingrese Nombres
              </label>
              <input
                id="Name"
                type="text"
                placeholder="Nombre"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombreU}
                onChange={(e) => setNombreU(e.target.value)}
                required
              />
            </div>


            <div>
              <label htmlFor="lastName" className='block text-black font-bold content-center '>
                Ingrese Apellidos
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Apellidos"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name" className='block text-black font-bold content-center '>
                Tipo de Documento
              </label>
              <select name="lenguajes" id="lang">
                <option value="Seleccionar">Seleccionar</option>
                <option value="Cédula Cuidadanía">Cédula Ciudadanía</option>
                <option value="Cédula Extranjera">Cédula Extranjera </option>
              </select>
              <div>
                <label htmlFor="name" className='block text-black font-bold content-center '>
                  Tipo de Documento
                </label>
                <input
                  id=""
                  type="text"
                  placeholder="Numero de Documento"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>

              <div className=''>
                <input name="Sexo" type="radio" />Femenino
                <input name="Sexo " type="radio" />Masculino
              </div>
            </div>






            <div className="mb-4">
              <label htmlForm="password" className="block text-black font-bold">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="contraseña"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                  required
                />
                <button
                  type="button"
                  className="absolute top-5 right-2 text-gray-500 aling-items-center"
                  onClick={handleShowPasswordToggle}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <label htmlForm="password" className="block text-black font-bold">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <input
                  id="ConfiPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="contraseña"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-5 right-2 text-gray-500 aling-items-center"
                  onClick={handleShowPasswordToggle}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 w-full"
            >
              Iniciar Sesión
            </button>
          </div>

        </form>
      </div>
    </>

  );
};

export default LoginAdmin;