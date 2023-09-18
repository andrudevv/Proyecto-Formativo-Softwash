import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import img from '../components/imginterfaz/SoftWash.jpg';



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (

    <header className="bg-custom-nav-bar p-4 flex justify-between items-center fixed w-full top-0 z-10">
      <div className="flex items-center">
        <img className="text-white rounded-full w-12" src={img} alt="logo" />
        <div className="ml-4 md:ml-6">
          <div className="text-white font-bold text-xl">SoftWash</div>
        </div>
      </div>
      <div className="flex items-center mt-2 md:mt-0 md:ml-6">
        <div className="hidden md:flex space-x-4">
          <button className="text-white"><a href="/sign-in-user">Iniciar Sesión</a></button>
          <button className="text-white"><a href="/registeruser">Registrarse</a></button>
        </div>
        <div className="md:hidden ml-auto">
          <button className="text-white" onClick={toggleMenu}>
            <FiMenu size={24} />
          </button>
          {menuOpen && (
            <div className="absolute mt-2 w-full bg-custom-pie-pagina p-4 right-0">
              <div className="flex flex-col space-y-2 items-center">
                <button className="text-white">Inicio</button>
                <button className="text-white">Registrarse</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
