import React, { useEffect, useState } from 'react'
import Spinner from '../../components/SpinnerLoading'
import { clientAuth } from '../../context/ClientContext';
import ModalError from '../../components/ModalError';
import ButtonAction from '../../components/ButtonAction';
import DataToProcess from '../../components/Client/DataToProcess';
import ModalProcessAppointment from '../../components/Client/ModalProcessAppointment';
import { ToastContainer, toast } from 'react-toastify';
export default function HomeServicesClient() {

  const [loading, setLoading] = useState(false);
  const [ dataProcess, setDataProcess] = useState([]);
  const [ process, setProcess] = useState(false);
  const [appointmentFinalized,setAppointmentFinalized] = useState(null);
  const { registerErrors, getProcessAppointment, finalizedProcess} = clientAuth();

  const getAppointmentProcess = async () =>{
    const getProcess = await getProcessAppointment();
    setDataProcess(getProcess);
  }
  const handleModalProccess=( id) =>{
    setProcess(true);
    setAppointmentFinalized(id);
  }
  const closeModalProcess = ()=>{
    setProcess(false)
    setAppointmentFinalized(null);
  }
  const modalProcessFinalized = async (id)=>{
    const sendFinalized = await finalizedProcess(id);
    if(sendFinalized){
      closeModalProcess()
      toast.success('Se finalizo correctamente',{theme: 'light'})
      getAppointmentProcess();
    }
  }
  const customButtons = [

    {
        text: "Finalizar",
        tipo: "button",
        onClick: handleModalProccess,
        estilos: "bg-green-500 hover:bg-green-700 min-w-[70%] text-white font-bold h-auto py-1  px-2 rounded ",
    }
];
  useEffect(() => {
    setLoading(true);
    const getAppointments = async ()=>{
      try {
        await getAppointmentProcess();
        setLoading(false);
      } catch (error) {
        console.error('error al traer las citas en proceso', error);
      }
    }

    getAppointments();
    window.scrollTo(0, 0);

  }, [])

  return (
    <>
     {registerErrors.map((error, i) => (
            <ModalError isOpen={registerErrors} message={error} key={i} 
            />))}
            <ToastContainer/>
            <ModalProcessAppointment  isOpen={process}
                onClose={closeModalProcess}
                title="Confirmar finalizacion de cita"
                message={'¿Seguro que quieres finalizar la cita?'}
                buttons={[

                    {
                        text: 'Cancelar',
                        onClick: closeModalProcess,
                        styles: 'bg-red-500 hover:bg-red-700 text-gray-800',
                    },
                    {
                        text: 'Finalizar',
                        onClick: () => modalProcessFinalized(appointmentFinalized),
                        styles: 'bg-green-500 hover:bg-green-600 text-black font-bold',
                    }
                ]}/>
      <div className='flex w-full h-12 justify-center mt-10 text-center '>
        <h2 className='font-bold text-2xl'>En proceso</h2>
      </div>
      {loading ? <Spinner /> : dataProcess.length === 0 ? 
      
        <>
          <div className='flex justify-center items-center mt-20 h-24 bg-blue-100 text-xl'>
            <h1>No hay lavados en proceso</h1>
          </div>

        </>
        : 
        <>
        <div className='flex w-full justify-center'>

          <section className='max-w-full md:w-2/3' > 
            <h2 className='text-center font-semibold text-lg'>Vehiculos en Proceso  de lavado</h2>
          <DataToProcess dataProcess={dataProcess} buttonActions={(id) => customButtons.map((button, index) => (<ButtonAction key={index} {...button} onClick={() => button.onClick(id)} />))}/>
          </section>

         
         
        </div>
        
        </>
        }




    </>
  )
}
