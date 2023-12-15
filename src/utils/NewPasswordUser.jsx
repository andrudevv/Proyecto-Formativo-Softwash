import React ,{ useState } from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import img from "../img/Softwash.jpg";
import ModalError from "../components/ModalError";
import ModelRegister from "../components/ModalRegister";
import Spinner from "../components/SpinnerLoading";
export default function NewPasswordUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { newPasswordUser, registerErrors } = useAuth();
    const [message, setMessage] = useState('');
    const [emailOpen, setEmailOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const tokenDes = atob(token);
    const onSubmitNewPassword = handleSubmit(async (email) => {
        setLoading(true);
        const sendEmail = await newPasswordUser(tokenDes, email);
        if (sendEmail) {
            setMessage(sendEmail);
            setLoading(false);
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
            <ModelRegister isOpen={emailOpen} title={message} />
            {loading ? <Spinner /> : <>   <div className="flex  items-center justify-center h-screen ">
                <img src={img} alt="Background" />
                <form
                    onSubmit={onSubmitNewPassword}
                    className="bg-gray-200 bg-opacity-75 shadow-xl text-center shadow-blue-500 rounded-lg absolute w-5/12 p-10"
                >
                    <label className="w-full mb-2 font-semibold text-black px-4 py-2 text-2xl rounded-md">
                        Contraseña nueva
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
                        Restablecer contraseña
                    </button>
                </form>
            </div>
            </>}
        </>
    )
}
