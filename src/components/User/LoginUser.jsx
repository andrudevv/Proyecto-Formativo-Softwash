import { useForm } from "react-hook-form"
import { useAuth } from "../../context/UserContext";
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";
function LoginUser() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, errors: loginErrors , isAuthenticated} = useAuth();
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
    <div className=" bg-zinc-800 max-w-md p-10 rounded-md">
      
      {loginErrors?.map((error, i) => (
          <div className='bg-red-500 p-2 text-white' key={i}>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <input type="email" {...register('email', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" placeholder="correo" />
        {errors.correo && (
          <p className="text-red-500">email es requerido</p>
        )}
        <input type="password" {...register('password', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" placeholder="contraseña" />
        {errors.clave && (
          <p className="text-red-500">contraseña es requerida</p>
        )}




        <button type="submit">iniciar sesion</button>

        {/* <p className="flex gap-x-2 justify-between my-3 ">no tienes una cuenta?  <Link to="/register" className="text-sky-500"> sign up</Link></p> */}
      </form>
    </div>
  )
}

export default LoginUser