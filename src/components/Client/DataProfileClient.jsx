import React, { useEffect, useState } from 'react'
import ButtonAction from '../ButtonAction'
import Spinner from '../SpinnerLoading'
export default function DataProfileClient({ client, onClick }) {
  const [loading, setLoading] = useState(true);
  const [clientD, setClientD] = useState(false);


  useEffect(() => {
    if (client) {
      setClientD(client);
      setLoading(false);
    }

  }, [client])

  if (loading) {
    return <Spinner />;
  }



  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
      <div className="grid grid-cols-2 mt-10 gap-10">

        <div>
          <strong>Nit</strong> {clientD.rutLaundry}
        </div>
        <div>
          <strong>Nombre:</strong> {clientD.name}
        </div>
        <div>
          <strong>Direccion:</strong> {clientD.address}
        </div>
        <div>
          <strong>Correo:</strong> {clientD.email}
        </div>
        <div>
          <strong>Telefono:</strong> {clientD.phone}
        </div>
        <div>
          <strong>Capacidad:</strong> {clientD.ability}
        </div>
        <div>
          <strong>Hora Apertura:</strong> {clientD.aperture}
        </div>
        <div>
          <strong>Hora Cierre:</strong> {clientD.closing}
        </div>
        <div>
          <strong>Municipio:</strong> {clientD.municipalityId.name}
        </div>
        <div className='col-span-2 text-center'>
          <ButtonAction onClick={onClick} estilos={'w-1/3 h-10 font-bold bg-button-primary rounded-md'} text={'Actualizar'} />
        </div>
      </div>
    </div>
  )
}
