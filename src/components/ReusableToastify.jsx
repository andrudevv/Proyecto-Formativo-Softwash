import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
export default function ReusableToastify({button, nameFunction, messageToast}) {
    const {nameFunction} = () =>{
        toast({messageToast})
    }
    {functionToast}
  return (
    <>
    {/* <button 
    onClick={gato}
    className=' bg-red-400 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded'>
    comprar
    </button> */}
    {button}
    <ToastContainer/>
</>
  )
}
