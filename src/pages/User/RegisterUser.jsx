import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { useAuth } from "../../context/UserContext";
import Axios from "../../services/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function RegisterUser() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, registerErrors, successMessage, registrationSuccess } = useAuth()
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const onSubmit = handleSubmit(async (values) => {
    signup(values);

  })
  const getMunicipalities = (id) => {
    Axios.get(`http://localhost:4000/api/users/get-municipality/${id}`)
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
    <>
      <ToastContainer /> 
      <div className="flex justify-center items-center min-h-screen mt-20 bg-gray-200">
        <div className="w-full sm:w-96  bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Registrarse como usuario
          </h2>
          {registerErrors?.map((error, i) => (
            <div className='bg-red-500 p-2 mt-1  rounded-lg text-white' key={i}>
              {error.response.data.message}
            </div>
          ))}

          {successMessage && (
            <div>
              {successMessage} 
            </div>) &&
            toast.success('!Registro exitoso. ', { theme: "light" })
          }


          {/* Condición para mostrar el formulario o el mensaje de éxito */}
          {!registrationSuccess ? (
            <form onSubmit={onSubmit}>
              <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Documento</label>
              <input type="number"  {...register('documentUser', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="Numero de documento" />{errors.documentUser && (
                <p className="text-red-500">el documento es requerido</p>
              )}
              <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Nombre</label>

              <input type="text" {...register('name', { required: true })} className="w-full mb-2 text-black  px-4 py-2 rounded-md" placeholder="nombre" />
              {errors.name && (
                <p className="text-red-500">nombre es requerido</p>
              )}
              <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Apellido</label>
              <input type="text" {...register('lastName', { required: true })} className="w-full  mb-2 text-black px-4 py-2 rounded-md" placeholder="apellidos" />
              <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Telefono</label>
              <input type="number" {...register('phone', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="telefono" />
              <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Correo</label>
              <input type="email" {...register('email', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="correo" />
              {errors.email && (
                <p className="text-red-500">email es requerido</p>
              )}
              <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Contraseña</label>
              <input type="password" {...register('password', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="contraseña" />
              {errors.password && (
                <p className="text-red-500">contraseña es requerida</p>
              )}

              <label className="w-full mb-2 font-semibold text-black px-4 py-2 rounded-md">Departamento</label>
              <select

                className="font-Pathway Gothic One w-full p-2 bg-white rounded-md border border-gray-300 focus:ring"
                placeholder="departamento"
                onChange={(e) => getMunicipalities(e.target.value)}
              >
                <option value="">Departamento</option>
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



              <button type="submit" className="bg-blue-700 text-white font-semibold mt-4 py-2 px-4 rounded hover:bg-cyan-500 focus:outline-none focus:ring focus:ring-cyan-700 w-full">registrarse</button>
              <button className="bg-blue-700 text-white font-semibold mt-4 py-2 px-4 rounded hover:bg-cyan-500 focus:outline-none focus:ring focus:ring-cyan-700 w-full"><a href="/register-client">registrarse como lavadero?</a></button>
            </form>
          ) : (
            <div className="text-center">
            <p>Registro exitoso. ¡Gracias por unirte!</p>
            <a className="text-black text-green-500 text-2xl hover:text-cyan-500" href="/sign-in-user" >iniciar sesión</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RegisterUser