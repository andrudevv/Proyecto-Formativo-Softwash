import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/UserContext';
import DatePicker from 'react-datepicker';
import Spinner from '../../components/SpinnerLoading'
import 'react-datepicker/dist/react-datepicker.css';
export default function CreateAppointment() {
    const { getVehiclesAppointment, getAvailability, createAppointment } = useAuth();
    const { handleSubmit, formState: { errors }, register } = useForm();
    // const [createAppointment, setCreateAppointment] = useState(null);
    const [selectedOption, setSelectedOption] = useState();
    const [myVehicles, setMyVehicles] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateService, setDateService] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const { id, name } = useParams();
    const today = new Date();
    const getMyVehicles = async () => {
        const myVehicles = await getVehiclesAppointment();
        setMyVehicles(myVehicles);

    }

    // if(selectedDate){
    //     handleDateChange()
    // }
    const handleDateChange = async (date) => {
        const formattedDate = date ? format(date, 'yyyy-MM-dd') : null;
        setSelectedDate(formattedDate);
        if (formattedDate) {

            const availabilityFound = await getAvailability(id, formattedDate);
            if(availability)
            setAvailability(availabilityFound.hours);
            console.log(availabilityFound);

/// falta crear el objeto de las horas con el mapeo de apertura y cierre y descontando las horas y acompletadas y organizar los datos que enviara el formulario  el registro backeend
        }

    }


    const onSubmitAppointment = handleSubmit(async (Appointment) => {
        const response = await createAppointment(Appointment);
        console.log(response)
    })
    useEffect(() => {

        getMyVehicles();
        if (myVehicles) {
            setLoading(false);
        }
        setDateService({ id: id, name: name });

    }, [id, name]);
    return (


        <>
            {loading ? (<Spinner />) : (
                <><div>
                    <section className=' w-full mt-20 border-dashed py-16 border-2'>
                        <form onSubmit={onSubmitAppointment} className="flex grid-cols-1 md:grid-cols-2  gap-4 max-w-md mx-auto">
                            <div className="grid grid-cols-4 gap-4">

                                <div className="col-span-2 relative">
                                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Fecha <span className="text-red-500">*</span></label>
                                    <DatePicker
                                        selected={selectedDate ? new Date(selectedDate) : null}
                                        onChange={date => handleDateChange(date)}
                                        dateFormat="yyyy/MM/dd" // Puedes personalizar el formato de fecha
                                        // isClearable  // Agrega un botón para borrar la fecha seleccionada
                                        placeholderText="Selecciona una fecha" minDate={today}  
                                        // {...register('date', { required: true })}
                                    />
                                    {errors.date && (
                                        <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                                    )}</div>

                                <div className="col-span-2 relative">
                                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Hora <span className="text-red-500">*</span></label>
                                    <select value={selectedHour} {...register('time', { required: true })}>
                                        <option value="">Selecciona...</option>
                                        {Object.keys(availability).map((hourKey) => (
                                            <option key={hourKey} value={hourKey}>
                                                {availability[hourKey]}
                                            </option>
                                        ))}

                                    </select>
                                    {errors.time && (
                                        <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                                    )}
                                </div>

                                <div className="col-span-2 relative">
                                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">Observaciones <span className="text-red-500">*</span></label>
                                    <input type="text" {...register('observations', { required: true })} className="w-10/12  mb-2 text-black px-4 py-2 rounded-md" placeholder="Tener cuidado con ..." />
                                    {errors.observations && (
                                        <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                                    )}
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
                                    <label className="w-full mb-2  font-semibold text-black px-4 py-2 rounded-md">{dateService.name}</label>

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
