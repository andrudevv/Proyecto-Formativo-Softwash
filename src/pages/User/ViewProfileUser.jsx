import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm} from "react-hook-form"
import ContentTable from '../../components/ContentTable'
import DivContent from '../../components/DivContent';
import Spinner from '../../components/SpinnerLoading';
import ButtonAction from '../../components/ButtonAction';
import ReusableModals from '../../components/ReusableModals';
import VehicleRegistrationModal from '../../components/ModalRegisterVehicle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalUpdateVehicle from '../../components/ModalUpdateVehicle';
import Axios from "../../services/axios";
import { useAuth } from '../../context/UserContext';

// const styles = 'justify-center items-center bg-gray-200';
const stylesTable = 'w-full bg-white-100 mb-6  border border-gray-300';
const stylesThead = 'bg-gray-400';
const stylesTbody = 'bg-blue-200';
const styleActions = ' md:grid md:grid-flow-col  md:auto-cols-max place-content-evenly sm:flex sm:space-y';
const user = [
    {
        "id": 1,
        "plate": "VMV-29C",
        "model": "1900",
        "color": "negro",
        "typeVehicle": "moto"
    },
    {
        "id": 2,
        "plate": "VMV-29C",
        "model": "1900",
        "color": "negro",
        "typeVehicle": "moto"
    },
    {
        "id": 5,
        "plate": "VMV-29C",
        "model": "1900",
        "color": "negro",
        "typeVehicle": "moto"
    },


];
const userData = {
    "documentUser": 1234,
    "name": "andrewadmin",
    "lastName": "ramirez",
    "phone": 1231214,
    "email": "rvandruzyzz@gmail.com",
    "role": "user",
    "municipalityId": {
        "id": 2,
        "name": "Puerto Nariño",
        "departmentId": 1
    }
}
const fieldsMapping = {
    "id": "ID",
    "plate": "Placa",
    "model": "Modelo",
    "color": "Color",
    "typeVehicle": "Tipo de Vehículo",
    "acciones": "Acciones"
};
const fields = ["id", "plate", "model", "color", "typeVehicle", "acciones"];


