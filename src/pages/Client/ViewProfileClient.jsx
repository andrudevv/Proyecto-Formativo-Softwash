import React, { useState, useEffect,useRef } from 'react'
import ButtonAction from '../../components/ButtonAction'
import ContentTable from '../../components/ContentTable'
import ReusableModals from '../../components/ReusableModals'
import { ToastContainer, toast } from 'react-toastify';
import ServiceRegistrationModal from '../../components/Client/ModalRegisterService';
import { useForm } from "react-hook-form"
import ModalUpdateService from '../../components/Client/ModalUpdateService';
import ModalUpdateProfileClient from '../../components/Client/ModalUpdateProfileClient';
import NavPagination from '../../components/NavPagination';
import { clientAuth } from '../../context/ClientContext';
import DataProfileClient from '../../components/Client/DataProfileClient';
import Spinner from '../../components/SpinnerLoading';
import ModalError from '../../components/ModalError';
const stylesTable = 'w-full bg-white-100 mb-6 border border-gray-300';
const stylesThead = 'bg-gray-400';
const stylesTbody = 'bg-blue-200';
const styleActions = ' flex justify-between items-center md:auto-cols-max sm:space-y-2';
// ' md:grid  md:grid-flow-col table-cell md:auto-cols-max place-content-end justify-center items-center  sm:flex sm:space-y'
const fieldsMapping = {
    "name": "Nombre",
    "duration": "Duracion",
    "description": "Descripcion",
    "price": "Precio COP",
    "typeVehicles": "Tipo de vehículo",
    "acciones": "Acciones"
};
const fields = ["name", "duration", "description", "price", "typeVehicles", "acciones"];


export default function ViewProfileClient() {
    const { getProfileClient,
        registerErrors,
        updateProfileClient,
        getServices,
        updateServiceLaundry,
        serviceDelete,
        newService,
        updateImgProfile
    } = clientAuth();
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [serviceSelected, setServiceSelected] = useState(null);
    // const [dataClient, setDataClient] = useState(null)
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [update, setUpdate] = useState(false);
    const [validateChangue, setValidateChangue] = useState(null);
    const [ openValidateChange, setOpenValidateChangue] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [createService, setCreateService] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clientData, setClientData] = useState([]);
    const [clientServices, setClientServices] = useState([]);
    const [styleOnMax, setStyleOnMax] = useState('flex');
    const [page, setPage] = useState(0);

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const fileInputRef = useRef(null);
    // handle para actualizar servicios
    const handleModalUpdateService = handleSubmit(async (editService) => {
        console.log(editService);
        const { id, name, duration, description, price, typeVehicles } = editService;
        const data = {
            name,
            duration,
            description,
            price,
            typeVehicles
        }
        const idService = { id };
        const updateService = await updateServiceLaundry(idService.id, data)
        if (!updateService) {
            toast.error('Error al actualizar servicio');
            handleModalUpdateClose();
            return
        }
        getServicesLaundry();
        toast.success(`${updateService}`, { theme: "light" });
        handleModalUpdateClose();


    });
    
    const handleModalUpdateOpen = (idS) => {
        const serviceToEdit = clientServices.find((service) => service.id === idS);
        setServiceSelected(serviceToEdit);
        setUpdate(true);
    }
    const handleModalUpdateClose = () => {
        setServiceSelected(null);
        setUpdate(false);
        reset();
    }
    //   handle para crear servicios
    const handleModalCreate = handleSubmit(async (service) => {
console.log(service);
        const resp = await newService(service);
        if (!resp) {
            toast.error('Error al crear el servicio');
            handleModalCreateClose();
            return
        }

        toast.success(`${resp}`, { theme: "light" });
        reset()
        setCreateService(false)
        getServicesLaundry();

    })
    const handleModalCreateClose = () => {
        reset();
        setCreateService(false);


    }
    const handleModalCreateOpen = () => {
        setCreateService(true);
        reset();

    }


    // modal para actualzar perfil del cliente 
    const onSubmitUpdateProfile = handleSubmit(async (dataClient) => {
        // console.log(dataClient);

        try {
            delete dataClient.id;
            const response = await updateProfileClient(dataClient);
            if (!response) {
                toast.error('Error al actualizar datos del cliente');
                setUpdateProfile(false);
                return
            }
            setUpdateProfile(false);
            getProfile();
            toast.success(`${response}`);
        } catch (error) {
            toast.error(`${error}`)
        }
    })
    const handleModalUpdateProfileOpen = () => {
        setUpdateProfile(true);
    }
    const handleModalUpdateProfileClose = () => {
        setUpdateProfile(false);
    }
    const onclickImg = ()=>{
        fileInputRef.current.click();
    }
    const handleUpdateImage = async (img)=>{
        // const body = {imageUrl: img}
        setValidateChangue(null);

        const formD = new FormData();
        formD.append('imageUrl',img)
        const updateImg = await updateImgProfile(formD);
        console.log(updateImg);
        if(updateImg){
            await getProfile();
            setOpenValidateChangue(false);
            toast.success('Se ha cambiado la foto exitosamente', {theme: 'light'});
        }
    }
