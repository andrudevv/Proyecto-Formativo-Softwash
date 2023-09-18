
import {React, useState, useEffect } from "react";
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
          <div className='bg-red-500 p-2 mt-1 rounded-lg text-white' key={i}>
            {error}
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
            <label className="w-full mb-2 font-semibold text-black px-4 py-2 rounded-md">Numero de Rut</label>
            <input type="number" {...register('rutLaundry', { required: true })} className="w-full mb-2 text-black px-4 border border-gray-300 py-2 rounded-md" placeholder="ingrese rut" />{errors.rutLaundry && (
              <p className="text-red-500">el Rut es requerido</p>
            )}
            <label className="w-full mb-2 font-semibold text-black px-4 py-2 rounded-md">Nombre</label>
            <input type="text" {...register('name', { required: true })} className="w-full mb-2 text-black  px-4 border border-gray-300px-4 py-2 rounded-md" placeholder="ingrese nombre" />
            {errors.name && (
              <p className="text-red-500">nombre es requerido</p>
            )}
            <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Direccion</label>
            <input type="text" {...register('address', { required: true })} className="w-full  mb-2 text-black px-4 py-2  border border-gray-300 rounded-md" placeholder="ingrese direccion" />
            {errors.address && (
              <p className="text-red-500">se requiere una direccion</p>
            )}
            <label className="w-full mb-2 font-semibold text-black px-4 py-2 rounded-md">Telefono</label>
            <input type="number" {...register('phone', { required: true })} className="w-full mb-2 text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="ingrese telefono" />
            {errors.phone && (
              <p className="text-red-500">telefono es requerido</p>
            )}
            <label className="w-full mb-2 font-semibold text-black px-4 py-2 rounded-md">Correo</label>
            <input type="email" {...register('email', { required: true })} className="w-full mb-2  border border-gray-300 text-black px-4 py-2 rounded-md" placeholder="ingrese correo" />
            {errors.email && (
              <p className="text-red-500">el correo es requerido</p>
            )}
            <label className="w-full mb-2 font-semibold text-black px-4 py-2 rounded-md">Contraseña</label>
            <input type="password" {...register('password', { required: true })} className="w-full mb-2  border border-gray-300 text-black px-4 py-2 rounded-md" placeholder="ingrese contraseña" />
            {errors.password && (
              <p className="text-red-500">contraseña es requerida</p>
            )}


<label className="w-full mb-2 font-semibold text-black px-4 py-2 rounded-md">Departamento</label>
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
            <label className="w-full mb-2 font-semibold text-black px-4 py-2 rounded-md">Municipio</label>
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