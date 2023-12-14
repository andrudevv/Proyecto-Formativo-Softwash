import React from 'react';
import './App.css';
import 'tailwindcss/tailwind.css';

function App() {
  return (
    <div className="App">
      <a
        href="./Terminos_y_condiciones_de_SoftWash.pdf"
        download
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      >
        Descargar PDF
      </a>
    </div>
  );
}

export default App;
