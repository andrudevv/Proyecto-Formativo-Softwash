import React, { useEffect, useState } from 'react'
import Axios from "../../services/axios";

export default function ModalUpdateProfileUser({
  errors,
  onSubmit,
  isOpen,
  title,
  message,
  buttons,
  register,
  DataUser,
  setValue,
  handleSubmit,
  reset
}) {

  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
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
        console.log(error);
        console.error('Error al obtener datos del usuario:', error);
        // Puedes manejar el error aquí, como mostrar un mensaje al usuario.
      }
    };

    fetchData();
    if (DataUser) {
      Object.keys(DataUser).forEach((key) => {
        setValue(key, DataUser[key]);
      });
    }
    // else{
    //   reset()

    // } 
  }, [DataUser, setValue, reset]);
  if (!isOpen) return null
  return (
    <div id='modal-component-container' className='fixed z-10 inset-0'>
      <div className='modal-flex-container flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='modal-bg-container fixed inset-0 bg-gray-700 bg-opacity-75'></div>

        <div className='modal-space-container hidden sm:inline-block sm:align-middle sm:h-screen'></div>

        <div

          className='  inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-3xl sm: w-full'
        >
          <div className='modal-wrapper bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='modal-wrapper-flex sm:flex flex grid-cols-1 gap-4  sm:items-start'>


              <div className='modal-content text-center mt-3  sm:mt-0 w-full sm:ml-4 sm:text-left'>
                <h3 className='text-lg font-medium text-center my-4 text-gray-900'>{title}</h3>
                <div className='modal-text my-2 text-center'>
                  <p className='text-gray-500 mb-6 text-sm'>{message}</p>
                </div>
                <form className='grid grid-rows-4 grid-flow-col gap-4' onSubmit={handleSubmit((values) => onSubmit(values, DataUser))}>
                  {/* Agregar campos de registro de vehículo */}
                  <div className='col-span-2 flex flex-col relative'>
                    <label className='font-semibold text-gray-700'>Nit</label>
                    <input type="number" {...register('rutLaundry', { required: true })}
                      className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="Nit" />
                    {errors.rutLaundry && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>
                  <div className='col-span-2 flex flex-col relative'>
                    <label className='font-semibold text-gray-700'>Nombre</label>
                    <input type="text" {...register('name', { required: true })}
                      className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="Nombre" />
                    {errors.name && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>
                  <div className='col-span-2 flex flex-col relative'>
                    <label className='font-semibold text-gray-700'>Direccion</label>
                    <input type="text" {...register('address', { required: true })}
                      className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="cra 7ma norte frente" />
                    {errors.address && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>
                  <div className='col-span-2 flex flex-col relative'>
                    <label className='font-semibold text-gray-700'>Telefono</label>
                    <input type="number" {...register('phone', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="lavado rapido" />
                    {errors.phone && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>

                  <div className='col-span-2 flex flex-col relative'>
                    <label className='w-full font-semibold text-gray-700'>Correo</label>
                    <input type="text" {...register('email', { required: true })} className="mt-1 p-2 border w-full border-gray-300 rounded-md" placeholder="25000" />
                    {errors.email && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>
                  <div className='col-span-2 flex flex-col relative'>
                    <label className='font-semibold text-gray-700'>Capacidad</label>
                    <input type="number" {...register('ability', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="1 ó 2 ó 3.. etc" />
                    {errors.ability && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>
                  <div className='col-span-2 flex flex-col relative'>
                    <label className='font-semibold text-gray-700'>Hora Apertura</label>
                    <input type="text" {...register('aperture', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="07:00 AM" />
                    {errors.aperture && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>
                  <div className='col-span-2 flex flex-col relative'>
                    <label className='font-semibold text-gray-700'>Hora Cierre</label>
                    <input type="text" {...register('closing', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="05:00 PM" />
                    {errors.closing && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>
                  <div className="col-span-2 relative ">
                    <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Municipio <span className="text-red-500">*</span></label>
                    <select  {...register('municipalityId', { required: true })} className="font-Pathway Gothic One w-10/12 p-2 bg-white rounded-md border border-gray-300 focus:ring" placeholder="Municipio">
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
                  </div>

                  <div className="col-span-2 relative">
                    <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Departamento <span className="text-red-500">*</span></label>
                    <select
                      className="font-Pathway Gothic One w-10/12 p-2 bg-white rounded-md border border-gray-300 focus:ring"
                      placeholder="Departamento"
                      onChange={(e) => getMunicipalities(e.target.value)}
                    >
                      <option value="">Departamento</option>
                      {departments.map((city) => (
                        <option
                          key={city.id}
                          value={city.id}
                          style={{ width: "100%" }}
                        >

                          {city.name}
                        </option>
                      ))}
                      ))
                    </select>
                  </div>



                  {/* Fin de campos de registro de vehículo */}
                </form>
              </div>
            </div>
          </div>

          <div className='modal-actions bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => button.onClick && button.onClick()}
                className={`${index > 0 ? 'ml-3' : ''
                  } w-full inline-flex justify-center rounded-md border border-gray-300 shadow-md px-4 py-2  font-medium text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm ${button.estilos}`}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
