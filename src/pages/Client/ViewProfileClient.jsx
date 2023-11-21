import React, { useState,useEffect } from 'react'
import ButtonAction from '../../components/ButtonAction'
import ContentTable from '../../components/ContentTable'
import ReusableModals from '../../components/ReusableModals'
import { ToastContainer, toast } from 'react-toastify';
import ServiceRegistrationModal from '../../components/ModalRegisterService';
import { useForm } from "react-hook-form"
import ModalUpdateService from '../../components/ModalUpdateService';
import ModalUpdateProfile from '../../components/ModalUpdateProfile';
import NavPagination from '../../components/NavPagination';
import Axios from "../../services/axios";


const stylesTable = 'w-full bg-white-100 mb-6 border border-gray-300';
const stylesThead = 'bg-gray-400';
const stylesTbody = 'bg-blue-200';
const styleActions = ' md:grid md:grid-flow-col md:auto-cols-max place-content-evenly sm:flex sm:space-y';
// const client = {
//     "rutLaundry": 312414,
//     "name": "lavamotors",
//     "address": "cra 14 nr 22-15",
//     "phone": 3234516961,
//     "email": "seshonpait01@gmail.com",
//     "ability": 2,
//     "aperture": "07:00 AM",
//     "closing": "05:00 PM",
//     "municipalityId": {
//         "id": 4,
//         "name": "Abriaquí",
//         "departmentId": 2
//     }
// }
const clientServices = [{
    "id": 11,
    "name": "lavado de guardabarros de carro",
    "duration": "30 minutos",
    "description": "se lava el guardabarros completamente",
    "price": 1500,
    "laundryId": 2,
    "typeVehicles": "moto"
}, {
    "id": 2,
    "name": "lavado de guardabarros de carro",
    "duration": "45 minutos",
    "description": "se lava el guardabarros completamente",
    "price": 2000,
    "laundryId": 2,
    "typeVehicles": "moto"
}]

const fieldsMapping = {
    "id": "ID",
    "name": "Nombre",
    "duration": "Duracion",
    "description": "Descripcion",
    "price": "Precio",
    "typeVehicles": "Tipo vehiculo",
    "acciones": "Acciones"
};
const fields = ["id", "name", "duration", "description", "price", "typeVehicles", "acciones"];


