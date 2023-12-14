import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import img from "../../img/Softwash.jpg";
import ModalError from "../../components/ModalError";
import { clientAuth } from "../../context/ClientContext";
function LoginClient() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn, registerErrors, isAuthenticatedClient } = clientAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signIn(data);
    // console.log(Response);
  })

  useEffect(() => {
    if (isAuthenticatedClient) {
      navigate("/home-client");
    }
    window.scrollTo(0, 0);

  }, [isAuthenticatedClient]);
  return (
    <>
       {registerErrors.map((error, i) => (
            <ModalError isOpen={registerErrors} message={error} key={i} 
            />))}
      <div className="flex items-center justify-center h-screen ">
      <img src={img} alt="Background" />


        <form onSubmit={onSubmit} className="bg-gray-200 bg-opacity-75 shadow-xl shadow-blue-500 rounded-lg absolute w-5/12 p-10">
          <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar sesión como lavadero</h2>

          <label className="w-full mb-2 font-semibold text-black px-4 py-3 text-lg  rounded-md">
          Nit
        </label>
          <input type="number" {...register('rutLaundry', { required: true })} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nit" />
          {errors.rutLaundry && (
            <p className="text-red-500">Nit es requerido</p>
          )}
          <label className="w-full mb-2 font-semibold text-black px-4 py-3 text-lg  rounded-md">
          Correo
        </label>
          <input type="email" {...register('email', { required: true })} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="correo" />
          {errors.email && (
            <p className="text-red-500">email es requerido</p>
          )}
          <label className="w-full mb-2 font-semibold text-black px-4 py-3 text-lg  rounded-md">
          Contraseña
        </label>
          <input type="password" {...register('password', { required: true })} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="contraseña" />
          {errors.password && (
            <p className="text-red-500">contraseña es requerida</p>
          )}




          <button type="submit" className="bg-button-primary  text-black hover:scale-110 font-semibold mt-4 py-2 px-4 rounded transition delay-150 duration-300 ease-in-out hover:bg-blue-400  w-full">iniciar sesion</button>
          <button className="bg-button-primary text-black font-semibold hover:scale-110 mt-4 py-2 px-4 rounded transition delay-150 duration-300 ease-in-out hover:bg-blue-400  w-full"><Link to="/sign-in-user">iniciar sesion como usuario</Link></button>
          <a className=" text-cyan-800 font-semibold text-lg mt-4 py-2 px-4 rounded hover:scale110 w-full"><Link to="/reset-password-client">Olvido su contraseña?</Link></a>


          {/* <p className="flex gap-x-2 justify-between my-3 ">no tienes una cuenta?  <Link to="/register" className="text-sky-500"> sign up</Link></p> */}
        </form>
      </div>
    </>
  )
}

export default LoginClient