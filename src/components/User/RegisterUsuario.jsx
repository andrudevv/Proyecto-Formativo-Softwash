import { useForm } from "react-hook-form"
import { useAuth } from "../../context/UserContext";

function RegisterUsuario() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, registerErrors,successMessage,registrationSuccess } = useAuth()

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
    
  })
  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full sm:w-96  bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-center">
          Registrarse como usuario
        </h2>
      {registerErrors?.map((error, i) => (
        <div className='bg-red-500 p-2 text-white' key={i}>
          {error.response.data.message }
        </div>
      ))}

      {successMessage && (
        <div className='bg-green-500 p-2 text-white'>
          {successMessage}<a href="/signinuser" className="text-black"> iniciar sesion</a>
        </div>
      )}


      {/* Condición para mostrar el formulario o el mensaje de éxito */}
      {!registrationSuccess ? (
      <form onSubmit={onSubmit}>
        <input type="number"  {...register('documentUser', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="Numero de documento" />{errors.documentUser && (
          <p className="text-red-500">el documento es requerido</p>
        )}
        <input type="text" {...register('name', { required: true })} className="w-full mb-2 text-black  px-4 py-2 rounded-md" placeholder="nombre" />
        {errors.name && (
          <p className="text-red-500">nombre es requerido</p>
        )}
        <input type="text" {...register('lastName', { required: true })} className="w-full  mb-2 text-black px-4 py-2 rounded-md" placeholder="apellidos" />
        <input type="number" {...register('phone', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="telefono" />
        <input type="email" {...register('email', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="correo" />
        {errors.email && (
          <p className="text-red-500">email es requerido</p>
        )}
        <input type="password" {...register('password', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="contraseña" />
        {errors.password && (
          <p className="text-red-500">contraseña es requerida</p>
        )}
        
        <input type="text" {...register('city', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="ciudad" />
        {errors.City && (
          <p className="text-red-500">Ciudad es requerida</p>
        )}
        <input type="text" {...register('municipality', { required: true })} className="w-full mb-2 text-black px-4 py-2 rounded-md" placeholder="municipio" />
        {errors.Municipality && (
          <p className="text-red-500">Municipio es requerido</p>
        )}



        <button type="submit" className="bg-custom-botones text-white font-semibold mt-4 py-2 px-4 rounded hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-700 w-full">registrarse</button>
        <button className="bg-custom-botones text-white font-semibold mt-4 py-2 px-4 rounded hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-700 w-full"><a href="/registerclient">registrarse como lavadero?</a></button>
      </form>
    ) : (
      <p>Registro exitoso. ¡Gracias por unirte!</p>
    )}
    </div>
    </div>
  );
}

export default RegisterUsuario