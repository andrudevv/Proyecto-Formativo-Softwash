import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import img from '../img/SoftWash.jpg';
import { Link } from 'react-router-dom';

export default function GenericNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-700 p-2 flex justify-between items-center fixed w-full top-0 z-10">
            <div className="flex items-center">
                <img className="text-white rounded-md w-16 ml-6" src={img} alt="logo" />
                <div className="ml-4 md:ml-6">
                    <div className="text-white font-bold text-2xl mx-4">SoftWash</div>
                </div>
            </div>
            <div className="flex items-center mt-2 md:mt-0 md:ml-6">

                <div className="hidden md:flex space-x-4">
                    <button className="text-white hover:text-cyan-400 "><Link className="font-bold mx-4" to="/">Inicio</Link></button>
                    <button className="text-white hover:text-cyan-400 "><Link className="font-bold mx-4" to="/sign-in-user">Iniciar Sesión</Link></button>
                    <button className="text-white hover:text-cyan-400 "><Link className="font-bold mr-4" to="/register-user">Registrarse</Link></button>
                </div>

                <div className="md:hidden ml-auto">
                    <button className="text-white" onClick={toggleMenu}>
                        <FiMenu size={24} />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 top-16 mt-4  p-2 w-full text-end  bg-blue-700">
                            <ul className="bg-blue-700 p-4 text-xl shadow-md shadow-black">
                                <li className='my-2'>
                                    <button className=" font-Pathway Gothic One">
                                        <Link to="/" className="font-Pathway Gothic One hover:text-cyan-400 text-white font-bold ">Inicio</Link>
                                    </button>
                                </li>
                                <li className='my-2'>
                                    <button className=" font-Pathway Gothic One">
                                        <Link to="/sign-in-user" className="font-Pathway Gothic One hover:text-cyan-400 text-white font-bold ">Iniciar Sesión</Link>
                                    </button>
                                </li>
                                <li className='my-2'>
                                    <button className=" font-Pathway Gothic One">
                                        <Link to="/register-user" className="font-Pathway Gothic One hover:text-cyan-400 text-white font-bold ">Registrarse</Link>
                                    </button>
                                </li>
                               
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </header>
    )
}