const handleFileChange = (e)=>{
    const img= e.target.files[0];
    if (img) {
        const allowedTypes = ['image/png', 'image/jpeg'];
    
        if (allowedTypes.includes(img.type)) {
          setValidateChangue(img);
          setOpenValidateChangue(true);
        } else {
          toast.error('Solo se permiten archivos PNG y JPG.',{theme: 'light'});
        }
      }
   
}
    const closeValidateChangue = ()=>{
        setOpenValidateChangue(false);
        setValidateChangue(null);
    }
    //  handle para eliminar  servicios
    const handleModalDelete = (id) => {
        setSelectedServiceId(id);
        setIsModalDelete(true);
    };
    const closeModalDelete = () => {
        setSelectedServiceId(null);
        setIsModalDelete(false);
    };
    const handleEliminarClick = async (id) => {
        const deleteService = await serviceDelete(id);
        if (!deleteService) {
            toast.error('Error al eliminar el servicio', { theme: "light" })
            closeModalDelete();
            return
        }
        getServicesLaundry();

        toast.success(`${deleteService}`, { theme: "light" })
        closeModalDelete();
    };
    const customButtons = [

        {
            text: "Editar",
            tipo: "button",
            onClick: handleModalUpdateOpen,
            estilos: "bg-blue-500 hover:bg-blue-700 min-w-[70%] text-white font-bold h-auto py-1  px-2 rounded ",
        }, {
            text: "Eliminar",
            tipo: "button",
            onClick: handleModalDelete,
            estilos: "bg-red-500 hover:bg-red-700 min-w-[70%] text-white font-bold py-1 px-2  rounded ",
        },
        // Agrega más botones según sea necesario
    ];
    const getProfile = async () => {
        setLoading(true)
        try {
            const res = await getProfileClient();
            setClientData(res);
            setLoading(false)
        } catch (error) {
            toast.error(`Error al traer los datos del lavadero`, { theme: "light" })
        }

    };
    const getServicesLaundry = async () => {
        try {
            const query = {
                offset: `${page}`
            }
            const servicesData = await getServices(query);
            if(servicesData.length < 5){
                setStyleOnMax('hidden')
            }else{
                setStyleOnMax('flex')
            }
            setClientServices(servicesData)
        } catch (error) {
            toast.error('Error al obtener servicios del lavadero', { theme: "light" })
        }
    };

    useEffect(() => {


        getServicesLaundry();
        getProfile();
        window.scrollTo(0, 0);
    }, []);
    return (

        <>
             {registerErrors.map((error, i) => (
            <ModalError isOpen={registerErrors} message={error} key={i} 
            />))}
            <ToastContainer />

            <div>
                {loading || !clientData ? (<Spinner />) : (<><DataProfileClient client={clientData} fileInputRef={fileInputRef} handleFileChange={handleFileChange} onclickImg={onclickImg} onClick={handleModalUpdateProfileOpen} /></>)}
            </div>
            <ModalUpdateProfileClient onSubmit={onSubmitUpdateProfile} setValue={setValue} reset={reset} DataUser={clientData} handleSubmit={handleSubmit} isOpen={updateProfile} title={'Actualizar datos del lavadero'} message={'Modificacion de datos'} register={register} errors={errors} buttons={[
                {
                    text: "Actualizar",
                    tipo: "button",
                    onClick: onSubmitUpdateProfile,
                    estilos: "bg-blue-500 hover:bg-blue-700 text-white font-bold h-auto py-1  px-2 rounded ",
                }, {
                    text: "Cancelar",
                    tipo: "button",
                    onClick: handleModalUpdateProfileClose,
                    estilos: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ",
                },
            ]} />
             <ReusableModals
                    isOpen={openValidateChange}
                    onClose={closeValidateChangue}
                    title="Actualizar foto"
                    message={'¿Seguro que quieres cambiar la foto?'}
                    buttons={[
                        {
                            text: 'Cancelar',
                           onClick: closeValidateChangue,
                            styles: 'bg-red-500 hover:bg-red-600 text-black font-bold',
                        },
                        {
                            text: 'Cambiar',
                            onClick: () => handleUpdateImage(validateChangue),
                            styles: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
                        }
                    ]}
                />
            <ModalUpdateService onSubmit={handleModalUpdateService} setValue={setValue} reset={reset} editingService={serviceSelected} handleSubmit={handleSubmit} isOpen={update} title={'Editar Servicio'} register={register} errors={errors} buttons={[
                {
                    text: "Editar",
                    tipo: "button",
                    onClick: handleModalUpdateService,
                    estilos: "bg-blue-500 hover:bg-blue-700 text-white font-bold h-auto py-1  px-2 rounded ",
                }, {
                    text: "Cancelar",
                    tipo: "button",
                    onClick: handleModalUpdateClose,
                    estilos: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ",
                },
            ]} />
            <ServiceRegistrationModal onSubmit={onsubmit} isOpen={createService}
                title="Crear servicio"
                setValue={setValue}
                message={"Ingrese datos del servicio"}
                buttons={[
                    {
                        text: "Crear",
                        tipo: "button",
                        onClick: handleModalCreate,
                        estilos: "bg-blue-500 hover:bg-blue-700 text-white font-bold h-auto py-1  px-2 rounded ",
                    }, {
                        text: "Cancelar",
                        tipo: "button",
                        onClick: handleModalCreateClose,
                        estilos: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ",
                    },
                ]}
                errors={errors}
                register={register}

            />




            <div>
                {/* <DivContent className={styles}> */}
                <h1 className="flex justify-center text-2xl font-bold mt-8 mb-6">MIS SERVICIOS</h1>
                <ButtonAction estilos={'flex  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4 w-auto justify-end'}
                    text={'Añadir Servicio'} onClick={handleModalCreateOpen} />
                <ContentTable fields={fields} data={clientServices} fieldsMapping={fieldsMapping}
                    buttonActions={(id) => customButtons.map((button, index) => (<ButtonAction key={index} {...button} onClick={() => button.onClick(id)} />))}
                    stylesTable={stylesTable} stylesThead={stylesThead} stylesTbody={stylesTbody}
                    styleActions={styleActions} />
                {/* </DivContent> */}
                <NavPagination styles={'flex justify-center'}  styleOnMax={styleOnMax} page={page} setPage={setPage}/>
                <ReusableModals
                    isOpen={isModalDelete}
                    onClose={closeModalDelete}
                    title="Eliminar Servicio"
                    message={'¿Seguro que quiere eliminar el Servicio?'}
                    buttons={[
                        {
                            text: 'Eliminar',
                            onClick: () => handleEliminarClick(selectedServiceId),
                            styles: 'bg-red-500 hover:bg-red-600 text-black font-bold',
                        },
                        {
                            text: 'Cancelar',
                            onClick: closeModalDelete,
                            styles: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
                        }
                    ]}
                />





            </div>
        </>
    )
}
