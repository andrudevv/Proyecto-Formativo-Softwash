import React, { useEffect, useState } from 'react'
import Spinner from '../../components/SpinnerLoading'
export default function HomeServicesClient() {

  const [loading, setLoading] = useState(false);
  const [ dataProcess, setDataProcess] = useState([]);

  const getAppointmentProcess = async () =>{
    const getProcess = await getProcessAppointment();
    setDataProcess(getProcess);
    console.log(getProcess);
  }
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
  }, [])

  return (
    <>
      <div className='flex w-full h-12 justify-center mt-4 text-center'>
        <h2>Vehiculos en el lavadero</h2>
      </div>
      {loading ? <Spinner /> :
        <>
          <div>
            <table class="w-full table-auto"> </table>
          </div>

        </>
        }




    </>
  )
}
