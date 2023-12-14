import React, { useEffect, useState } from 'react'
import ButtonAction from '../ButtonAction'
import Spinner from '../SpinnerLoading'
export default function DataProfile({user, onClick}) {
  const [ loading, setLoading] = useState(true);
  const [ userD, setUserD] = useState(false);


useEffect(() =>{

if(user){
  setUserD(user);
  setLoading(false);
}

},[user])

  if(loading){
    return <Spinner/>;
  }



  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
      <div className="grid grid-cols-2 mt-10 gap-10">
        <div>
          <strong>Nombre:</strong> {userD.name}
        </div>
        <div>
          <strong>Apellido:</strong> {userD.lastName}
        </div>
        <div>
          <strong>Correo:</strong> {userD.email}
        </div>
        <div>
          <strong>Cedula:</strong> {userD.documentUser}
        </div>
        <div>
          <strong>Teléfono:</strong> {userD.phone}
        </div>
        <div>
          <strong>Municipio:</strong> {userD.Municipality.name}
        </div>
        <div className='col-span-2 text-center'>
          <ButtonAction onClick={onClick} estilos={'w-1/3 h-10 font-bold bg-button-primary rounded-md'} text={'Actualizar'} />
        </div>
      </div>
    </div>
  )
}
