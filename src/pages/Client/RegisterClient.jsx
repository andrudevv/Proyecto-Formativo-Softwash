
import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { clientAuth } from '../../context/ClientContext';
// import { getDepartment } from "../../services/api/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "../../services/axios";
function RegisterClient() {


  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signupClient, registerErrors, successMessage, registrationSuccess } = clientAuth();
  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  const onSubmit = handleSubmit(async (values) => {

    signupClient(values);

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
      <div className="flex justify-center items-center min-h-screenbg-gradient-to-r mt-20 from-gray-200 via-neutral-100 to-gray-200   border-gray-200">
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
              {successMessage}
            </div>) &&
            toast.success('!Registro exitoso. ', { theme: "light" })
          }


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
              <label className="w-full mb-2 font-semibold text-black px-4 py-2 rounded-md">Disponibilidad</label>
              <input type="number" {...register('ability', { required: true })} className="w-full mb-2 text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="capacidad para lavar simultaneamente" />
              {errors.ability && (
                <p className="text-red-500">disponibilidad es requerida</p>
              )}
              <label className="w-full mb-2 font-semibold text-black px-4 py-2 rounded-md">Horario de apertura</label>
              <input type="text" {...register('aperture', { required: true })} className="w-full mb-2 text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="ingrese hora al abrir el lavadero" />
              {errors.aperture && (
                <p className="text-red-500">Horario de apertura es requerido</p>
              )}<label className="w-full mb-2 font-semibold text-black px-4 py-2 rounded-md">Horario de cierre</label>
              <input type="text" {...register('closing', { required: true })} className="w-full mb-2 text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="ingrese hora al cerrar el lavadero" />
              {errors.closing && (
                <p className="text-red-500">Horario de cierre es requerido</p>
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
              <button type="submit" className="bg-button-primary text-black hover:bg-button-secundary  font-semibold mt-4 py-2 px-4 rounded  focus:outline-none focus:ring focus:ring-violet-700 w-full">registrarse</button>

              <button className="bg-button-primary text-black font-semibold mt-4 py-2 px-4 rounded hover:bg-button-secundary focus:outline-none focus:ring focus:ring-violet-700 w-full"><a href="/registerUser">registrarse como usuario?</a></button>
            </form>
          ) : (
            <p>Registro exitoso. ¡Gracias por unirte!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default RegisterClient