import { useForm } from "react-hook-form"
import { useAuth } from "../../context/UserContext";
function RegisterUsuario() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, user, errors: registerErrors } = useAuth()
  console.log(user);
  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  })
  return (
    <div className=" bg-zinc-800 max-w-md p-10 rounded-md">
      {
        registerErrors?.map((error, i) => (
          <div className='bg-red-500 p-2 text-white' key={i}>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <input type="number"  {...register('documentUser', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" placeholder="Numero de documento" />{errors.documentUser && (
          <p className="text-red-500">el documento es requerido</p>
        )}
        <input type="text" {...register('name', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" placeholder="nombre" />
        {errors.name && (
          <p className="text-red-500">nombre es requerido</p>
        )}
        <input type="text" {...register('lastName', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" placeholder="apellidos" />
        <input type="number" {...register('phone', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" placeholder="telefono" />
        <input type="email" {...register('email', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" placeholder="correo" />
        {errors.email && (
          <p className="text-red-500">email es requerido</p>
        )}
        <input type="password" {...register('password', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" placeholder="contraseña" />
        {errors.password && (
          <p className="text-red-500">contraseña es requerida</p>
        )}
        
        <input type="text" {...register('city', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" placeholder="ciudad" />
        {errors.City && (
          <p className="text-red-500">Ciudad es requerida</p>
        )}
        <input type="text" {...register('municipality', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" placeholder="municipio" />
        {errors.Municipality && (
          <p className="text-red-500">Municipio es requerido</p>
        )}



        <button type="submit">registrarse</button>
      </form>
    </div>
  )
}

export default RegisterUsuario