export default function MyVehicles() {
    // const [vehicles, setVehicles] = useState([]); 
    const [editingVehicle, setEditingVehicle] = useState(null);
    const { user } = useAuth;
    const { register, handleSubmit, formState: { errors },setValue, reset, getValues } = useForm();
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [loading, setLoading] = useState(false);   //cambiar a true despues cuando se implemente la consulta en tiempo real
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [update, Setupdate ] = useState(false);
    const [create, Setcreate ] = useState(false);
    const [userD, setUserD ] = useState([]);
    console.log(user);
    const onSubmit = handleSubmit (async (values) =>{
console.log(values);
// user.push(values);
    })
    // const onSubmitUpdate = handleSubmit (async (values) =>{
    //     const index = user.findIndex((vehicle) => vehicle.id === editingVehicle.id);
    //     if (index !== -1) {
    //         // Actualiza las propiedades del vehículo con los nuevos valores
    //         user[index] = { ...user[index], ...values };
            
        
    //         // Realiza otras acciones necesarias después de la actualización
        
    //         // Cierra el modal de edición
    //         handleModalUpdateClose();
    //       }
    //         })
    // const onSubmitDelete = handleSubmit ( async(id)=>{
    //    console.log(`vehiculo eliminado ${id}`);
        
    // })
    // const getVehicles = async () => {
    //     try {
    //     //   const res = await axios.get(URI);
    //     //   setVehicles(res.data);
    //       setLoading(false);
    //     } catch (error) {
    //       console.error('Error fetching Vehicles:', error);
    //       setLoading(false);
    //     }
    //   };
    const handleModalDelete = (id) => {
        setSelectedVehicleId(id);
        setIsModalDelete(true);
    };
    const closeModalDelete = () => {
        setSelectedVehicleId(null);
        setIsModalDelete(false);
    };
    /////////funcion para modal editar
    const handleModalUpdateOpen =(idV)=>{
        const vehicleToEdit = user.find((vehicle) => vehicle.id === idV);
        console.log('1', vehicleToEdit);
        setEditingVehicle(vehicleToEdit);
        Setupdate(true);
    }
    const handleModalUpdateClose =()=>{
        setEditingVehicle(null);
        Setupdate(false);
    }
    const handleModalUpdate = ()=>{
        const formValues = getValues();
        onSubmitUpdate(formValues);
        setEditingVehicle(null)
        Setupdate(false);

    }
    /////////funciones para modal crear
    const handleModalCreate =()=>{
        const formValues = getValues();
        onSubmit(formValues);
        Setcreate(false);
    }
    const handleModalCreateClose =()=>{
       reset(); 
       Setcreate(false);
        

    }
    const handleModalCreateOpen =()=>{
        Setcreate(true);
        reset();
        
    }
    ////////////////////////////
    const handleEliminarClick = (id) => {
        console.log(id);
        // onSubmitDelete(id)
        toast.success(`Vehiculo eliminado con ID ${id}`, { theme: "light" });
        closeModalDelete();
    };
    const handleOtroBotonClick = (id) => {
        // Lógica para manejar el otro botón con el ID proporcionado
        console.log(`Hacer algo con el vehículo con ID ${id}`);
    };
   
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
    // const getProfileUser = () => {
    //     Axios.get(`http://localhost:4000/api/users/profile-user`)
    //         .then((Response) => {
    //             setUserD(Response.data);
    //             console.log(Response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             throw error;
    //         });
    // };
    useEffect(() => {
        const fetchData = async () => {
            try {
                // getProfileUser();
                console.log(client);
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
                // Puedes manejar el error aquí, como mostrar un mensaje al usuario.
            }
        };

        // fetchData();
    }, []);
    return (
        <>
 <ModalUpdateVehicle
 onSubmit={handleModalUpdate} setValue={setValue}   reset={reset} editingVehicle={editingVehicle} handleSubmit={handleSubmit} isOpen={update} title={'Editar vehiculo'} message={'Modificacion'}
 register={register} errors={errors} buttons={[
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
 ]}/>
 <VehicleRegistrationModal  onSubmit={onsubmit} isOpen={create}
  title="Registrar vehiculo"
  setValue={setValue}
  message={"Ingrese datos del vehiculo"}
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
                        <strong>Nombre:</strong> {user.name}
                    </div>
                    <div>
                        <strong>Apellido:</strong> {user.lastName}
                    </div>
                    <div>
                        <strong>Correo:</strong> {user.email}
                    </div>
                    <div>
                        <strong>Cedula:</strong> {user.documentUser}
                    </div>
                    <div>
                        <strong>Telefono:</strong> {user.phone}
                    </div>

                    <div>
                        <strong>Municipio:</strong> {user.municipalityId.name}
                    </div>
                    <div className='col-span-2 text-center'>
                        <ButtonAction tipo={onclick} estilos={'w-1/3 h-10 font-bold bg-button-primary rounded-md'} text={'Actualizar'} />

                    </div>

                    {/* Agrega más detalles según sea necesario */}
                </div>


            </div>
            <div className='h-[20vh]'></div>
            <ToastContainer />
            <DivContent>
                <div className='mb-10 h-auto'>
                    {loading ? (
                        <Spinner /> // Display loader while loading
                    ) : (
                        <div>
                            {/* <DivContent className={styles}> */}
                            <h1 className="flex justify-center text-2xl font-bold mb-4">MIS VEHICULOS</h1>
                            <ButtonAction estilos={'flex w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4 w-auto justify-end'} text={'Añadir Vahiculo'} onClick={handleModalCreateOpen} />
                            <ContentTable fields={fields} data={user} fieldsMapping={fieldsMapping}
                                buttonActions={(id) => customButtons.map((button, index) => (<ButtonAction key={index} {...button} onClick={() => button.onClick(id)} />))}
                                stylesTable={stylesTable} stylesThead={stylesThead} stylesTbody={stylesTbody}
                                styleActions={styleActions} />
                            {/* </DivContent> */}

                            <ReusableModals
                                isOpen={isModalDelete}
                                onClose={closeModalDelete}
                                title="Eliminar vehiculo"
                                message={'¿Seguro que quiere eliminar el vehiculo?'}
                                buttons={[
                                    {
                                        text: 'Eliminar',
                                        onClick: () => handleEliminarClick(selectedVehicleId),
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
                    )}
                </div>
            </DivContent>
            <div>


            </div>






        </>
    )
}
