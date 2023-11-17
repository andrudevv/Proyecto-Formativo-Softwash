import React, { useState, useEffect } from 'react'
import ContentTable from '../../components/ContentTable'
import TableEmpty from '../../components/TableEmpty';
import Axios from "../../services/axios";
const stylesTable = ' w-full';
const stylesThead = 'bg-gray-100 w-full';
export default function MyAppointmentUser() {
    const [dat, setDat] = useState([]);

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
        const getAppointments = () => {
            Axios.get(`http://localhost:4000/api/appointment/my-appointments/`)
                .then((Response) => {
                    console.log(Response.data.myAppointments);
                    const resp = Response.data.myAppointments;
                    if (resp.length > 0) {
                        const flattenedAppointments = flattenArrayOfObjects(resp);
                        console.log(flattenedAppointments);
                        setDat(flattenedAppointments);
                    }

                })
                .catch((error) => {
                    console.log(error)
                    throw error;
                });
        };
        getAppointments();
    }, [])

    const fieldsMapping = {
        "id": "ID",
        "date": "Fecha",
        "time": "Hora",
        "amount": "total",
        "observations": "Observaciones",
        "Vehicle.plate": "Vehiculo",
        "service.name": "Servicio",
        "state": "estado",
        "service.laundry.address": "Direccion del lavadero"


    };
    const fields = [
        "id", "date", "amount", "time", "observations", "Vehicle.plate", "Service.name", "state", "Service.laundry.address",
    ]
    // {fields , fieldsMapping, data,buttonActions,stylesTable,stylesThead,stylesTbody, styleActions}
    return (
        <>
        <div className=' flex-col mt-10'>
            <div className='w-full flex justify-center'>
                <h1 className='font-bold text-xl'>Mis citas</h1>
            </div>
            {dat.length > 0 ? (
                <div className='flex justify-center'>
                    <ContentTable fields={fields} fieldsMapping={fieldsMapping} data={dat} stylesThead={stylesThead} stylesTable={stylesTable}/>
                </div>
            ) : (
                <TableEmpty text={'No tienes Citas.'} />
            )

            }
</div>
        </>
    )
}
