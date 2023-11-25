import React, { useState,useEffect } from 'react'
import Spinner from '../SpinnerLoading';
import { Link } from 'react-router-dom';
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
            {!services || loading ?
                (<Spinner />) : (
                    <>
                    <h2 className='w-full flex justify-center items-center text-4xl mt-32'>servicios</h2>
                    <div className="grid grid-cols-1 gap-5 space-y-5  ">
                        {services.map((service) => (
                            <ListServices key={service.id} service={service} />
                        ))}

                    </div>
                    </>
                )}
        </>
    )
}

const ListServices = ({ service }) => {
    const { id, name, duration, description, price, typeVehicles } = service;

    return (
        <> 
        <div className="w-full mt-16 mx-auto bg-white-100 bg-opacity-20 p-4 rounded-xl overflow-hidden shadow-md">
            <div className="md:flex">
                <div className=" md:flex-shrink-0">
                    <img
                        className="h-52 w-full object-cover md:w-52"
                        src="https://via.placeholder.com/150"
                        alt="Business Image"
                    />
                </div>
                <div className="w-full  grid grid-cols-2 gap-5 pl-8 pr-8 text-center">

                    <h2 className="text-lg col-span-2 font-semibold text-center">{name}</h2>
                    <p className="mt-2 ">
                        <strong>Duracion:</strong> {duration}
                    </p>
                    <p className="mt-2 col-span-2 text-left">
                        <strong>Descripcion:</strong> {description}
                    </p>
                    <p className="mt-2">
                        <strong>Precio:</strong> {price}
                    </p>
                    <p>
                        <strong>Para Vehiculos:</strong> {typeVehicles}
                    </p>

                    
                    <div className='flex justify-center items-center col-span-2'>
              <Link to={`/appointment/create-appointment/${id}/${name}`} className=' w-full'>
            <button className='w-1/4  text-blue-700 border-solid border-2 transition delay-150 duration-300 ease-in-out hover:scale-110 border-blue-600 hover:bg-button-primary rounded-xl hover:text-black '  >Reservar cita</button>
            </Link>
            </div>
                </div>
            </div>
        </div></>

    );
};