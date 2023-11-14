import React from "react";
import { FaSpinner } from "react-icons/fa"; // Puedes usar cualquier icono de carga que prefieras

const Spinner = () => {
  return (
    <div  className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-5xl text-blue-700 " />
    </div>
  );
};
// style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
export default Spinner;