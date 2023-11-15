import { useForm } from "react-hook-form"
import { useAuth } from "../../context/UserContext";
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";
function LoginUser() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, registerErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
    // console.log(Response);
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home-user");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex items-center justify-center h-screen bg-custom-pagina-fondo">
      
     
      <form onSubmit={onSubmit} className="bg-gray-300 shadow-md rounded-lg w-full md:w-1/2 p-4">
      {registerErrors?.map((error, i) => (
          <div className='bg-red-500 p-2 mt-1 rounded-lg text-white' key={i}>
            {error}
          </div>
        ))
      }
      <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar sesión como usuario</h2>
      <label className="w-full mb-2 font-semibold text-black px-4 py-3 rounded-md">Correo</label>
        <input type="email" {...register('email', { required: true })} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="correo" />
        {errors.email && (
          <p className="text-red-500">email es requerido</p>
        )}
        <label className="w-full mb-2 font-semibold text-black px-4 py-2 rounded-md">Contraseña</label>
        <input type="password" {...register('password', { required: true })} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="contraseña" />
        {errors.password && (
          <p className="text-red-500">contraseña es requerida</p>
        )}




        <button type="submit" className="bg-gradient-to-r from-blue-200 via-red-200 to-yellow-200 transition-colors duration-500 hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-400 hover:to-yellow-300 ">iniciar sesion</button>
        <a className="bg-custom-botones text-white font-semibold mt-4 py-2 px-4 rounded transition easy-in duration-700 hover:bg-violet-700  w-full"><a href="/sign-in-client">iniciar sesion como lavadero</a></a>

        {/* <p className="flex gap-x-2 justify-between my-3 ">no tienes una cuenta?  <Link to="/register" className="text-sky-500"> sign up</Link></p> */}
      </form>
    </div>
  )
}

export default LoginUser