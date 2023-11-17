import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContentTable from '../../components/ContentTable'
import DivContent from '../../components/DivContent';
import Spinner from '../../components/SpinnerLoading';
import ButtonAction from '../../components/ButtonAction';
import ReusableModals from '../../components/ReusableModals';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const styles = 'justify-center items-center bg-gray-200';
const stylesTable = 'w-full bg-white-100> border border-gray-300';
const stylesThead = 'bg-gray-400';
const stylesTbody = 'bg-blue-200';
const styleActions = ' md:grid md:grid-flow-col md:auto-cols-max place-content-evenly sm:flex sm:space-y';
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
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [loading, setLoading] = useState(false);   //cambiar a true despues cuando se implemente la consulta en tiempo real
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    const openModal = (id) => {
        setSelectedVehicleId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedVehicleId(null);
        setIsModalOpen(false);
    };
    const handleEliminarClick = (id) => {
        toast.success(`Vehiculo eliminado con ID ${id}`, { theme: "light" });
        closeModal();
    };
    const handleOtroBotonClick = (id) => {
        // Lógica para manejar el otro botón con el ID proporcionado
        console.log(`Hacer algo con el vehículo con ID ${id}`);
    };
    const customButtons = [

        {
            text: "Editar",
            tipo: "button",
            onClick: handleOtroBotonClick,
            estilos: "bg-blue-500 hover:bg-blue-700 text-white font-bold h-auto py-1  px-2 rounded ",
        }, {
            text: "Eliminar",
            tipo: "button",
            onClick: openModal,
            estilos: "bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ",
        },
        // Agrega más botones según sea necesario
    ];
    return (
        <>

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
                {/* <img
        src={user.documentUser} // Asegúrate de tener una propiedad 'avatar' en tu objeto 'user'
        alt={user.name} // Asegúrate de tener una propiedad 'name' en tu objeto 'user'
        className="w-32 h-32 rounded-full mx-auto mb-4"
      /> */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{userData.name} {userData.lastName}</h2>


                {/* Otros detalles del perfil */}
                <div className="grid grid-cols-2 mt-10 gap-10">
                    <div>
                        <strong>Nombre:</strong> {userData.name}
                    </div>
                    <div>
                        <strong>Apellido:</strong> {userData.lastName}
                    </div>
                    <div>
                        <strong>Correo:</strong> {userData.email}
                    </div>
                    <div>
                        <strong>Cedula:</strong> {userData.documentUser}
                    </div>
                    <div>
                        <strong>Telefono:</strong> {userData.phone}
                    </div>

                    <div>
                        <strong>Municipio:</strong> {userData.municipalityId.name}
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
                            <ButtonAction estilos={'flex w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4 w-auto justify-end'} text={'Añadir Vahiculo'} tipo={onclick} />
                            <ContentTable fields={fields} data={user} fieldsMapping={fieldsMapping}
                                buttonActions={(id) => customButtons.map((button, index) => (<ButtonAction key={index} {...button} onClick={() => button.onClick(id)} />))}
                                stylesTable={stylesTable} stylesThead={stylesThead} stylesTbody={stylesTbody}
                                styleActions={styleActions} />
                            {/* </DivContent> */}

                            <ReusableModals
                                isOpen={isModalOpen}
                                onClose={closeModal}
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
                                        onClick: closeModal,
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
