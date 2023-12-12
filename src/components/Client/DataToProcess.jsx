import React from 'react'

export default function DataToProcess({dataProcess, buttonActions}) {
  return (

    
    <div className="flex-col">
      {dataProcess.map((item) => (
        <div key={item.id} className="max-w-full  mx-2 my-4 overflow-hidden shadow-xl flex">
          <div className="px-6 py-4 w-2/3">
            <div className="font-bold text-xl mb-2">{item.Vehicle.typeVehicle}: {item.Vehicle.plate}</div>
            <div className="font-bold text-lg mb-2">{item.Service.name}</div>
            <p className="text-gray-700 text-base">Duracion: {item.Service.duration}</p>
            <p className="text-gray-700 text-base">Observaciones: {item.observations}</p>
          </div>
          <div className="flex-wrap flex justify-center items-center mt-4">
          {buttonActions(item.id) && buttonActions(item.id).length > 0 && buttonActions(item.id)}
          </div>
        </div>
      ))}
    </div>
  )
}
