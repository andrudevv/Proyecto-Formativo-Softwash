import React, { useState, useEffect } from 'react'
import ContentTable from '../../components/ContentTable'
import TableEmpty from '../../components/TableEmpty';
import Spinner from '../../components/SpinnerLoading';
import { useAuth } from '../../context/UserContext';
import { toast } from 'react-toastify';
const stylesTable = ' w-full';
const stylesThead = 'bg-gray-100 w-full';
export default function MyAppointmentUser() {
    const { getAppointmentsUser } = useAuth();
    const [dat, setDat] = useState([]);
    const [loading, setLoading] = useState(true);
    const flattenObject = (obj) => {
        const flattened = {};

        const recursiveFlatten = (currentObj, currentPath = '') => {
            for (const [key, value] of Object.entries(currentObj)) {
                const newPath = currentPath ? `${currentPath}.${key}` : key;

                if (typeof value === 'object' && value !== null) {
                    recursiveFlatten(value, newPath);
                } else {
                    flattened[newPath] = value;
                }
            }
        };

        recursiveFlatten(obj);
        return flattened;
    };

    const flattenArrayOfObjects = (array) => {
        return array.map((obj) => flattenObject(obj));
    };
    useEffect(() => {
        const getAppointments = async () => {
            setLoading(true)
            try {
                const resp = await getAppointmentsUser();
                if (resp.length > 0) {
                    const flattenedAppointments = flattenArrayOfObjects(resp);
                    setDat(flattenedAppointments);
                }
                setLoading(false)
            } catch (error) {
                console.log(error);
                toast.error(`Error al traer las citas del usuario`)
            }




        };
        getAppointments();
    }, [])

    const fieldsMapping = {
        "date": "Fecha",
        "time": "Hora",
        "amount": "total",
        "observations": "Observaciones",
        "Vehicle.plate": "Vehiculo",
        "Service.name": "Servicio",
        "state": "estado",
        "Service.laundry.address": "Direccion del lavadero"


    };
    const fields = [
        "date", "amount", "time", "observations", "Vehicle.plate", "Service.name", "state", "Service.laundry.address",
    ]
    // {fields , fieldsMapping, data,buttonActions,stylesTable,stylesThead,stylesTbody, styleActions}
    return (
        <>
            <div className='flex justify-center items-center mb-10 h-[70vh]'>
                <div className=' flex-col  w-full'>

                    <div className='w-full flex justify-center'>
                        <h1 className='font-bold text-xl'>Mis citas</h1>
                    </div>
                    <div>{loading ? <Spinner /> : (
                        <div>
                            {dat.length > 0 ? (
                                <div className='flex justify-center'>
                                    <ContentTable fields={fields} fieldsMapping={fieldsMapping} data={dat} stylesThead={stylesThead} stylesTable={stylesTable} />
                                </div>
                            ) : (
                                <TableEmpty text={'No tienes Citas.'} />
                            )

                            } </div>
                    )
                    }</div>


                </div>

            </div>
        </>
    )
}
