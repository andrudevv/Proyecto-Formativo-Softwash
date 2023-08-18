import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginUsuario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Realizar la lógica de inicio de sesión, por ejemplo, enviar datos al servidor
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded-lg w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar sesión como Usuario</h2>
        
        <div className="mb-4">
          <label htmlFor="correo" className="block text-black font-bold">
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="correo electrónico"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-black font-bold">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="contraseña"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md pr-10"
              value={password}
              onChange={handlePasswordChange}
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

      </form>
    </div>
  );
};

export default LoginUsuario;
