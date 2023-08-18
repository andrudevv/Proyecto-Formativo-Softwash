import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 bg-gray-200 text-center w-full">
      <div className="mb-2">
        <a href="#" className="text-blue-500 hover:underline">Facebook</a>
        <href className="mx-2">|</href>
        <a href="#" className="text-blue-500 hover:underline">WhatsApp</a>
        <href className="mx-2">|</href>
        <a href="#" className="text-blue-500 hover:underline">Instagram</a>
      </div>
      <p className="text-sm">© {new Date().getFullYear()} SoftWash. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
