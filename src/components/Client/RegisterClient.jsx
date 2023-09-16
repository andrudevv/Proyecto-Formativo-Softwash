import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { clientAuth } from '../../context/ClientContext';
// import { getDepartment } from "../../services/api/auth";
import Axios from "../../services/axios";
function RegisterClient() {


  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signupClient, registerErrors, successMessage, registrationSuccess } = clientAuth();
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  const onSubmit = handleSubmit(async (values) => {

    signupClient(values);

  })
  const getMunicipalities= (id) => {
    Axios.get(`http://localhost:4000/api/users/getDepartments/${id}`)
      .then((Response) => {
        setMunicipalities(Response.data);
      })
      .catch((error) => {
        console.log(error)
        throw error;
      });
  };
  const getDepartment = () => {
    Axios.get(`http://localhost:4000/api/users/getDepartments`)
      .then((Response) => {
        setDepartments(Response.data);
      })
      .catch((error) => {
        console.log(error)
        throw error;
      });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        getDepartment();
      } catch (error) {
        console.error('Error al obtener departamentos:', error);
        // Puedes manejar el error aquí, como mostrar un mensaje al usuario.
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full sm:w-96  bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Registrarse como lavadero
        </h2>
        {registerErrors?.map((error, i) => (
          <div className='bg-red-500 p-2 text-white' key={i}>
            {error.response.data.message}
          </div>
        ))}

        {successMessage && (
          <div className='bg-green-500 p-2 text-white'>
            {successMessage}<a href="/sign-in-client" className="text-black"> iniciar sesion</a>
          </div>
        )}


        {/* Condición para mostrar el formulario o el mensaje de éxito */}
        {!registrationSuccess ? (
          <form onSubmit={onSubmit}>
            <input type="number" {...register('rutLaundry', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="Numero de Rut" />{errors.rutLaundry && (
              <p className="text-red-500">el Rut es requerido</p>
            )}
            <input type="text" {...register('name', { required: true })} className="w-full mb-2 text-black  px-4 py-2 rounded-md" placeholder="nombre" />
            {errors.name && (
              <p className="text-red-500">nombre es requerido</p>
            )}
            <input type="text" {...register('address', { required: true })} className="w-full  mb-2 text-black px-4 py-2 rounded-md" placeholder="direccion" />
            {errors.address && (
              <p className="text-red-500">se requiere una direccion</p>
            )}
            <input type="number" {...register('phone', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="telefono" />
            {errors.phone && (
              <p className="text-red-500">telefono es requerido</p>
            )}
            <input type="email" {...register('email', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="correo" />
            {errors.email && (
              <p className="text-red-500">el correo es requerido</p>
            )}
            <input type="password" {...register('password', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="contraseña" />
            {errors.password && (
              <p className="text-red-500">contraseña es requerida</p>
            )}



            <select
              {...register('departmentId', { required: true })}
              className="font-Pathway Gothic One w-full p-2 bg-white rounded-md border border-gray-300 focus:ring"
              placeholder="departamento"
              onChange={(e) => getMunicipalities(e.target.value)}
            >
              <option  value="">Departamento</option>
              {departments.map((city, index) => (
                <option
                  key={index}
                  value={city.id}
                  style={{ width: "100%" }}
                >

                  {city.name}
                </option>
              ))}
              ))
            </select>
            <select {...register('municipalityId', { required: true })} className="font-Pathway Gothic One w-full p-2 bg-white rounded-md border border-gray-300 focus:ring" placeholder="municipio">
              <option >Municipio</option>
              {municipalities.map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                  style={{ width: "100%" }}
                >

                  {department.name}
                </option>
              ))}
              </select>
            {/* < type="option" {...register('departmentId', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="ciudad" />
          {errors.departmentId && (
            <p className="text-red-500">Departamento es requerida</p>
          )}
          <input type="text" {...register('municipalityId', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="municipio" />
          {errors.municipalityId && (
            <p className="text-red-500">Municipio es requerido</p>
          )} */}



            <button type="submit" className="bg-custom-botones text-white font-semibold mt-4 py-2 px-4 rounded hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-700 w-full">registrarse</button>

            <button className="bg-custom-botones text-white font-semibold mt-4 py-2 px-4 rounded hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-700 w-full"><a href="/registerUser">registrarse como usuario?</a></button>
          </form>
        ) : (
          <p>Registro exitoso. ¡Gracias por unirte!</p>
        )}
      </div>
    </div>
  );
}

export default RegisterClient