
import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { clientAuth } from '../../context/ClientContext';
import { Link, useNavigate } from "react-router-dom";
import img from "../../img/SoftWash.jpg"
import Axios from "../../services/axios";
import ModelRegister from "../../components/ModalRegister";


function RegisterClient() {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { signUpClient, registerErrors, successMessage } = clientAuth();
    const [departments, setDepartments] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const navigate = useNavigate();


    const onSubmit = handleSubmit(async (values) => {

        const rta = await signUpClient(values);
        if (rta) {
            setIsModalOpen(true);
            // toast.success('!Registro exitoso. ', { theme: "light" })
            const timer = setTimeout(() => {
                // Redirige a la página deseada
                setIsModalOpen(false)
                navigate("/home-client")
                // <Redirect to="/home-user" />;;
            }, 3000);
            return () => clearTimeout(timer);
        }

    })

    // const openModal = () => {
    //     setIsModalOpen(true);
    // }
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
            
            {registerErrors.map((error, i) => (
                    <div className="flex justify-center items-center">
                        <div id='modal-component-container' className='fixed  h-52  z-10  top-0'>
                            <div className='modal-flex-container flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                                <div className='modal-bg-container fixed inset-0 bg-gray-700 bg-opacity-75'></div>
                                <div className='modal-space-container hidden sm:inline-block sm:align-middle sm:h-screen'></div>

                                <div id='modal-container' className='modal-container inline-block align-bottom  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full'>
                                    <div className=' bg-red-500 p-2  rounded-lg text-white' key={i}>
                                        {error}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)) }


            <ModelRegister isOpen={isModalOpen} title={'Registro exitoso'} message={successMessage} />





            <div className='flex justify-center '>
                <div className='flex flex-col sm:flex-row md:w-[85%]  mt-6  bg-gray-200 rounded-lg shadow-lg  shadow-gray-400   relative z-0'>
                    <div className='flex flex-col sm:flex  sm:absolute md:w-2/5 h-full z-10'>

                        <section className=" bg-blue-700  rounded-lg sm:rounded-none sm:bg-transparent flex flex-col w-full h-full justify-center items-center p-6" >

                            <img className="text-white rounded-md w-24 mb-8" src={img} alt="logo" />
                            <h1 className="text-white h-8 text-2xl font-semibold mb-8">SOFTWASH</h1>
                            <span className="text-white text-center ml-6 mr-6 text-1xl font-semibold">"Innovación que brilla en cada gota. Tu lavadero, nuestra tecnología."
                            </span>
                            <hr className=" shadow-xl shadow-white bg-white w-[70%]" />
                            <button className="bg-button-primary shadow-lg transition delay-150 duration-300 ease-in-out shadow-blue-400 hover:scale-110 text-black font-semibold  lg:h-10 mt-4 rounded hover:bg-blue-400  md:h-16 w-2/3" ><Link to="/register-user">Registrarse como usuario?</Link></button>
                        </section>
                    </div>





                    {/* estilos del formulario */}
                    <div className='static  md:block bg-blue-700 sm:w-[40%] md:h-[100%] h-[80%] sm:border-t-transparent border-r-gray-200   sm:border-t-[600px] sm:border-r-[50px] rounded-l-lg'></div>

                    {/* estilos del formulario */}



                    <div className='w-full md:w-3/5 bg-gray-200 rounded-lg md:relative z-10'>
                        <section className="p-6">
                            <h1 className="text-center font-semibold text-lg mt-2 mb-2">Cliente/Lavadero</h1>
                            <hr className=" bg-gray-300 shadow-xl shadow-white h-1 ml-6 mr-6 mb-2" />
                            <form onSubmit={onSubmit} className="flex grid-cols-1 md:grid-cols-2  gap-4 max-w-md mx-auto">
                                <div className="grid grid-cols-4 gap-4">

                                    <div className="col-span-2 relative">
                                        <label className=" w-full font-semibold text-black px-4 py-2 rounded-md">Numero de Rut <span className="text-red-500">*</span></label>
                                        <input type="number" {...register('rutLaundry', { required: true })} className="w-10/12  text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="RUT/NIT" />
                                        {errors.rutLaundry && (
                                            <p className="absolute right-0 top-0  text-red-500">&#9888;<span className="text-red-500 hidden lg:inline ">requerido</span></p>
                                        )}</div>

                                    <div className="col-span-2 relative">
                                        <label className="w-full font-semibold text-black px-4 py-2 rounded-md">Nombre <span className="text-red-500">*</span></label>
                                        <input type="text" {...register('name', { required: true })} className="w-10/12  text-black   border   px-4 py-2 rounded-md"
                                            placeholder="Lavadero" />
                                        {errors.name && (
                                            <p className="absolute right-0 top-0  text-red-500">&#9888;<span className="text-red-500 hidden lg:inline ">requerido</span></p>
                                        )}
                                    </div>

                                    <div className="col-span-2 relative">
                                        <label className="w-full   font-semibold text-black px-4 py-2 rounded-md">Direccion <span className="text-red-500">*</span></label>
                                        <input type="text" {...register('address', { required: true })} className="w-10/12   text-black px-4 py-2  border border-gray-300 rounded-md" placeholder="Cra 4ta" />
                                        {errors.address && (
                                            <p className="absolute right-0 top-0  text-red-500">&#9888;<span className="text-red-500 hidden lg:inline ">requerido</span></p>
                                        )}
                                    </div>

                                    <div className="col-span-2 relative">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Telefono <span className="text-red-500">*</span></label>
                                        <input type="number" {...register('phone', { required: true })} className="w-10/12  text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="Ingrese Tel.." />
                                        {errors.phone && (
                                            <p className="absolute right-0 top-0  text-red-500">&#9888;<span className="text-red-500 hidden lg:inline ">requerido</span></p>
                                        )}
                                    </div>

                                    <div className="col-span-2 relative">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Capacidad <span className="text-red-500">*</span></label>
                                        <input type="number" {...register('ability', { required: true })} className="w-10/12  text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="1 o 2 o 3 etc" />
                                        {errors.ability && (
                                            <p className="absolute right-0 top-0  text-red-500">&#9888;<span className="text-red-500 hidden lg:inline ">requerido</span></p>
                                        )}
                                    </div>

                                    <div className="col-span-2 relative">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Horario de Inicio <span className="text-red-500">*</span></label>
                                        <input type="text" {...register('aperture', { required: true })} className="w-10/12  text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="07:00 AM" />
                                        {errors.aperture && (
                                            <p className="absolute right-0 top-0  text-red-500">&#9888;<span className="text-red-500 hidden lg:inline ">requerido</span></p>
                                        )}
                                    </div>

                                    <div className="col-span-2 relative">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Horario de cierre <span className="text-red-500">*</span></label>
                                        <input type="text" {...register('closing', { required: true })} className="w-10/12  text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="05:00 PM" />
                                        {errors.closing && (
                                            <p className="absolute right-0 top-0  text-red-500">&#9888;<span className="text-red-500 hidden lg:inline ">requerido</span></p>
                                        )}
                                    </div>

                                    <div className="col-span-2 relative">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Correo <span className="text-red-500">*</span></label>
                                        <input type="email" {...register('email', { required: true })} className="w-10/12  border border-gray-300 text-black px-4 py-2 rounded-md" placeholder="Ingrese correo" />
                                        {errors.email && (
                                            <p className="absolute right-0 top-0  text-red-500">&#9888;<span className="text-red-500 hidden lg:inline ">requerido</span></p>
                                        )}
                                    </div>
                                    <div className="col-span-2 relative">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Contraseña <span className="text-red-500">*</span></label>
                                        <input type="password" {...register('password', { required: true })} className="w-10/12  border border-gray-300 text-black px-4 py-2 rounded-md" placeholder="Ingrese contraseña" />
                                        {errors.password && (
                                            <p className="absolute right-0 top-0  text-red-500">&#9888;<span className="text-red-500 hidden lg:inline ">requerido</span></p>
                                        )}
                                    </div>

                                    <div className="col-span-2 relative">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Departamento <span className="text-red-500">*</span></label>
                                        <select
                                            className="font-Pathway Gothic One w-10/12 p-2 bg-white rounded-md border border-gray-300 focus:ring"
                                            placeholder="departamento"
                                            onChange={(e) => getMunicipalities(e.target.value)}
                                        >
                                            <option value="">Departamento</option>
                                            {departments.map((city, index) => (<option
                                                key={index}
                                                value={city.id}
                                                style={{ width: "100%" }}>{city.name}</option>))}

                                        </select>
                                    </div>

                                    <div className="col-span-2 ">
                                        <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Municipio <span className="text-red-500">*</span></label>
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
                                        <button type="submit" className="bg-button-primary shadow-lg shadow-gray-500 text-black transition delay-150 duration-300 ease-in-out hover:bg-blue-400 font-semibold mt-6 h-10 hover:scale-110  w-full rounded   ">Registrarse</button>
                                    </div>



                                </div>
                            </form>
                        </section>

                    </div>
                </div>
            </div>

        </>
    );
}

export default RegisterClient