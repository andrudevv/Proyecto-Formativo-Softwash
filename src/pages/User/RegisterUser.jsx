import { React, useState, useEffect} from "react";
import { useForm } from "react-hook-form"
import { useAuth } from "../../context/UserContext";
import Axios from "../../services/axios";
import img from '../../img/SoftWash.jpg'
import { Link, useNavigate  } from "react-router-dom";
import ModelRegister from "../../components/ModalRegister";
import ModalError from "../../components/ModalError";
function RegisterUser() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, registerErrors } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    const rta = await signup(values);
    if(rta) {
      setIsModalOpen(true);
      const timer = setTimeout(() => {
          setIsModalOpen(false)
          navigate("/home-user")
      }, 3000);
      return () => clearTimeout(timer);
  }

  })
  const handleInputDoc= (e) =>{
    
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    if(inputValue === ''){
      return e.target.value = 0
    }
    if(!isNaN(inputValue)){
      const numericValue = parseInt(inputValue, 10);

    const minValue = 0;
    const maxValue = 9999999999; 

    const clampedValue = Math.min(Math.max(numericValue, minValue), maxValue); 
    return e.target.value = clampedValue;
    }else{
      return e.target.value = 0;
    }
   
  }
  const handleInputPhone= (e) =>{
    
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    if(inputValue === ''){
      return e.target.value = 0
    }
    if(!isNaN(inputValue)){
      const numericValue = parseInt(inputValue, 10);

    const minValue = 0;
    const maxValue = 9999999999; 

    const clampedValue = Math.min(Math.max(numericValue, minValue), maxValue); 
    return e.target.value = clampedValue;
    }else{
      return e.target.value = 0;
    }
   
  }
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
            <ModalError isOpen={registerErrors} message={error} key={i} 
            />))}

                    <ModelRegister isOpen={isModalOpen} title={'Registro exitoso'}  />
           
      <div className='flex justify-center '>
        <div className='flex flex-col sm:flex-row sm:w-[85%]  mt-6  bg-gray-200 rounded-lg shadow-lg  shadow-gray-400   relative z-0'>
          <div className='flex flex-col   sm:absolute md:w-2/5 h-full z-10'>

            <section className=" bg-blue-700  rounded-lg sm:rounded-none sm:bg-transparent flex flex-col w-full h-full justify-center items-center p-6" >

              <img className="text-white rounded-md w-24 mb-8" src={img} alt="logo" />
              <h1 className="text-white h-8 text-2xl font-semibold mb-8">SOFTWASH</h1>
              <span className="text-white text-center ml-6 mr-6 text-1xl font-semibold">"Innovación que brilla en cada gota. Tu lavadero, nuestra tecnología."
              </span>
              <hr className=" shadow-xl shadow-white bg-white w-[70%]" />
              <button className="bg-button-primary shadow-lg shadow-blue-400 hover:scale-110 text-black font-semibold transition delay-150 duration-300 ease-in-out  mt-4 rounded hover:bg-blue-400  sm:h-16  w-2/3" ><Link to="/register-client" className="py-6">Registrarse como Lavadero</Link></button>
            </section>
          </div>





          {/* estilos del formulario */}
          <div className='static  sm:block bg-blue-700 sm:w-[40%] sm:h-[100%] h-[80%] sm:border-t-transparent border-r-gray-200   sm:border-t-[600px] sm:border-r-[50px] rounded-l-lg'></div>

          {/* estilos del formulario */}



          <div className='w-full md:w-3/5 bg-gray-200 rounded-lg sm:relative z-10'>
            <section className="p-6">
              <h1 className="text-center font-semibold text-lg mt-2 mb-2">Usuario</h1>
              <hr className=" bg-gray-300 shadow-xl shadow-white h-1 ml-6 mr-6 mb-2" />

              <form onSubmit={onSubmit} className="flex grid-cols-1 md:grid-cols-2  gap-4 max-w-md mx-auto">
                <div className="grid grid-cols-4 gap-4">

                  <div className="col-span-2 relative">
                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Documento <span className="text-red-500">*</span></label>
                    <input type="text"  {...register('documentUser', { required: true   })} maxLength={10} minLength={8}  onChange={handleInputDoc  } className="w-10/12 mb-2 text-black px-4 py-2 rounded-md" placeholder="Cedula" />
                    {errors.documentUser && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}</div>

                  <div className="col-span-2 relative">
                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Nombre <span className="text-red-500">*</span></label>

                    <input type="text" {...register('name', { required: true })} className="w-10/12 mb-2 text-black  px-4 py-2 rounded-md" placeholder="Nombre" />
                    {errors.name && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>

                  <div className="col-span-2 relative">
                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Apellidos <span className="text-red-500">*</span></label>
                    <input type="text" {...register('lastName', { required: true })} className="w-10/12  mb-2 text-black px-4 py-2 rounded-md" placeholder="Apellidos" />
                    {errors.lastName && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>

                  <div className="col-span-2 relative">
                    <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Teléfono <span className="text-red-500">*</span></label>
                    <input type="text" {...register('phone', { required: true })} onChange={handleInputPhone} minLength={10} maxLength={10} className="w-10/12  text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="Ingrese Tel.." />
                    {errors.phone && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>


                  <div className="col-span-2 relative">
                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Correo <span className="text-red-500">*</span></label>
                    <input type="email" {...register('email', { required: true })} className="w-10/12 mb-2 text-black px-4 py-2 rounded-md" placeholder="Correo" />
                    {errors.email && (
                     <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>

                  <div className="col-span-2 relative ">
                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Contraseña <span className="text-red-500">*</span></label>
                    <input type="password" {...register('password', { required: true })} className="w-10/12 mb-2 text-black px-4 py-2 rounded-md" placeholder="Contraseña" />               {errors.password && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                  </div>

                  <div className="col-span-2 ">
                    <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Departamento <span className="text-red-500">*</span></label>
                    <select
                      className="font-Pathway Gothic One w-10/12 p-2 bg-white rounded-md border border-gray-300 focus:ring"
                      placeholder="Departamento"
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
                    <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Municipio <span className="text-red-500">*</span></label>
                    <select {...register('municipalityId', { required: true })} className="font-Pathway Gothic One w-10/12 p-2 bg-white rounded-md border border-gray-300 focus:ring" placeholder="Municipio">
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
                  <div className="col-span-4 ">
                    <button type="submit" className="bg-button-primary  shadow-lg shadow-gray-500 text-black transition delay-150 duration-300 ease-in-out hover:bg-blue-400 font-semibold mt-6 h-10 hover:scale-110   w-full rounded   ">Registrarse</button>
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

export default RegisterUser

