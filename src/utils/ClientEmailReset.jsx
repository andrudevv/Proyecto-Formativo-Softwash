import { useForm } from "react-hook-form"
import { clientAuth } from "../context/ClientContext";
import img from "../img/Softwash.jpg";
import ModalError from "../components/ModalError";
import Spinner from "../components/SpinnerLoading";
import ModelRegister from "../components/ModalRegister";
import { useState } from "react";
function userEmailReset() {
    const { register, handleSubmit, formState: { errors } } = useForm();
  const { resetPassword ,registerErrors} = clientAuth();
  const [message, setMessage] = useState('');
    const [ emailOpen, setEmailOpen] = useState(false);
    const [ loading, setLoading] = useState(false);
    const onSubmit = handleSubmit( async (email) => {
        setLoading(true);
        const sendEmail = await resetPassword(email);
        if(sendEmail){
            setLoading(false);
            setMessage(sendEmail);
        setEmailOpen(true);
        const timer = setTimeout(() => {
            setEmailOpen(false);
          }, 3000);
          return () => clearTimeout(timer);
      }
    })
    return (
        <>
        {registerErrors.map((error, i) => (
              <ModalError isOpen={registerErrors} message={error} key={i} 
              />))}
              <ModelRegister isOpen={emailOpen} title={message}/>
  {loading ? <Spinner/> : <> <div className="flex  items-center justify-center h-screen ">
            <img src={img} alt="Background" />
            <form
                onSubmit={onSubmit}
                className="bg-gray-200 bg-opacity-75 shadow-xl text-center shadow-blue-500 rounded-lg absolute w-5/12 p-10"
            >
                <label className="w-full   font-semibold text-black px-4 py-2 text-2xl rounded-md">
                   Correo de recuperación del lavadero
                </label>
                <input
                    type="email"
                    {...register("email", { required: true })}
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Correo"
                />
                {errors.email && (
                    <p className="text-red-500 text-lg">Correo es requerido</p>
                )}
                <button
                    type="submit"
                    className="bg-button-primary shadow-lg shadow-gray-500 text-black transition delay-150 duration-300 ease-in-out hover:bg-blue-400 font-semibold mt-6 h-10 hover:scale-110 w-full rounded"
                >
                    Enviar Correo
                </button>
               
            </form>
        </div></>}
  
        
    </>
    )
}

export default userEmailReset;