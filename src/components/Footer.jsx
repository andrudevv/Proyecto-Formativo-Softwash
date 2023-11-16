import React from 'react';

const Footer = () => {
  return (
    <footer className=" bg-blue-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="mb-4">
          <a href="#" className="text-xl  hover:text-cyan-400" >SOFTWASH</a>
        </div>
        <div className="mb-4">
          <a href="#" className="text-yellow-300 hover:text-cyan-400 hover:underline">Facebook</a>
          <span className="mx-2">|</span>
          <a href="#" className="text-yellow-300 hover:text-cyan-400 hover:underline">WhatsApp</a>
          <span className="mx-2">|</span>
          <a href="#" className="text-yellow-300 hover:text-cyan-400 hover:underline">Instagram</a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} SoftWash. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
