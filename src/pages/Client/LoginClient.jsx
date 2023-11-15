import { useForm } from "react-hook-form"
import { useAuth } from "../../context/UserContext";
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";
function LoginUser() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, registerErrors , isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
    // console.log(Response);
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/homeUser");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex items-center justify-center h-screen bg-custom-pagina-fondo">
      
      {registerErrors?.map((error, i) => (
          <div className='bg-red-500 p-2 mt-1 rounded-lg text-white' key={i}>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit} className="bg-gray-300 shadow-md rounded-lg w-full md:w-1/2 p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar sesión como lavadero</h2>
        <input type="email" {...register('email', { required: true })} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="correo" />
        {errors.correo && (
          <p className="text-red-500">email es requerido</p>
        )}
        <input type="password" {...register('password', { required: true })} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="contraseña" />
        {errors.clave && (
          <p className="text-red-500">contraseña es requerida</p>
        )}




        <button type="submit" className="bg-custom-botones text-white font-semibold mt-4 py-2 px-4 rounded hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-700 w-full">iniciar sesion</button>
        <button className="bg-custom-botones text-white font-semibold mt-4 py-2 px-4 rounded hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-700 w-full"><a href="/sign-in-user">iniciar sesion como usuario</a></button>

        {/* <p className="flex gap-x-2 justify-between my-3 ">no tienes una cuenta?  <Link to="/register" className="text-sky-500"> sign up</Link></p> */}
      </form>
    </div>
  )
}

export default LoginUser