import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import img from '../img/SoftWash.jpg';



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
<section className='fidex'>
    <header className=" bg-gradient-to-r from-blue-500 via-blue-700 to-blue-700 p-1 flex justify-between items-center fixed w-full top-0 z-10">
      <div className="flex items-center">
        <img className="text-white rounded-lg w-20 bg-cover" src={img} alt="logo" />
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
            <div className="absolute mt-2 w-full  p-4 right-0">
              <div className="flex flex-col space-y-2 items-center">
                <button className="text-white">Inicio</button>
                <button className="text-white">Registrarse</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
    </section>
  );
};

export default Navbar;
