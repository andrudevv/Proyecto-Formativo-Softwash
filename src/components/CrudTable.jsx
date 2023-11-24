import { useState } from 'react';
import ContentTable from './ContentTable'
import DivContent from './DivContent';
import Spinner from './SpinnerLoading';
import ButtonAction from './ButtonAction';
import ReusableModals from './ReusableModals';
// const styles = 'justify-center items-center bg-gray-200';
const stylesTable = 'bg-gray-200 w-full';
const stylesThead = 'bg-red-100';
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
    }
];
const fieldsMapping = {
    "id": "ID",
    "plate": "Placa",
    "model": "Modelo",
    "color": "Color",
    "typeVehicle": "Tipo de Vehículo",
    "acciones": "Acciones"
  };
const fields = ["id", "plate", "model", "color", "typeVehicle", "acciones"];


export default function CrudTable() {
 
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [loading, setLoading] = useState(false);   //cambiar a true despues cuando se implemente la consulta en tiempo real
    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = (id) => {
        setSelectedVehicleId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedVehicleId(null);
        setIsModalOpen(false);
    };
    const handleEliminarClick = (id) => {
        // Lógica para manejar la eliminación del vehículo con el ID proporcionado
        console.log(`Eliminar vehículo con ID ${id}`);
        closeModal();
    };
    const handleOtroBotonClick = (id) => {
        // Lógica para manejar el otro botón con el ID proporcionado
        console.log(`Hacer algo con el vehículo con ID ${id}`);
    };
    const customButtons = [
        {
            text: "Eliminar",
            tipo: "button",
            estilos: "flex bg-red-100 text-white w-full h-auto",
            onClick: openModal,
        },
        {
            text: "Editar",
            tipo: "button",
            estilos: "flex bg-blue-100 text-white w-full h-auto",
            onClick: handleOtroBotonClick,
        },
        // Agrega más botones según sea necesario
    ];
    return (
        <>

        <div className='h-[20vh]'></div>

        <DivContent> 
             <div>
                {loading ? (
                    <Spinner /> // Display loader while loading
                ) : (
                    <div>
                        {/* <DivContent className={styles}> */}
                        <h1 className="flex justify-center text-2xl font-bold mb-4">mis vehiculos</h1>
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
                              onClick: ()=> handleEliminarClick(selectedVehicleId),
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
