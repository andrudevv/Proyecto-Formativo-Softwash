import React, { useState, useEffect } from 'react'
import ContentTable from '../../components/ContentTable'
import ButtonAction from '../../components/ButtonAction'
import DatePicker from 'react-datepicker';
import NavPagination from '../../components/NavPagination';
import { clientAuth } from '../../context/ClientContext';
import { Navigate} from 'react-router-dom';
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
    const [page, setPage] = useState(0);

    const { findAbsence, registerErrors } = clientAuth();
    const [styleOnMax, setStyleOnMax] = useState('flex');

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

    const handleModalReschedule =(id) =>{
        
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
            onClick: 'handleModalMissed',
            estilos: "bg-red-500 hover:bg-red-700 min-w-[70%] text-white font-bold py-1 px-2  rounded ",
        },
        // Agrega más botones según sea necesario
    ];
    useEffect(() => {

        if (permitted) {
            findAppointmentsAbsence();
        }
    }, [page, styleOnMax]);
    return (
        <>
            {registerErrors.map((error, i) => (
                <div className="flex justify-center items-center">
                    <div id='modal-component-container' className='fixed  h-52  z-10  top-0'>
                        <div className='modal-flex-container flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                            <div className='modal-bg-container fixed inset-0 bg-gray-700 bg-opacity-75'></div>
                            <div className='modal-space-container hidden sm:inline-block sm:align-middle sm:h-screen'></div>

                            <div id='modal-container' className='modal-container inline-block align-bottom  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full'>
                                <div className=' bg-red-500 p-2  rounded-lg text-white' key={i}>
                                    {error}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>))}
            <div className='flex justify-center text-2xl font-bold mt-8 mb-6'><h2>Citas perdidas pendientes por reagendar</h2></div>
            <h2 className='w-full justify-center text-center font-bold'>Buscar por:</h2>
            <div className='w-full h-12 bg-blue-200 flex justify-around'>

                <section className='flex items-center'>
                    <label className='text-lg' > Selecciona la Fecha:</label>
                    {/* <input type="text" className=' rounded-lg mx-2 text-center' placeholder='Fecha'/> */}
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
                <ContentTable fields={fields} data={dataAbsence} fieldsMapping={fieldsMapping}
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
