import { useForm } from "react-hook-form"
import { clientAuth } from "../context/ClientContext";

function userEmailReset() {
    const { register, handleSubmit, formState: { errors } } = useForm();
  const { resetPasswordClient} = clientAuth();

    const onSubmit = handleSubmit((data) => {
      resetPasswordClient(data);
      })
    return (
        <div>
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={onSubmit}>
        <input type="email" {...register('Email', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" placeholder="correo" />
        {errors.correo && (
          <p className="text-red-500">email es requerido</p>
        )}
        <button type="submit">Recuperar contraseña</button>
      </form>
        </div>
    )
}

export default userEmailReset;