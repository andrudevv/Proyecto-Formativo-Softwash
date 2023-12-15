import React from 'react'

export default function DataToProcess({dataProcess, buttonActions}) {
  return (

    
    <div className="flex-col">
      {dataProcess.map((item) => (
        <div key={item.id} className="max-w-full  mx-2 my-4 overflow-hidden shadow-md rounded-md shadow-black flex">
          <div className="px-6 py-4 w-2/3 grid grid-cols-2 gap-2"> 
            <div className="font-semibold text-xl flex justify-start mb-2 col-span-1 "><p>Vehículo</p>: {item.Vehicle.typeVehicle}  </div>
            <div className="font-semibold text-xl flex justify-start mb-2 col-span-1 "><p>Placa</p>: {item.Vehicle.plate}  </div>
            <div className="font-semibold text-lg flex mb-2 col-span-1"><p>Servicio </p>: {item.Service.name}</div>
            <p className="text-gray-700 text-lg flex ">Duración: {item.Service.duration}</p>
            <p className="text-gray-700 text-lg ">Observaciónes: {item.observations}</p>
          </div>
          <div className=" flex justify-center w-1/3 items-center mt-4">
          {buttonActions(item.id) && buttonActions(item.id).length > 0 && buttonActions(item.id)}
          </div>
        </div>
      ))}
    </div>
  )
}
