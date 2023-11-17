import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { clientAuth } from '../../context/ClientContext';
import img from "../../img/SoftWash.jpg";
// import { getDepartment } from "../../services/api/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "../../services/axios";
export default function otroregistro() {

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
            <div className='flex justify-center'>
                <div className='flex flex-col sm:flex-row md:w-[85%]  mt-6 bg-gray-200 rounded-lg shadow-lg  shadow-gray-400   relative z-0'>
                    <div className='flex flex-col sm:flex  sm:absolute md:w-2/5 h-full z-10'>

                        <section className=" bg-blue-700  rounded-lg sm:rounded-none sm:bg-transparent flex flex-col w-full h-full justify-center items-center p-6" >

                            <img className="text-white rounded-md w-24 mb-8" src={img} alt="logo" />
                            <h1  className="text-white h-8 text-2xl font-semibold mb-8">SOFTWASH</h1>
                            <span className="text-white text-center ml-6 mr-6 text-1xl font-semibold">"Innovación que brilla en cada gota. Tu lavadero, nuestra tecnología."
                            </span>
                            <hr className=" shadow-xl shadow-white bg-white w-[70%]"/>
                            <button className="bg-button-primary shadow-lg shadow-blue-400 hover:scale-110 text-black font-semibold  lg:h-10 mt-4 rounded hover:bg-blue-400  md:h-16 w-2/3"><a href="/register-user">Registrarse como usuario?</a></button>
                        </section>
                    </div>





                    {/* estilos del formulario */}
                    <div className='static  md:block bg-blue-700 sm:w-[40%] md:h-[100%] h-[80%] sm:border-t-transparent border-r-gray-200   sm:border-t-[600px] sm:border-r-[50px] rounded-l-lg'></div>

                    {/* estilos del formulario */}



                    <div className='w-full md:w-3/5 bg-gray-200 rounded-lg md:relative z-10'>
                        <section className="p-6">
                            <h1 className="text-center font-semibold text-lg mt-2 mb-2">Registro del Cliente/Lavadero</h1>
                            <hr className=" bg-gray-300 shadow-xl shadow-white h-1 ml-6 mr-6 mb-2"/>
                            <form onSubmit={onSubmit} className="flex grid-cols-1 md:grid-cols-2  gap-4 max-w-md mx-auto">
                                <div className="grid grid-cols-4 gap-4">

                                    <div className="col-span-full md:col-span-2 "><i class="fas fa-info-circle text-blue-500 cursor-pointer" title="Ingrese su nombre completo"></i>
                                        <label  className=" w-full font-semibold text-black px-4 py-2 rounded-md">Numero de Rut</label>
                                        <input type="number" {...register('rutLaundry', { required: true })} className="w-10/12  text-black px-4 border border-gray-300 py-2 rounded-md" placeholder="ingrese rut" />{errors.rutLaundry && (
                                            <p className="text-red-500">el Rut es requerido</p>
                                        )}</div>

                                    <div className="col-span-2">
                                        <label className="w-full font-semibold text-black px-4 py-2 rounded-md">Nombre</label>
                                        <input type="text" {...register('name', { required: true })} className="w-10/12  text-black   border border-gray-300 px-4 py-2 rounded-md" placeholder="ingrese nombre" />
                                        {errors.name && (
                                            <p className="text-red-500">nombre es requerido</p>
                                        )}
                                    </div>

                                    <div className="col-span-2 ">
                                        <label className="w-full   font-semibold text-black px-4 py-2 rounded-md">Direccion</label>
                                        <input type="text" {...register('address', { required: true })} className="w-10/12   text-black px-4 py-2  border border-gray-300 rounded-md" placeholder="ingrese direccion" />
                                        {errors.address && (
                                            <p className="text-red-500">se requiere una direccion</p>
                                        )}
                                    </div>

                                    <div className="col-span-2 ">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Telefono</label>
                                        <input type="number" {...register('phone', { required: true })} className="w-10/12  text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="ingrese telefono" />
                                        {errors.phone && (
                                            <p className="text-red-500">telefono es requerido</p>
                                        )}
                                    </div>

                                    <div className="col-span-2 ">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Disponibilidad</label>
                                        <input type="number" {...register('ability', { required: true })} className="w-10/12  text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="capacidad para lavar simultaneamente" />
                                        {errors.ability && (
                                            <p className="text-red-500">disponibilidad es requerida</p>
                                        )}
                                    </div>

                                    <div className="col-span-2 ">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Horario de apertura</label>
                                        <input type="text" {...register('aperture', { required: true })} className="w-10/12  text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="ingrese hora al abrir el lavadero" />
                                        {errors.aperture && (
                                            <p className="text-red-500">Horario de apertura es requerido</p>
                                        )}
                                    </div>

                                    <div className="col-span-2 ">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Horario de cierre</label>
                                        <input type="text" {...register('closing', { required: true })} className="w-10/12  text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="ingrese hora al cerrar el lavadero" />
                                        {errors.closing && (
                                            <p className="text-red-500">Horario de cierre es requerido</p>
                                        )}
                                    </div>

                                    <div className="col-span-2 ">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Correo</label>
                                        <input type="email" {...register('email', { required: true })} className="w-10/12  border border-gray-300 text-black px-4 py-2 rounded-md" placeholder="ingrese correo" />
                                        {errors.email && (
                                            <p className="text-red-500">el correo es requerido</p>
                                        )}
                                    </div>
                                    <div className="col-span-2 ">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Contraseña</label>
                                        <input type="password" {...register('password', { required: true })} className="w-10/12  border border-gray-300 text-black px-4 py-2 rounded-md" placeholder="ingrese contraseña" />
                                        {errors.password && (
                                            <p className="text-red-500">contraseña es requerida</p>
                                        )}
                                    </div>

                                    <div className="col-span-2 ">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Departamento</label>
                                        <select
                                            className="font-Pathway Gothic One w-10/12 p-2 bg-white rounded-md border border-gray-300 focus:ring"
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
                                    </div>

                                    <div className="col-span-2 ">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Municipio</label>
                                        <select {...register('municipalityId', { required: true })} className="font-Pathway Gothic One w-10/12 p-2 bg-white rounded-md border border-gray-300 focus:ring" placeholder="municipio">
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
                                    <div className="col-span-2 ">
                                    <button type="submit" className="bg-button-primary shadow-lg shadow-gray-500 text-black hover:bg-blue-400 font-semibold mt-6 h-10 hover:scale-110  w-full rounded   ">Registrarse</button>
                                    </div>



                                </div>
                            </form>
                        </section>

                    </div>
                </div>
            </div>
        </>
    )
}
