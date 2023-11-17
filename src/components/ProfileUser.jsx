import React from 'react'
import ButtonAction from './ButtonAction'
export default function ProfileUser({user}) {
  const fieldsMapping = {
    "documentUser": "Cedula",
    "name": "Nombre",
    "lastName": "Apellido",
    "phone": "Telefono",
    "email": "Correo",
    "municipalityId": "Municipio",
    "departmentId": "Departamento"
  };

  return (
    <>
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
      {/* <img
        src={user.documentUser} // Asegúrate de tener una propiedad 'avatar' en tu objeto 'user'
        alt={user.name} // Asegúrate de tener una propiedad 'name' en tu objeto 'user'
        className="w-32 h-32 rounded-full mx-auto mb-4"
      /> */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{user.name} {user.lastName}</h2>
      

      {/* Otros detalles del perfil */}
      <div className="grid grid-cols-2 mt-10 gap-10">
      <div>
          <strong>Nombre:</strong> {user.name}
        </div>
      <div>
          <strong>Apellido:</strong> {user.lastName}
        </div>
        <div>
          <strong>Correo:</strong> {user.email}
        </div>
        <div>
          <strong>Cedula:</strong> {user.documentUser}
        </div>
        <div>
          <strong>Telefono:</strong> {user.phone}
        </div>

        <div>
          <strong>Municipio:</strong> {user.municipalityId.name}
        </div>
        <div className='col-span-2 text-center'>
        <ButtonAction tipo={onclick} estilos={'w-1/3 h-10 bg-button-primary rounded-md'} text={'Actualizar'}/>

        </div>
       
        {/* Agrega más detalles según sea necesario */}
      </div>

      
    </div>
    <section className='flex mt-10 justify-center'>
    <ButtonAction tipo={onclick} estilos={'bg-button-primary w-1/3 h-10'} text={'Mis Vehiculos'}/>
  </section>
  </>
  )
}
