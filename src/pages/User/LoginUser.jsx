import { useForm } from "react-hook-form"
import { useAuth } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ModalError from "../../components/ModalError";
import img from "../../img/Softwash.jpg";
function LoginUser() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, registerErrors, isAuthenticatedUser } = useAuth();
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
    <>
    {registerErrors.map((error, i) => (
            <ModalError isOpen={registerErrors} message={error} key={i} 
            />))}
    <div className="flex  items-center justify-center h-screen ">
      <img src={img} alt="Background" />

      <form
        onSubmit={onSubmit}
        className="bg-gray-200 bg-opacity-75 shadow-xl shadow-blue-500 rounded-lg absolute w-5/12 p-10"
      >
        
        <h2 className="text-2xl font-semibold mb-6 text-black text-center">
          Iniciar sesión como usuario
        </h2>
        <label className="w-full mb-2 font-semibold text-black px-4 py-3 text-lg  rounded-md">
          Correo
        </label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="correo"
        />
        {errors.email && (
          <p className="text-red-500 text-lg ">Email es requerido</p>
        )}
        <label className="w-full mb-2 font-semibold text-black px-4 py-2 text-lg rounded-md">
          Contraseña
        </label>
        <input
          type="password"
          {...register("password", { required: true })}
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="contraseña"
        />
        {errors.password && (
          <p className="text-red-500 text-lg">Contraseña es requerida</p>
        )}

        <button
          type="submit"
          className="bg-button-primary shadow-lg shadow-gray-500 text-black transition delay-150 duration-300 ease-in-out hover:bg-blue-400 font-semibold mt-6 h-10 hover:scale-110 w-full rounded"
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          className="bg-button-primary shadow-lg shadow-gray-500 text-black transition delay-150 duration-300 ease-in-out hover:bg-blue-400 font-semibold mt-6 h-10 hover:scale-110 w-full rounded"
        >
          <Link to="/sign-in-client">Iniciar Sesión Como Lavadero</Link>
        </button>
        <a className=" text-cyan-800 font-semibold text-lg mt-4 py-2 px-4 rounded hover:scale110 w-full">
          <Link to="/reset-password-user">Olvido su contraseña?</Link>
        </a>

        
      </form>
    </div>
    </>
  )
}

export default LoginUser