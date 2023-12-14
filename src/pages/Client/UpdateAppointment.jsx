import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { clientAuth } from '../../context/ClientContext'
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import ModelRegister from '../../components/ModalRegister';
import Spinner from '../../components/SpinnerLoading';
import ModalError from '../../components/ModalError';
export default function UpdateAppointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [dateService, setDateService] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dateAppointment, setDateAppointment] = useState({});
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { findAppointment, getAvailability, updateAppointment, registerErrors } = clientAuth();
  const { id } = useParams()
  const today = new Date();
  const handleDateChange = async (date) => {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : null;
    setSelectedDate(formattedDate);
    if (formattedDate) {
      try {
        const idService = dateService.id;
        const availabilityFound = await getAvailability(idService, formattedDate);
        console.log(availabilityFound);
        const laundryAvailability = availabilityFound.ability.ability;
        const apertureLaundry = availabilityFound.ability.aperture;
        const closingLaundry = availabilityFound.ability.closing;
        const hours = availabilityFound.hours;
        const generateAvailbility = await generateHour(apertureLaundry, closingLaundry, hours, laundryAvailability);
        if(generateAvailbility.length === 0){
          setAvailability([ ])
        }else{

          setAvailability(generateAvailbility);
        }
        console.log(availability);

      } catch (error) {
        console.error('Error al obtener la disponibilidad:', error);
      }


    }

  }
  const generateHour = (startHour, endHour, results, limit) => {
    const horasAsignadas = {};

    results.forEach((fila) => {
      const hora = fila.time; // Hora asignada
      const cantidad = fila.cantidad; // Cantidad de repeticiones

      // Agregar la hora y la cantidad al objeto de horas asignadas
      horasAsignadas[hora] = cantidad;
    });
    const horaInicio = new Date(`2000-01-01 ${startHour}`);
    const horaFin = new Date(`2000-01-01 ${endHour}`);
    const timeSlots = {};

    while (horaInicio <= horaFin) {
      const hora12 = horaInicio.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).replace(/^(\d{1}):/, '0$1:');

      // Verificar si la hora ya está asignada y no exceda el limite
      if (horasAsignadas[hora12] !== undefined) {
        timeSlots[hora12] = horasAsignadas[hora12];
      } else {
        timeSlots[hora12] = 0;
      }

      if (timeSlots[hora12] === limit) {
        delete timeSlots[hora12];
      }
      horaInicio.setTime(horaInicio.getTime() + 30 * 60 * 1000); // Avanzar 30 minutos
    }
    console.log(timeSlots);
    return timeSlots;
  }
  const onSubmitAppointmentReschedule = handleSubmit(async (reschedule) => {
    console.log('se ejecuta');
    reschedule = {
      ...reschedule,
      time:selectedHour,
      amount: dateAppointment.amount,
      observations: dateAppointment.observations,
      serviceId: dateAppointment.serviceId,
      vehicleId: dateAppointment.vehicleId,
      state: 'pendiente'
    }
    const idAppointment = dateAppointment.id;
    const response = await updateAppointment(idAppointment, reschedule);
    console.log(response);
    if (response) {

      setIsModalOpen(true);
      const timer = setTimeout(() => {
        navigate("/missed-appointments")
      }, 5000);
      return () => clearTimeout(timer);
    }
  })
  const hourSelected= (id)=>{
    setSelectedHour(id);
  }
  // const onSubmitReschedule = ()=>{
  //   return onSubmitAppointmentReschedule()
  // }
  const getAppointment = async () => {
    const foundAppointment = await findAppointment(id);
    setDateService(foundAppointment.Service);
    setDateAppointment(foundAppointment);
    setLoading(false);
  }
  useEffect(() => {
    setLoading(true);
    try {
      getAppointment()
    } catch (error) {
      console.log('Error al traer los datos de la cita', error)
    }
    window.scrollTo(0, 0);

  }, [id])
  return (
    <> 
     {registerErrors.map((error, i) => (
            <ModalError isOpen={registerErrors} message={error} key={i} 
            />))}
      <ToastContainer />
      <ModelRegister isOpen={isModalOpen} title={'Se Reagendo la Cita!'} />

      {loading ? <Spinner /> : <><div>
        <section className=' w-full  py-12 '>
          <form  onSubmit={onSubmitAppointmentReschedule} className="w-full  mx-auto border-2 px-2 py-4 shadow-lg shadow-blue-500 rounded-md bg-gray-100">
            <div className='flex'>

              <div className='w-1/2 mx-20 py-4 px-8 '>
                <div className="relative  w-full mb-5 group">
                  <label className=" mr-4 text-black font-semibold ">Fecha <span className="text-red-500">*</span></label>
                  <DatePicker
                    className=' w-full  text-gray-900  mt-2   border-2 border-black rounded-lg text-center '
                    selected={selectedDate ? new Date(selectedDate + 'T00:00:00') : null}
                    onChange={date => { handleDateChange(date), { ...register('date', { value: date = format(date, 'yyyy-MM-dd') }) } }}
                    dateFormat="yyyy/MM/dd" // Puedes personalizar el formato de fecha
                    placeholderText="Selecciona una fecha" minDate={today}
                  />
                  {errors.date && (
                    <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                  )}
                </div>

                <div className="relative w-full mb-5 group">
                  <label className=" text-gray-600 font-semibold">Observaciones</label>
                  <label className="block  text-gray-900  border-b-2 border-gray-400 break-all " placeholder="Tener cuidado con ..." >{dateAppointment.observations}</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <span className="text-gray-600 font-semibold">Nombre del servicio</span>
                  <label className="block  text-gray-900  border-b-2 border-gray-400  break-all  ">{dateService.name}</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <span className="text-gray-600 font-semibold">Total</span>
                  <label className="block  text-gray-900  border-b-2 border-gray-400   ">{dateService.price}</label>
                </div>
              </div>
              <div className='w-1/2 flex max-h-full p-4 '>
                <div className="relative z-0 w-full h-full text-center mb-5 group">
                  <label className="  text-black font-semibold mt-2 text-center">Hora <span className="text-red-500">*</span></label>
                  <section className='grid grid-cols-2 border-2 border-gray-200 mt-4 p-4 bg-white shadow-md shadow-blue-300 rounded-lg gap-2 h-48 overflow-auto' >
                    {/* <input  {...register('time', { required: true, value: selectedHour})} className='hidden' /> */}
                    {!availability ? (<div>
                      
                    </div>) : availability.length === 0 ? <div className='flex col-span-2 w-full justify-center  items-center text-center'><h1 className='bg-blue-200 p-4  rounded-lg font-semibold'>No hay disponibilidad</h1></div> : <>{Object.entries(availability).map(([hour]) => (
                      <button key={hour} type='button' value={hour} onClick={() => hourSelected(hour)} className=' border-blue-300 border-2 mt-2 rounded-lg focus:outline-none  focus:bg-blue-400 focus:text-white focus:font-semibold '>
                        {hour}
                      </button>
                    ))} </>}
                    
                    

                  </section> 
                  {errors.time && (
                    <p className="absolute right-0 top-0  text-red-500">&#9888;</p>
                  )}
                  <div className='my-4  text-center'>
                    <span >Hora Seleccionada: <span className='font-bold ' >{selectedHour}</span></span>
                  </div>
                 
                </div>

              </div>
            </div>
            <div className="flex w-full justify-center">
              <button type='submit' className="bg-button-primary  shadow-lg shadow-gray-500 text-black transition delay-150 duration-300 ease-in-out hover:bg-blue-400 font-semibold my-4 h-12 hover:scale-110   w-1/5 rounded   ">Reagendar cita</button>
            </div>
          </form>
        </section>
      </div></>}

    </>
  )
}
