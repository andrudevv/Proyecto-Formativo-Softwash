import React, { useState, useEffect } from 'react'
import ButtonAction from '../../components/ButtonAction'
import ContentTableAppointment from '../../components/Client/ContentTableAppointment'
import DatePicker from 'react-datepicker';
import NavPagination from '../../components/NavPagination';
import { clientAuth } from '../../context/ClientContext';
import {useNavigate} from 'react-router-dom';
import ReusableModals from '../../components/ReusableModals';
import { ToastContainer, toast } from 'react-toastify';
import ModalError from '../../components/ModalError';
const stylesTable = 'w-full bg-white-100 mb-6 border border-gray-300';
const stylesThead = 'bg-red-100';
const stylesTbody = 'bg-red-200';
const styleActions = ' flex justify-between items-center md:auto-cols-max sm:space-y-2';
// ' md:grid  md:grid-flow-col table-cell md:auto-cols-max place-content-end justify-center items-center  sm:flex sm:space-y'
const fieldsMapping = {
    "date": "Fecha",
    "time": "Hora",
    "observations": "Observaciones",
    "state": "Estado",
    "Vehicle.plate": "Placa",
    "Service.name": "Nombre Servicio",
    "acciones": "Acciones"
};
const fields = ["date", "time", "observations", "state", 'Vehicle.plate', "Service.name", "acciones"];

