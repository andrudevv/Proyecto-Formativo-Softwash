import { useForm } from "react-hook-form"
import { useAuth } from "../../context/UserContext";
import {  Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import fondoLogin from '../../img/gotas.jpg'
function LoginUser() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, registerErrors, isAuthenticatedUser} = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
    // console.log(Response);
  })

  useEffect(() => {
    if (isAuthenticatedUser) {
      navigate("/home-user");
    }
  }, [isAuthenticatedUser]);
  return (
    <div className="flex  items-center justify-center h-screen bg-custom-pagina-fondo">
      <div className="h-full  w-screen absolute bg-gray-700">
      <img src={fondoLogin} className="opacity-25 h-full w-screen " alt="" />
      </div>
      <form onSubmit={onSubmit} className="bg-gray-700 bg-opacity-80 shadow-xl shadow-gray-800 rounded-lg absolute w-full md:w-1/2 p-4">
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
      <h2 className="text-2xl font-semibold mb-6 text-white text-center">Iniciar sesión como usuario</h2>
      <label className="w-full mb-2 font-semibold text-white px-4 py-3 text-lg  rounded-md">Correo</label>
        <input type="email" {...register('email', { required: true })} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="correo" />
        {errors.email && (
          <p className="text-red-500 text-lg ">email es requerido</p>
        )}
        <label className="w-full mb-2 font-semibold text-white px-4 py-2 text-lg rounded-md">Contraseña</label>
        <input type="password" {...register('password', { required: true })} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="contraseña" />
        {errors.password && (
          <p className="text-red-500 text-lg">contraseña es requerida</p>
        )}




<button  type="submit"className="bg-button-primary text-black font-semibold transition delay-150 duration-300 ease-in-out hover:scale-110 mt-4 py-2 px-4 rounded hover:bg-blue-400  w-full">iniciar sesion</button>
        <button type="button" className="bg-button-primary transition delay-150 duration-300 ease-in-out text-black font-semibold mt-4 py-2 px-4 rounded hover:scale-110 hover:bg-blue-400  w-full">
          <Link to="/sign-in-client">iniciar sesion como lavadero</Link>
          </button>
        <p className=" text-cyan-400  font-semibold text-lg mt-4 py-2 px-4 rounded hover:scale110 w-full"><Link to="/reset-password-user">Olvido su contraseña?</Link></p>

        {/* <p className="flex gap-x-2 justify-between my-3 ">no tienes una cuenta?  <Link to="/register" className="text-sky-500"> sign up</Link></p> */}
      </form>
    </div>
  )
}

export default LoginUser