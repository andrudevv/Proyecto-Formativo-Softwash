import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import ContentTable from '../../components/ContentTable'
import DivContent from '../../components/DivContent';
import Spinner from '../../components/SpinnerLoading';
import ButtonAction from '../../components/ButtonAction';
import ReusableModals from '../../components/ReusableModals';
import VehicleRegistrationModal from '../../components/User/ModalRegisterVehicle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalUpdateVehicle from '../../components/User/ModalUpdateVehicle';
import { useAuth } from '../../context/UserContext';
import DataProfile from '../../components/User/DataProfile'
import ModalUpdateProfileUser from '../../components/User/ModalUpdateProfileUser';
import ModalError from '../../components/ModalError';
const stylesTable = 'w-full bg-white-100 mb-6  border border-gray-300';
const stylesThead = 'bg-gray-400';
const stylesTbody = 'bg-blue-200';
const styleActions = ' md:grid md:grid-flow-col  md:auto-cols-max place-content-evenly sm:flex sm:space-y';

const fieldsMapping = {
    "plate": "Placa",
    "model": "Modelo",
    "color": "Color",
    "typeVehicle": "Tipo de Vehículo",
    "acciones": "Acciones"
};
const fields = [ "plate", "model", "color", "typeVehicle", "acciones"];


export default function MyVehicles() {
    const [editingVehicle, setEditingVehicle] = useState(null);
    const {
        updateVehicle,
        registerErrors,
        getVehicles,
        deleteVehicle,
        createVehicle,
        getProfile,
        updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [update, setUpdate] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [create, Setcreate] = useState(false);
    const [userVehicles, setUserVehicles] = useState([]);
    const [userData, setUserData] = useState({});



    // perfil
    // handle para enviar al request de actualizacion de datos del usuario
    const onSubmitProfile = handleSubmit(async (userValue) => {
            delete userValue.Municipality;
            delete userValue.role;
            delete userValue.id;
            const response = await updateUserProfile(userValue);
            setUpdateProfile(false);
            if (response) {
                toast.success('Datos actualizados correctamente', { theme: "light" });
            }
            const dataProfile = await getProfile();
            setUserData(dataProfile);

        


    })
    const handleModalUpdateOpenProfile = () => {
        setUpdateProfile(true);
    }
    const handleModalUpdateCloseProfile = () => {
        setUpdateProfile(false);
    }

    // funciones para eliminar vehiculo

    const handleEliminar = async (id) => {
        const response = await deleteVehicle(id);
        closeModalDelete();
        if (response) {
            const res = await getVehicles();
            setUserVehicles(res);
            toast.success('Se ha eliminado Correctamente', { theme: "light" })
        }
    };

    const handleModalDelete = (id) => {
        setSelectedVehicleId(id);
        setIsModalDelete(true);
    };
    const closeModalDelete = () => {
        setSelectedVehicleId(null);
        setIsModalDelete(false);
    };



    //handle para actualizar vehiculo

    const handleModalUpdate = handleSubmit(async (vehicle) => {
        const id = vehicle.id;
        delete vehicle.id;
        const { plate, typeVehicle, model, color} = vehicle;
        const UpdateV = {
        plate, typeVehicle, model, color
        }
        const rt = await updateVehicle(id, UpdateV);
        setUpdate(false);
        setEditingVehicle(null);
        if(rt){

            const response = await getVehicles();
            setUserVehicles(response);
            toast.success('Vehículo actualizado correctamente.', { theme: "light" });
        }
       

    })
    const handleModalUpdateOpen = (idV) => {
       const vehicleToEdit = userVehicles.find((vehicle) => vehicle.id === idV);
        setEditingVehicle(vehicleToEdit);
        setUpdate(true);
    }
    const handleModalUpdateClose = () => {
        setEditingVehicle(null);
        setUpdate(false);
    }


    /////////funciones para modal crear vehiculos
    const handleModalCreate = handleSubmit(async (newVehicle) => {
        console.log(newVehicle);
        const response = await createVehicle(newVehicle);
        if (!response) {
            toast.error(`Error al crear el vehículo`, { theme: "light" });
        } else {
            toast.success(`${response}`, { theme: "light" });
            const update = await getVehicles();
            setUserVehicles(update);
        }
        Setcreate(false);
    })

    const handleModalCreateClose = () => {
        reset();
        Setcreate(false);


    }

    const handleModalCreateOpen = () => {
        Setcreate(true);
        reset();

    }

    const customButtons = [

        {
            text: "Editar",
            tipo: "button",
            onClick: handleModalUpdateOpen,
            estilos: "bg-blue-500 hover:bg-blue-700 text-white font-bold h-auto py-1  px-2 rounded ",
        }, {
            text: "Eliminar",
            tipo: "button",
            onClick: handleModalDelete,
            estilos: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ",
        },
        // Agrega más botones según sea necesario
    ];

    useEffect(() => {
        const getUser = async () => {
            setLoading(true)
            try {
                const dataProfile = await getProfile();
                setUserData(dataProfile);
                setLoading(false)
            } catch (error) {
                toast.error(`Error al traer los datos del usuario`, { theme: "light" })
            }
        }

        const fetchData = async () => {
            try {
                const response = await getVehicles();
                setUserVehicles(response);



            } catch (error) {
                toast.error(`Error al obtener vehículos del usuario`, { theme: "light" })
            }
        };
        getUser();
        fetchData();
        window.scrollTo(0, 0);
    }, [updateProfile]);
    return (
        <>


{registerErrors.map((error, i) => (
            <ModalError isOpen={registerErrors} message={error} key={i} 
            />))}
            <ModalUpdateProfileUser onSubmit={onSubmitProfile} reset={reset} handleSubmit={handleSubmit} DataUser={userData} setValue={setValue} isOpen={updateProfile} title={'Editar Datos del Usuario'}
                register={register} errors={errors} buttons={[
                    {
                        text: "Cancelar",
                        tipo: "button",
                        onClick: handleModalUpdateCloseProfile,
                        estilos: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ",
                    },{
                        text: "Actualizar",
                        tipo: "button",
                        onClick: onSubmitProfile,
                        estilos: "bg-blue-500 hover:bg-blue-700 text-white font-bold h-auto py-1  px-2 rounded ",
                    }, 
                ]} />
            <ModalUpdateVehicle
                onSubmit={handleModalUpdate} setValue={setValue} reset={reset} editingVehicle={editingVehicle} handleSubmit={handleSubmit} isOpen={update} title={'Editar vehículo'}
                register={register} errors={errors} buttons={[
                     {
                        text: "Cancelar",
                        tipo: "button",
                        onClick: handleModalUpdateClose,
                        estilos: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ",
                    },{
                        text: "Editar",
                        tipo: "button",
                        onClick: handleModalUpdate,
                        estilos: "bg-blue-500 hover:bg-blue-700 text-white font-bold h-auto py-1  px-2 rounded ",
                    },
                ]} />
            <VehicleRegistrationModal onSubmit={onsubmit} isOpen={create}
                title="Registrar vehículo"
                setValue={setValue}

                buttons={[
                    {
                        text: "Cancelar",
                        tipo: "button",
                        onClick: handleModalCreateClose,
                        estilos: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ",
                    }, {
                        text: "Registrar",
                        tipo: "button",
                        onClick: handleModalCreate,
                        estilos: "bg-blue-500 hover:bg-blue-700 text-white font-bold h-auto py-1  px-2 rounded ",
                    },
                ]}
                errors={errors}
                register={register}

            />
            <div>
                {loading || !userData ? (<Spinner />) : (<><DataProfile user={userData} onClick={handleModalUpdateOpenProfile} /></>)}
            </div>
            <div className='h-[20vh]'></div>
            <ToastContainer />
            <DivContent>
                <div className='mb-10 h-auto'>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className='mx-20' >

                            <h1 className="flex justify-center text-2xl font-bold mb-4">MIS VEHíCULOS</h1>
                            <ButtonAction estilos={'flex w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4 w-auto justify-end'} text={'Añadir Vehículo'} onClick={handleModalCreateOpen} />
                            <ContentTable fields={fields} data={userVehicles} fieldsMapping={fieldsMapping}
                                buttonActions={(id) => customButtons.map((button, index) => (<ButtonAction key={index} {...button} onClick={() => button.onClick(id)} />))}
                                stylesTable={stylesTable} stylesThead={stylesThead} stylesTbody={stylesTbody}
                                styleActions={styleActions} />

                            <ReusableModals
                                isOpen={isModalDelete}
                                onClose={closeModalDelete}
                                title="Eliminar vehículo"
                                message={'¿Seguro que quiere eliminar el vehículo?'}
                                buttons={[
                                   
                                    {
                                        text: 'Cancelar',
                                        onClick: closeModalDelete,
                                        styles: 'bg-red-500 hover:bg-red-700 text-white',
                                    } ,{
                                        text: 'Eliminar',
                                        onClick: () => handleEliminar(selectedVehicleId),
                                        styles: 'bg-blue-500 hover:bg-blue-700 text-white font-bold',
                                    },
                                ]}
                            />
                        </div>
                    )}
                </div>
            </DivContent>
            <div>
            </div>
        </>
    )
}
