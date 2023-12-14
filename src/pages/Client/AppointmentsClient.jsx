import React, { useEffect, useState } from 'react'
import ButtonAction from '../../components/ButtonAction'
import { clientAuth } from '../../context/ClientContext';
import Spinner from '../../components/SpinnerLoading';
import ModalProcessAppointment from '../../components/Client/ModalProcessAppointment';
import { ToastContainer, toast } from 'react-toastify';
import ReusableModals from '../../components/ReusableModals'
import NavPagination from '../../components/NavPagination';
import ContentTableAppointment from '../../components/Client/ContentTableAppointment';
import moment from 'moment';
import ModalError from '../../components/ModalError';
const stylesTable = 'w-full bg-white-100 mb-6 border border-gray-300';
const stylesThead = 'bg-gray-400';
const stylesTbody = 'bg-blue-200';
const styleActions = ' flex justify-between items-center md:auto-cols-max sm:space-y-2';
const fieldsMapping = {
    "date": "Fecha",
    "time": "Hora",
    "observations": "Observaciones",
    "state": "Estado",
    "Vehicle.plate": "Placa",
    "Service.name": "Nombre del Servicio",
    "acciones": "Acciones"
};
const fields = ["date", "time", "observations", "state", 'Vehicle.plate', "Service.name", "acciones"];


export default function AppointmentsClient() {
    const [appointments, setAppointments] = useState([]);
    const [process, setProcess] = useState(false);
    const [absence, setAbsence] = useState(false);
    const [idProcess, setIdProcess] = useState(null);
    const [styleOnMax, setStyleOnMax] = useState('flex');
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const { getAppointments, sendProcess, registerErrors, sendAbsence } = clientAuth();



    const handleUpdateProcess = async (id) => {
        const state = { state: "en proceso" };
        const sendToProcess = await sendProcess(id, state);
        closeModalProcess();
        if (sendToProcess) {
            toast.success('Se inició proceso correctamente', { theme: "light" });
            getSchedule();
        }
    }
    const handleModalProccess = (id) => {
        setProcess(true);
        setIdProcess(id)
        // console.log('proceso', id);
    }
    const closeModalProcess = () => {
        setProcess(false);
        setIdProcess(null)
        // console.log('proceso', id);
    }

    const handleUpdateAbsence = async (id) => {
        const state = { state: "no asistió" }
        const sendToAbsence = await sendAbsence(id, state);
        closeModalAbsence();
        if (sendToAbsence) {
            toast.success('Se genero la inasistencia correctamente', { theme: "light" });
            getSchedule();
        }
    }
    const handleModalAbsence = (id) => {
        setAbsence(true);
        setIdProcess(id);
    }
    const closeModalAbsence = () => {
        setAbsence(false);
        setIdProcess(null);
    }

    const customButtons = [

        {
            text: "Procesar",
            tipo: "button",
            onClick: handleModalProccess,
            estilos: "bg-green-500 hover:bg-green-700 min-w-[70%] text-white font-bold h-auto py-1  px-2 rounded ",
        }, {
            text: "No asistió",
            tipo: "button",
            onClick: handleModalAbsence,
            estilos: "bg-red-500 hover:bg-red-700 min-w-[70%] text-white font-bold py-1 px-2  rounded ",
        },
        // Agrega más botones según sea necesario
    ];
    const getSchedule = async () => {
        const date  = moment().format('YYYY-MM-DD');
        const state = {
            state: "pendiente",
            offset: page
        }
        const resp = await getAppointments(date, state);
        if(resp.length < 5){
            setStyleOnMax('hidden')
        }else{
            setStyleOnMax('flex')
        }
        setAppointments(resp);
        return true
    };
    useEffect(() => {
        setLoading(true);
        const getTodayAppointments = async () => {
            try {
                const rt = await getSchedule();
                if (rt) {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error al obtener las citas agendadas:', error);
            }
        };

        getTodayAppointments();
        window.scrollTo(0, 0);

    }, [page, styleOnMax]);
    return (

        <>
           {registerErrors.map((error, i) => (
            <ModalError isOpen={registerErrors} message={error} key={i} 
            />))}
            <ToastContainer />
            <div className='flex justify-center mt-8 text-2xl font-bold'>
                <h2>Control De Citas Diario</h2>
            </div>

            {loading ? <Spinner /> : appointments.length > 0 ? (<div>
                <ContentTableAppointment fields={fields} data={appointments} fieldsMapping={fieldsMapping}
                    buttonActions={(id) => customButtons.map((button, index) => (<ButtonAction key={index} {...button} onClick={() => button.onClick(id)} />))}
                    stylesTable={stylesTable} stylesThead={stylesThead} stylesTbody={stylesTbody}
                    styleActions={styleActions} />
            </div>) : (<><div className='flex justify-center items-center bg-blue-100 h-52 mt-6 text-2xl'>
                <h2 className='font-semibold'>No tienes mas citas para este día</h2>
            </div></>)}

            <div className='w-full flex justify-center mt-8'>
                <NavPagination styles={'flex justify-center '} styleOnMax={styleOnMax} page={page} setPage={setPage} />
            </div>
            <ModalProcessAppointment
                isOpen={process}
                onClose={closeModalProcess}
                title="Confirmacion de asistencia"
                message={'¿Seguro que quieres enviar a proceso la cita programada?'}
                buttons={[

                    {
                        text: 'Cancelar',
                        onClick: closeModalProcess,
                        styles: 'bg-red-500 hover:bg-red-700 text-gray-800',
                    },
                    {
                        text: 'Enviar a proceso',
                        onClick: () => handleUpdateProcess(idProcess),
                        styles: 'bg-green-500 hover:bg-green-600 text-black font-bold',
                    }
                ]}
            />

            <ReusableModals
                isOpen={absence}
                onClose={closeModalAbsence}
                title="Confirmar inasistencia"
                message={'¿Seguro que quieres generar la inasistencia?'}
                buttons={[

                    {
                        text: 'Cancelar',
                        onClick: closeModalAbsence,
                        styles: 'bg-red-500 hover:bg-red-700 text-gray-800',
                    }, {
                        text: 'Confirmar inasistencia',
                        onClick: () => handleUpdateAbsence(idProcess),
                        styles: 'bg-blue-500 hover:bg-blue-600 text-black font-bold',
                    }
                ]}
            />
        </>
    )
}
