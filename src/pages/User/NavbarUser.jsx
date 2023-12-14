import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import img from '../../img/SoftWash.jpg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import ModalLogout from '../../components/ModalLogout';

export default function NavbarUser() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const logoutUser = () => {
    setModalLogout(true);
    const timer = setTimeout(() => {
      logout();
      setModalLogout(false);
    }, 2000);
    return () => clearTimeout(timer);
  }
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    <ModalLogout isOpen={modalLogout} />
    <header className="flex bg-gradient-to-r from-blue-900 via-blue-700 to-blue-700 p-2  justify-between items-center fixed w-full top-0 z-10">
      <div className="flex items-center">
        <img className="text-white rounded-md w-16  ml-6" src={img} alt="logo" />
        <div className="ml-4 md:ml-6">
          <p className="text-white font-Pathway Gothic One text-2xl mx-6">SoftWash</p>
        </div>
      </div>
      <div className="flex items-center mt-2 md:mt-0 md:ml-6">
        <div className="hidden md:flex space-x-4">
          <button className="text-white hover:text-cyan-400"><Link to="/home-user" className=" font-Pathway Gothic One font-bold mx-4">Inicio</Link></button>
          <button className="text-white hover:text-cyan-400"><Link to="/search" className=" font-Pathway Gothic One font-bold mx-4">Buscar Lavaderos</Link></button>
          <button className="text-white hover:text-cyan-400"><Link to="/my-appointments" className="font-Pathway Gothic One font-bold mx-4">Citas</Link></button>
          <button className="text-white hover:text-cyan-400"><Link to="/view-profile-user" className="font-Pathway Gothic One font-bold mx-4">Mi Perfil</Link></button>
          <span className="text-white rounded-md  shadow-md shadow-cyan-200 px-6 font-bold">!Hola {user.name}</span>
          <button className="text-white  hover:text-cyan-400" onClick={logoutUser}><Link to="/" className="font-Pathway Gothic One font-bold mr-4">Cerrar Sesión</Link></button>
        </div>
        <div className="md:hidden ml-auto">
          <button className="text-white hover:text-cyan-400" onClick={toggleMenu}>
            <FiMenu size={24} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-16 mt-2 bg-custom-pie-pagina p-4">
              <ul className="bg-white p-4 text-xl">
                <li className="cursor-pointer mb-4">
                  <span className="text-white border-lg  shadow-md rounded-lg px-6  shadow-cyan-200">!Hola {user.name}</span>
                </li>
                <li className="cursor-pointer mb-4">
                  <a className="hover:text-SoftRed font-Pathway Gothic One" href="/sign-in-user">Iniciar Sesión</a>
                </li>
                <li className="cursor-pointer">
                  <button className="hover:text-SoftRed font-Pathway Gothic One" onClick={logoutUser}><Link to="/" className="font-Pathway Gothic One">Cerrar Sesion</Link></button>
                </li>
                {/* <img className="w-8 h-8 mt-4 cursor-pointer" src={closeBtn} onClick={toggleMenu} alt="" /> */}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
    </>
  )
}
