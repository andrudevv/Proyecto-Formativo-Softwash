import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import img from '../../img/SoftWash.jpg';
import { Link } from 'react-router-dom';
import { clientAuth } from '../../context/ClientContext';
import ModalLogout from '../../components/ModalLogout';
import ReusableModals from '../../components/ReusableModals';


export default function NavbarClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { client, logout } = clientAuth();
  const [modalLogout, setModalLogout] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  const closeModalDelete = () => {
    setOpenLogout(false);
  }
  const openModalClose = () => {
    setOpenLogout(true);
  }
  const logoutClient = () => {
    setOpenLogout(false);
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
      <ReusableModals
        isOpen={openLogout}
        onClose={closeModalDelete}
        title="Cerrar Sesión"
        message={'¿Seguro que quieres cerrar sesión?'}
        buttons={[
          {
            text: 'Cancelar',
            onClick: closeModalDelete,
            styles: 'bg-red-500 hover:bg-red-600 text-white ml-4',
          },
          {
            text: 'Cerrar Sesión',
            onClick: () => logoutClient(),
            styles: 'bg-blue-500 hover:bg-blue-700  font-bold text-white',
          }

        ]} />
      <ModalLogout isOpen={modalLogout} />
      <header className="flex bg-gradient-to-r from-blue-900 via-blue-700 to-blue-700 p-2  justify-between items-center fixed w-full top-0 z-10">
        <div className="flex items-center">
          <img className="text-white rounded-md w-16 ml-6" src={img} alt="logo" />
          <div className="ml-4 md:ml-6">
            <p className="text-white font-Pathway Gothic One text-2xl mx-6">SoftWash</p>
          </div>
        </div>
        <div className="flex items-center mt-2 md:mt-0 md:ml-6">
          <div className="hidden md:flex space-x-4">
            <button className="text-white hover:text-cyan-400"><Link to="/home-client" className="font-Pathway Gothic One font-bold mx-4">Inicio</Link></button>
            <button className="text-white hover:text-cyan-400"><Link to="/view-appointments" className="font-Pathway Gothic One font-bold mx-4">Citas Para Hoy</Link></button>
            <button className="text-white hover:text-cyan-400"><Link to="/missed-appointments" className="font-Pathway Gothic One font-bold mx-4">Reagendar</Link></button>
            <button className="text-white hover:text-cyan-400"><Link to="/view-profile-client" className="font-Pathway Gothic One font-bold mx-4">Perfil</Link></button>
            <span className="text-white rounded-md  shadow-md shadow-cyan-200 px-6 font-bold ">!Hola {client.name}</span>
            <button className="text-white hover:text-cyan-400" onClick={openModalClose}><Link to="/" className="font-Pathway font-bold Gothic One mr-4">Cerrar Sesión</Link></button>
          </div>
          <div className="md:hidden ml-auto">
            <button className="text-white" onClick={toggleMenu}>
              <FiMenu size={24} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-16 mt-2  p-2 w-full text-end bg-blue-700">
                <ul className="bg-blue-700 p-4 text-xl">
                  <li className="cursor-pointer mb-4 text-center font-bold text-2xl">
                    <span className="hover:text-SoftRed font-Pathway text-white Gothic One">!Hola {client.name}</span>
                  </li>

                  <li className='my-2'>
                    <button className="hover:text-SoftRed font-Pathway Gothic One">
                      <Link to="/home-client" className="font-Pathway Gothic One hover:text-cyan-400 text-white font-bold ">Inicio</Link>
                    </button>
                  </li>
                  <li className='my-2'>
                    <button className="font-Pathway Gothic One">
                      <Link to="/view-appointments" className="font-Pathway Gothic One hover:text-cyan-400 text-white font-bold">Citas Para Hoy</Link>
                    </button>

                  </li>
                  <li className='my-2'>
                    <button className="hover:text-SoftRed font-Pathway Gothic One">
                      <Link to="/missed-appointments" className="font-Pathway Gothic One hover:text-cyan-400 text-white font-bold ">Reagendar</Link>
                    </button>

                  </li>
                  <li className='my-2'>
                    <button className="hover:text-SoftRed font-Pathway Gothic One">
                      <Link to="/view-profile-client" className="font-Pathway Gothic One hover:text-cyan-400 text-white font-bold ">Perfil</Link>
                    </button>

                  </li>
                  <li >

                    <button className="hover:text-SoftRed font-Pathway Gothic One" onClick={openModalClose}>
                      <Link to="/" className="font-Pathway Gothic One text-white hover:text-cyan-400 font-bold">Cerrar Sesión</Link>
                    </button>
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
