import React, { useEffect, useState } from 'react'
import ListServicesLaundry from '../../components/User/ListServicesLaundry'
import { useAuth } from '../../context/UserContext';
import Spinner from '../../components/SpinnerLoading';
import { useParams } from 'react-router-dom';
import NavPagination from '../../components/NavPagination';
import { toast } from 'react-toastify';
import ModalError from '../../components/ModalError';
export default function ViewProfileLaundry() {
    const { ViewProfileLaundryId, registerErrors } = useAuth();
    const [services, setServices] = useState([]);
    const [dataServices, setDataServices] = useState(null);
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState(null);
    const { id } = useParams();
    const [styleOnMax, setStyleOnMax] = useState('flex');
    const [page, setPage] = useState(0);
    useEffect( () => {
        // setLoading(true)
        const getData = async (id) => {
            try {
                setLoading(true)
                const query = {
                    offset:page
                }
                const rta = await ViewProfileLaundryId(id, query);
                if(rta.length < 5){
                    setStyleOnMax('hidden')
                }else{
                    setStyleOnMax('flex')
                }
                
                setDataServices(rta);
                setServices(rta.Services);
                if(rta.imageUrl){
                    setImg(rta.imageUrl)
                    // setImg( "https://i.pinimg.com/236x/48/93/d1/4893d178fdbab0621bb9e56eba9146f7.jpg")

                }else{
                    setImg( "https://via.placeholder.com/150")
                }
               
            } catch (error) {
                toast.error('Error al traer los datos')
            } finally {
                setLoading(false);
                // console.log(dataServices);   
            }
        }

        getData(id);
        window.scrollTo(0, 0);
    }, [id,page, styleOnMax]);

   
    // const{ name, address, aperture, closing, phone, rutLaundry, Municipality } = dataServices;
    
    return (
        <>
            {registerErrors.map((error, i) => (
            <ModalError isOpen={registerErrors} message={error} key={i} 
            />))}
            {loading ? ( <Spinner />) :  <> <div className="w-full mx-auto bg-white-100 bg-opacity-20 p-4 rounded-xl overflow-hidden shadow-md">
                <div className="md:flex flex-col">
                    <div className=" w-full flex justify-center ">
                        <img
                            className="h-52 w-full object-cover md:w-52"
                          
                            src={img}
                            alt="imagen lavadero"
                        />
                    </div>
                    <div className=" grid grid-cols-2 gap-5 pl-8 pr-8 text-center">

                        <h2 className="text-lg col-span-2 font-semibold text-center">{dataServices ? dataServices.name : 'nombre'}</h2>
                        <p className="mt-2 ">
                            <strong>Nit:</strong> {dataServices ? dataServices.rutLaundry : 'Nit'}
                        </p>
                        <p className="mt-2">
                            <strong>Direccion:</strong> {dataServices ? dataServices.address : 'Direccion'}
                        </p>
                        <p className="mt-2">
                            <strong>Abierto:</strong> {dataServices ? dataServices.aperture : ' horario de apertura'}
                        </p>
                        <p>
                            <strong>Cerrado:</strong> {dataServices ? dataServices.closing : 'horario de cierre '}
                        </p>
                        <p>
                            <strong>Telefono:</strong> {dataServices ? dataServices.phone : 'telefono'}
                        </p>
                        <p>
                            <strong>Municipio:</strong> {dataServices ? dataServices.Municipality.name : 'nombre municipio'}
                        </p>

                    </div>
                </div>
            </div>

                {!services || loading ? (<Spinner />) : (<ListServicesLaundry registerErrors={registerErrors} services={services} />)}
                <div className='w-full flex justify-center mt-8'>
                            <NavPagination styles={'flex justify-center '}   styleOnMax={styleOnMax} page={page} setPage={setPage} />
                        </div>

            </>



            }

        </>

    )
}


