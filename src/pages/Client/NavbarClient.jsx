import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import img from '../../img/SoftWash.jpg';
import { Link } from 'react-router-dom';
import { clientAuth } from '../../context/ClientContext';
export default function NavbarClient() {
    const [menuOpen, setMenuOpen] = useState(false);
const { client, logout } = clientAuth();

const logoutClient = () => {
  logout();
}
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  return (
    <header className="flex bg-gradient-to-r from-blue-900 via-blue-700 to-blue-700 p-4  justify-between items-center fixed w-full top-0 z-10">
      <div className="flex items-center">
        <img className="text-white rounded-full w-12" src={img} alt="logo" />
        <div className="ml-4 md:ml-6">
          <p className="text-white font-Pathway Gothic One text-xl">SoftWash</p>
        </div>
      </div>
      <div className="flex items-center mt-2 md:mt-0 md:ml-6">
        <div className="hidden md:flex space-x-4">
          <button className="text-white hover:text-cyan-400"><Link to="/home-client" className="font-Pathway Gothic One">Inicio</Link></button>
          <button className="text-white hover:text-cyan-400"><Link to="/appointments" className="font-Pathway Gothic One">Citas</Link></button>
          <button className="text-white hover:text-cyan-400"><Link to="/appointments" className="font-Pathway Gothic One">otra cosa</Link></button>
          <button className="text-white hover:text-cyan-400"><Link to="/view-profile-client" className="font-Pathway Gothic One">Perfil</Link></button>
          <span className="text-white  border-lg  shadow-md rounded-lg px-6  shadow-cyan-200 ">!Hola, {client.name}</span>
          <button className="text-white hover:text-cyan-400"  onClick={logoutClient}><Link to="/" className="font-Pathway Gothic One">Cerrar Sesion</Link></button>
        </div>
        <div className="md:hidden ml-auto">
          <button className="text-white" onClick={toggleMenu}>
            <FiMenu size={24} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-16 mt-2 bg-custom-pie-pagina p-4">
              <ul className="bg-white p-4 text-xl">
                <li className="cursor-pointer mb-4">
                <span className="hover:text-SoftRed font-Pathway Gothic One">{nameClient}</span>
                </li>
                <li className="cursor-pointer mb-4">
                  <a className="hover:text-SoftRed font-Pathway Gothic One" href="/signinuser">Iniciar Sesión</a>
                </li>
                <li className="cursor-pointer">
                
          <button className="hover:text-SoftRed font-Pathway Gothic One"  onClick={logoutClient}><Link to="/" className="font-Pathway Gothic One">Cerrar Sesion</Link></button>
                </li>
                {/* <img className="w-8 h-8 mt-4 cursor-pointer" src={closeBtn} onClick={toggleMenu} alt="" /> */}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
