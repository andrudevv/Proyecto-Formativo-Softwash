import React, { useState,useEffect } from 'react'
import Spinner from '../SpinnerLoading';
import { Link } from 'react-router-dom';
import ModalError from '../ModalError';
export default function ListServicesLaundry({ services,registerErrors }) {

    const [loading, setLoading] = useState(true);
  

    useEffect(() => {
        if(services){
            setLoading(false);
        }
        window.scrollTo(0, 0);
    }, [services]);
    return (
        <>
          {registerErrors.map((error, i) => (
            <ModalError isOpen={registerErrors} message={error} key={i} 
            />))}
            {!services || loading ?
                (<Spinner />) : services.length > 0 ?(
                    <>
                    <h2 className='w-full flex justify-center items-center text-4xl mt-32'>Servicios del lavadero</h2>
                    <div className="grid grid-cols-1 gap-5 space-y-5  ">
                        {services.map((service) => (
                            <ListServices key={service.id} service={service} />
                        ))}

                    </div>
                    </>
                ) : <>
                <div className="grid grid-cols-1 gap-5 space-y-5  ">
                <h2 className='w-full flex justify-center items-center text-4xl mt-32'>No tiene servicios</h2>
                </div>
                </>}
        </>
    )
}

const ListServices = ({ service }) => {
    const {id, name, duration, description, price, typeVehicles } = service;

    return (
        <> 
        <div className="w-2/3 mt-16 mx-auto my-8 bg-blue-500 shadow-black bg-white-100 bg-opacity-20 p-4 rounded-xl overflow-hidden shadow-md">
            <div className="md:flex border-2 bg-blue-200 ">
                
                <div className="w-full  grid grid-cols-2 gap-5 items-center pl-8 pr-8 text-start">

                    <h2 className="text-lg col-span-2  text-center"><strong >Nombre del servicio: </strong>{name}</h2>
                    <p className="mt-2 col-span-1">
                        <strong>Duración:</strong> {duration}
                    </p>
                    <p className="mt-2 col-span-1 text-left">
                        <strong>Descripción:</strong> {description}
                    </p>
                    <p className="mt-2 col-span-1">
                        <strong>Precio:</strong> {price}
                    </p>
                    <p className='mt-2 col-span-1'>
                        <strong>Para Vehículos:</strong> {typeVehicles}
                    </p>

                    
                    <div className='flex justify-center text-center mt-6 items-center col-span-2'>
              <Link to={`/appointment/create-appointment/${id}/${name}/${price}`} className=' w-full'>
            <button className='w-1/2  text-blue-700 font-bold border-solid border-2 transition delay-150 duration-300 ease-in-out hover:scale-110 border-blue-600 hover:bg-button-primary rounded-xl hover:text-black '  >Reservar cita</button>
            </Link>
            </div>
                </div>
            </div>
        </div></>

    );
};