export default function ViewProfileClient() {
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [editingService, setEditingService] = useState(null);
// const [dataClient, setDataClient] = useState(null)
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [update, Setupdate] = useState(false);
    const [updateProfile, SetupdateProfile] = useState(false);
    const [createService, SetcreateService] = useState(false);
    const [userData ,setUserData] = useState([]);
    const { register, handleSubmit, formState: { errors }, setValue, reset, getValues } = useForm();


    const onSubmit = handleSubmit(async (values) => {
        console.log(values);
        clientServices.push(values);
    })
    const onSubmitUpdateProfile = handleSubmit(async (values) => {
        console.log(values);
        clientServices.push(values);
    })
    const onSubmitUpdate = handleSubmit(async (values) => {
        const index = clientServices.findIndex((service) => service.id === editingService.id);
        if (index !== -1) {
            // Actualiza las propiedades del vehículo con los nuevos valores
            clientServices[index] = { ...clientServices[index], ...values };


            // Realiza otras acciones necesarias después de la actualización

            // Cierra el modal de edición
            handleModalUpdateClose();
        }
    })


    const handleModalCreate = () => {
        const formValues = getValues();
        onSubmit(formValues);
        SetcreateService(false);
    }
    const handleModalCreateClose = () => {
        reset();
        SetcreateService(false);


    }
    const handleModalCreateOpen = () => {
        SetcreateService(true);
        reset();

    }
    const handleModalUpdateProfileOpen = () => {

        console.log(clientEdit);
        setEditingClient(clientEdit);
        SetupdateProfile(true);
    }
    const handleModalUpdateProfileClose = () => {
        // setEditingVehicle(null);
        SetupdateProfile(false);
    }
    const handleModalUpdateProfile = () => {
        const formValues = getValues();
        // onSubmitUpdate(formValues);
        // setEditingVehicle(null)
        console.log(formValues);
        SetupdateProfile(false);

    }
    const handleModalUpdateOpen = (idS) => {
        const serviceToEdit = clientServices.find((service) => service.id === idS);
        console.log(serviceToEdit);
        setEditingService(serviceToEdit);
        Setupdate(true);
    }
    const handleModalUpdateClose = () => {
        setEditingService(null);
        Setupdate(false);
    }
    const handleModalUpdate = () => {
        const formValues = getValues();
        onSubmitUpdate(formValues);
        setEditingService(null)
        Setupdate(false);

    }

    const handleModalDelete = (id) => {
        setSelectedServiceId(id);
        setIsModalDelete(true);
    };
    const closeModalDelete = () => {
        setSelectedServiceId(null);
        setIsModalDelete(false);
    };
    const handleEliminarClick = (id) => {
        console.log(id);
        // onSubmitDelete(id)
        toast.success(`Servicio eliminado con ID ${id}`, { theme: "light" });
        closeModalDelete();
    };
    const customButtons = [

        {
            text: "Editar",
            tipo: "button",
            onClick: handleModalUpdateOpen,
            estilos: "bg-blue-500 hover:bg-blue-700  text-white font-bold h-auto py-1  px-2 rounded ",
        }, {
            text: "Eliminar",
            tipo: "button",
            onClick: handleModalDelete,
            estilos: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ",
        },
        // Agrega más botones según sea necesario
    ];

    const getProfile = () => {
        Axios.get(`http://localhost:4000/api/client/profile-client`)
            .then((Response) => {
                setUserData(Response.data);
                console.log(Response.data);
            })
            .catch((error) => {
                console.log(error)
                throw error;
            });
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                getProfile();
                console.log(client);
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
                // Puedes manejar el error aquí, como mostrar un mensaje al usuario.
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <ToastContainer />
            <ModalUpdateProfile onSubmit={onSubmitUpdateProfile} setValue={setValue} reset={reset} editingService={editingService} handleSubmit={handleSubmit} isOpen={updateProfile} title={'Editar Perfil'} message={'Modificacion de datos'} register={register} errors={errors} buttons={[
                {
                    text: "Editar",
                    tipo: "button",
                    onClick: handleModalUpdateProfile,
                    estilos: "bg-blue-500 hover:bg-blue-700 text-white font-bold h-auto py-1  px-2 rounded ",
                }, {
                    text: "Cancelar",
                    tipo: "button",
                    onClick: handleModalUpdateProfileClose,
                    estilos: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ",
                },
            ]} />
            <ModalUpdateService onSubmit={handleModalUpdate} setValue={setValue} reset={reset} editingService={editingService} handleSubmit={handleSubmit} isOpen={update} title={'Editar Servicio'} message={'Modificacion del servicio'} register={register} errors={errors} buttons={[
                {
                    text: "Editar",
                    tipo: "button",
                    onClick: handleModalUpdate,
                    estilos: "bg-blue-500 hover:bg-blue-700 text-white font-bold h-auto py-1  px-2 rounded ",
                }, {
                    text: "Cancelar",
                    tipo: "button",
                    onClick: handleModalUpdateClose,
                    estilos: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ",
                },
            ]} />
            <ServiceRegistrationModal onSubmit={onsubmit} isOpen={createService}
                title="Registrar servicio"
                setValue={setValue}
                message={"Ingrese datos del servicio"}
                buttons={[
                    {
                        text: "Registrar",
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
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">

                <div className="grid grid-cols-2 mt-10 gap-10">
                    <div>
                        <strong>Rut:</strong> {userData.rutLaundry}
                    </div>
                    <div>
                        <strong>Nombre:</strong> {userData.name}
                    </div>
                    <div>
                        <strong>Direccion:</strong> {userData.address}
                    </div>
                    <div>
                        <strong>Correo:</strong> {userData.email}
                    </div>
                    <div>
                        <strong>Capacidad:</strong> {userData.ability}
                    </div>
                    <div>
                        <strong>Hora de apertura :</strong> {userData.aperture}
                    </div>
                    <div>
                        <strong>Hora de cierre:</strong> {userData.closing}
                    </div>

                    <div>
                        {/* <strong>Municipio:</strong> {userData.municipalityId.name} */}
                    </div>
                    <div className='col-span-2 text-center'>
                        <ButtonAction onClick={handleModalUpdateProfileOpen} estilos={'w-1/3 h-10 font-bold bg-button-primary rounded-md'} text={'Actualizar'} />

                    </div>

                    {/* Agrega más detalles según sea necesario */}
                </div>
            </div>



            <div>
                {/* <DivContent className={styles}> */}
                <h1 className="flex justify-center text-2xl font-bold mt-8 mb-6">MIS SERVICIOS</h1>
                <ButtonAction estilos={'flex  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4 w-auto justify-end'} text={'Añadir Vahiculo'} onClick={handleModalCreateOpen} />
                <ContentTable fields={fields} data={clientServices} fieldsMapping={fieldsMapping}
                    buttonActions={(id) => customButtons.map((button, index) => (<ButtonAction key={index} {...button} onClick={() => button.onClick(id)} />))}
                    stylesTable={stylesTable} stylesThead={stylesThead} stylesTbody={stylesTbody}
                    styleActions={styleActions} />
                {/* </DivContent> */}
                    <NavPagination styles={'w-full flex justify-center'} />
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