export default function () {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateFormatted, setSelectedDateFormatted] = useState(null);
    const [dataAbsence, setDataAbsence] = useState(null);
    const [inputPlate, setInputPlate] = useState(null);
    const [permitted, setPermitted] = useState(false);
    const [appointmentDelete, setAppointmentDelete] = useState(null);
    const [ modalDelete, setModalDelete] = useState(false);
    const [page, setPage] = useState(0);
    const { findAbsence, registerErrors,deleteAppointment } = clientAuth();
    const [styleOnMax, setStyleOnMax] = useState('flex');
    const navigate = useNavigate();
    const findAppointmentsAbsence = async () => {
        const query = {
            state: "no asistió",
            offset: page
        }
        if (inputPlate) {
            query.plate = inputPlate;
        }
        if (selectedDateFormatted) {
            query.date = selectedDateFormatted;
        }
        const findData = await findAbsence(query);
        if (findData.length < 5) {
            setStyleOnMax('hidden')
        } else {
            setStyleOnMax('flex')
        }
        setDataAbsence(findData);
        setSelectedDate(null);
        setSelectedDateFormatted(null);
        setInputPlate(null);
        setPermitted(true);
    }
    const formatPlate = (value) => {
        const cleanedValue = value.replace(/-/g, '');
        let formattedValue = cleanedValue.substring(0, 3).toUpperCase();
        if (cleanedValue.length > 3) {
            formattedValue += `-${cleanedValue.substring(3)}`;
        }
        return formattedValue;
    };
    const handlePlateChange = plate => {
        const inputValue = plate.target.value;
        const formattedValue = formatPlate(inputValue);
        // const plateType = getPlateType(formattedValue.toUpperCase())

        setInputPlate(formattedValue.toUpperCase());
    }
    const handleDateChange = date => {
        const formatted = date.toLocaleDateString('es-CO');
        const partes = formatted.split('/');
        const day = partes[0].padStart(2, '0');
        const munth = partes[1].padStart(2, '0')
        const year = partes[2];
        const dateFotmatted = `${year}-${munth}-${day}`;
        setSelectedDate(date)
        setSelectedDateFormatted(dateFotmatted)
    };
    const handleModalAppointmentDelete =(id)=>{
        setModalDelete(true)
        setAppointmentDelete(id);

    }
    const closeModalDelete = () =>{
        setModalDelete(false);
    }
    const handleDeleteAppointment = async (id) =>{
        const wasDeleted = await deleteAppointment(id);
        if(wasDeleted){
            toast.success('Cita eliminada con exito' , {theme: 'light'});
        }
        findAppointmentsAbsence();
        setModalDelete(false);
        setAppointmentDelete(null);
    }
    const handleModalReschedule =(id) =>{
        const link = `/reschedule-appointment/${id}`
        navigate(link)
    }
    const customButtons = [

        {
            text: "reagendar",
            tipo: "button",
            onClick: handleModalReschedule,
            estilos: "bg-green-500 hover:bg-green-700 min-w-[70%] text-white font-bold h-auto py-1  px-2 rounded ",
            
        }, {
            text: "eliminar",
            tipo: "button",
            onClick: handleModalAppointmentDelete,
            estilos: "bg-red-500 hover:bg-red-700 min-w-[70%] text-white font-bold py-1 px-2  rounded ",
        },
    ];
    useEffect(() => {
        if (permitted) {
            findAppointmentsAbsence();
        }
        window.scrollTo(0, 0);

    }, [page, styleOnMax]);
    return (
        <>
            {registerErrors.map((error, i) => (
            <ModalError isOpen={registerErrors} message={error} key={i} 
            />))}
                <ToastContainer/>
                <ReusableModals  isOpen={modalDelete}
                    onClose={closeModalDelete}
                    title="Eliminar Cita"
                    message={'¿Seguro que quiere eliminar la cita?'}
                    buttons={[
                        {
                            text: 'Cancelar',
                            onClick: closeModalDelete,
                            styles: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
                        }, {
                            text: 'Eliminar',
                            onClick: () => handleDeleteAppointment(appointmentDelete),
                            styles: 'bg-red-500 hover:bg-red-600 text-black font-bold',
                        }
                    ]}/>
            <div className='flex justify-center text-2xl font-bold mt-8 mb-6'><h2>Citas perdidas pendientes por reagendar</h2></div>
            <h2 className='w-full justify-center text-center font-bold'>Buscar por:</h2>
            <div className='w-full h-12 bg-blue-200 flex justify-around'>
                <section className='flex items-center'>
                    <label className='text-lg' > Selecciona la Fecha:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy/MM/dd"
                        className=' rounded-lg mx-2 text-center'
                        placeholderText="Selecciona una fecha" maxDate={new Date()}
                    />
                </section>
                <section className='flex items-center'>
                    <label className='text-lg'>Ingrese la Placa:</label>
                    <input type="text" value={inputPlate} pattern={/^[A-Z]{3}-\d{2}[A-Z\d]?$/} maxLength={7} minLength={6} onChange={handlePlateChange} className='rounded-lg mx-2 text-center' placeholder='Placa' />
                </section>
                <button className='bg-yellow-400 flex items-center rounded-lg w-24 justify-center my-1' onClick={findAppointmentsAbsence}>Buscar</button>
            </div>
            {!dataAbsence ? (<div>
                <div className='flex justify-center items-center bg-blue-100 h-52 mt-6 text-2xl'>
                <h2 className='font-semibold'>Buscar por filtro</h2>
            </div>
            </div>) : dataAbsence.length === 0 ? <div className='flex justify-center items-center bg-blue-100 h-52 mt-6 text-2xl'>
                <h2 className='font-semibold'>No hay resultados</h2>
            </div> : <> <div>
                <ContentTableAppointment fields={fields} data={dataAbsence} fieldsMapping={fieldsMapping}
                    buttonActions={(id) => customButtons.map((button, index) => (<ButtonAction key={index} {...button} onClick={() => button.onClick(id)} />))}
                    stylesTable={stylesTable} stylesThead={stylesThead} stylesTbody={stylesTbody}
                    styleActions={styleActions} />
            </div>
            </>
            }
            <div className='w-full flex justify-center mt-8'>
                <NavPagination styles={'flex justify-center '} styleOnMax={styleOnMax} page={page} setPage={setPage} />
            </div>

        </>
    )
}
