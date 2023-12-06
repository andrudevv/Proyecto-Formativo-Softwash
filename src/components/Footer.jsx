import React from 'react';
import whatsapp from '../img/whatsapp.png';
import facebook from '../img/facebook.png';
import instagram from '../img/instagram.png';
import imgolas from '../img/olasWash.png'
const Footer = () => {
  return (
    <footer className=" text-white py-8 h-[300px] bg-cover" style={{ backgroundImage: `url(${imgolas})` }}>

      <div className="mx-auto flex flex-col justify-end h-full items-center">
        <div className="mb-4">
          <a href="#" className="text-xl  hover:text-cyan-400" >SOFTWASH</a>
        </div>
        <div className="mb-4 flex">
        <a href="#">
            <img className="text-white rounded-full w-11 mr-6" src={whatsapp} alt="WhatsApp logo" />
          </a>
          <a href="#">
            <img className="text-white rounded-full w-11 mr-6" src={facebook} alt="Facebook logo" />
          </a>
          <a href="#">
            <img className="text-white rounded-full w-11" src={instagram} alt="Instagram logo" />
          </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} SoftWash. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
