import React, { useEffect, useState } from 'react'
import ListServicesLaundry from '../../components/User/ListServicesLaundry'
import { useAuth } from '../../context/UserContext';
import Spinner from '../../components/SpinnerLoading';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function ViewProfileLaundry() {
    const { ViewProfileLaundry, registerErrors } = useAuth();
    const [services, setServices] = useState([]);
    const [dataServices, setDataServices] = useState(null);
    const [loading, setLoading] = useState(false);


    const { id } = useParams();
    useEffect(() => {
        setLoading(true)
        const getData = async (id) => {
            try {
                const rta = await ViewProfileLaundry(id);
                setLoading(false)
                setDataServices(rta);
                setServices(rta.Services)
            } catch (error) {
                toast.error('Error al traer los datos')
            }
        }
        if(dataServices){
            setLoading(false);
        }
        getData(id);
        window.scrollTo(0, 0);
    }, [id]);


    // const { id, name, address, aperture, closing, phone, rutLaundry, Municipality } = dataLaundry;
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
            {loading ? <Spinner /> : (<> <div className="w-full mx-auto bg-white-100 bg-opacity-20 p-4 rounded-xl overflow-hidden shadow-md">
                <div className="md:flex flex-col">
                    <div className=" w-full flex justify-center ">
                        <img
                            className="h-52 w-full object-cover md:w-52"
                            src="https://via.placeholder.com/150"
                            alt="Business Image"
                        />
                    </div>
                    <div className=" grid grid-cols-2 gap-5 pl-8 pr-8 text-center">

                        <h2 className="text-lg col-span-2 font-semibold text-center">{'name'}</h2>
                        <p className="mt-2 ">
                            <strong>Nit:</strong> {'rutLaundry'}
                        </p>
                        <p className="mt-2">
                            <strong>Direccion:</strong> {'address'}
                        </p>
                        <p className="mt-2">
                            <strong>Abierto:</strong> {'aperture'}
                        </p>
                        <p>
                            <strong>Cerrado:</strong> {'closing'}
                        </p>
                        <p>
                            <strong>Telefono:</strong> {'phone'}
                        </p>
                        <p>
                            <strong>Municipio:</strong> {'Municipality.name'}
                        </p>

                    </div>
                </div>
            </div>

                {!services || loading ? (<Spinner />) : (<ListServicesLaundry registerErrors={registerErrors} services={services} />)}


            </>



            )}</>

    )
}


