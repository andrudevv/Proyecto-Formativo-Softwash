import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/UserContext';
import DatePicker from 'react-datepicker';
import Spinner from '../../components/SpinnerLoading'
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
export default function CreateAppointment() {
    const { getVehiclesAppointment, getAvailability, createAppointment } = useAuth();
    const { handleSubmit, formState: { errors }, register } = useForm();
    // const [createAppointment, setCreateAppointment] = useState(null);
    const [selectedOption, setSelectedOption] = useState();
    const [myVehicles, setMyVehicles] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateService, setDateService] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const { id, name, price } = useParams();
    const navigate = useNavigate();

    const today = new Date();
    const getMyVehicles = async () => {
        const myVehicles = await getVehiclesAppointment();
        setMyVehicles(myVehicles);

    }

    // if(selectedDate){
    //     handleDateChange()
    // }
    console.log(dateService);
    const handleDateChange = async (date) => {
        const formattedDate = date ? format(date, 'yyyy-MM-dd') : null;
        setSelectedDate(formattedDate);
        if (formattedDate) {
            try {
                const availabilityFound = await getAvailability(id, formattedDate);
                const laundryAvailability = availabilityFound.ability.ability;
                const apertureLaundry = availabilityFound.ability.aperture;
                const closingLaundry = availabilityFound.ability.closing;
                const hours = availabilityFound.hours;
                const generateAvailbility = await generateHour(apertureLaundry, closingLaundry, hours, laundryAvailability);
                setAvailability(generateAvailbility);

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
    const onSubmitAppointment = handleSubmit(async (Appointment) => {
        // console.log(Appointment);
        // Appointment.date = selectedDate;
        // console.log(Appointment);
        const response = await createAppointment(Appointment);
        if (response) {
            toast.success('Cita agendada exitosamente', { theme: "light" })
            const timer = setTimeout(() => {
                navigate("/my-appointments")
            }, 3000);
            return () => clearTimeout(timer);
        }
        console.log(response)
    })
    useEffect(() => {

        getMyVehicles();
        if (myVehicles) {
            setLoading(false);
        }
        setDateService({ id: id, name: name, price: price });

    }, [id, name, price]);
    return (


        <>
            <ToastContainer />
            {loading ? (<Spinner />) : (
                <><div>
                    <section className=' w-full mt-20 border-dashed py-16 border-2'>
                        <form onSubmit={onSubmitAppointment} className="flex grid-cols-1 md:grid-cols-2  gap-4 max-w-md mx-auto">
                            <div className="grid grid-cols-4 gap-4">

                                <div className="col-span-2 relative">

                                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Fecha <span className="text-red-500">*</span></label>
                                    <DatePicker
                                        selected={selectedDate ? new Date(selectedDate + 'T00:00:00') : null}
                                        onChange={date => { handleDateChange(date), { ...register('date', { value: date = format(date, 'yyyy-MM-dd') }) } }}
                                        dateFormat="yyyy/MM/dd" // Puedes personalizar el formato de fecha
                                        // isClearable  // Agrega un botón para borrar la fecha seleccionada
                                        placeholderText="Selecciona una fecha" minDate={today}
                                    />
                                    {/* <input className='hidden' /> */}
                                    {errors.date && (
                                        <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                                    )}</div>

                                <div className="col-span-2 relative">
                                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Hora <span className="text-red-500">*</span></label>

                                    <select value={selectedHour} {...register('time', { required: true })}>
                                        <option value="">Selecciona...</option>
                                        {Object.entries(availability).map(([hour]) => (
                                            <option key={hour} value={hour}>
                                                {hour}
                                            </option>
                                        ))}
                                    </select>
                                    {/* <input {...register('time', { value: selectedHour })} className='hidden' /> */}

                                    {errors.time && (
                                        <p className="absolute right-0 top-0  text-red-500">&#9888;</p>
                                    )}
                                </div>

                                <div className="col-span-2 relative">
                                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Observaciones</label>
                                    <input type="text" {...register('observations')} className="w-10/12  mb-2 text-black px-4 py-2 rounded-md" placeholder="Tener cuidado con ..." />

                                </div>

                                <div className="col-span-2 relative">

                                    <label className="w-full  font-semibold text-black px-4 py-2 rounded-md">Selecciona un Vehiculo: <span className="text-red-500">*</span></label>
                                    <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}{...register('vehicleId', { required: true })}>
                                        <option value="">Selecciona...</option>
                                        {myVehicles.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.plate}
                                            </option>
                                        ))}
                                    </select>
                                    {/* <input type="number"  className="w-10/12  text-black  border border-gray-300 px-4 py-2 rounded-md" placeholder="ABC-123" /> */}
                                    {errors.vehicleId && (
                                        <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                                    )}
                                </div>


                                <div className="col-span-2 relative">
                                    <span>Nombre del servicio:</span>
                                    <input  {...register('serviceId', { value: dateService.id })} className="hidden" />
                                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">{dateService.name}</label>
                                </div>
                                <div className="col-span-2 relative">
                                    <span>Total:</span>
                                    <input  {...register('amount', { value: dateService.price })} className="hidden" />
                                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">{dateService.price}</label>
                                </div>





                                <div className="col-span-4 ">
                                    <button type="submit" className="bg-button-primary  shadow-lg shadow-gray-500 text-black transition delay-150 duration-300 ease-in-out hover:bg-blue-400 font-semibold mt-6 h-10 hover:scale-110   w-full rounded   ">Agendar cita</button>
                                </div>



                            </div>
                        </form>
                    </section>
                </div></>)}

        </>
    )
}
