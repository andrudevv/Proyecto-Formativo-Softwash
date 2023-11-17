import { useForm } from "react-hook-form"
import { useAuth } from "../../context/UserContext";
import {  Link, useNavigate } from "react-router-dom";
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




<button  type="submit"className="bg-button-primary text-black font-semibold hover:scale-110 mt-4 py-2 px-4 rounded hover:bg-blue-400  w-full">iniciar sesion</button>
        <button className="bg-button-primary text-black font-semibold hover:scale-110 mt-4 py-2 px-4 rounded hover:bg-blue-400  w-full"><Link to="/sign-in-client">iniciar sesion como lavadero</Link></button>
        <a className=" text-blue-700  font-semibold mt-4 py-2 px-4 rounded hover:scale110 w-full"><Link to="/reset-password-user">Olvido su contraseña?</Link></a>

        {/* <p className="flex gap-x-2 justify-between my-3 ">no tienes una cuenta?  <Link to="/register" className="text-sky-500"> sign up</Link></p> */}
      </form>
    </div>
  )
}

export default LoginUser