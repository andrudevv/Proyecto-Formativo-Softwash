import React from 'react'
import ContentTable from '../../components/ContentTable'
import ProfileUser from '../../components/ProfileUser';

export default function ViewProfileUser() {
    const user = {
		"documentUser": 1234,
		"name": "andrewadmin",
		"lastName": "ramirez",
		"phone": 1231214,
		"email": "rvandruzyzz@gmail.com",
		"role": "user",
		"municipalityId": {
			"id": 2,
			"name": "Puerto Nariño",
			"departmentId": 1
		}
	}
    const fieldsMapping = {
        "documentUser": "Cedula",
        "name": "Nombre",
        "lastName": "Apellido",
        "phone": "Telefono",
        "email": "Correo",
        "municipalityId": "Municipio",
        "departmentId": "Departamento"
      };
    const fields = ["documentUser", "name", "lastName", "phone", "email", "municipalityId", "departmentId"];
  return (
    <>
    <div>

        <ProfileUser user={user}/>
    </div>
    </>
  )
}
