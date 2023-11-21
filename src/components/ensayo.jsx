import React from 'react'
import VehicleRegistrationModal from './ModalRegisterVehicle'

export default function () {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [plate, setPlate] = useState('');
    const [model, setModel] = useState(0);
    const [color, setColor] = useState('');
    const [typeVehicle, setTypeVehicle] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleRegistrarClick = () => {
        // Lógica para manejar el clic en el botón de registrar
        // Puedes enviar los datos a tu servidor, realizar validaciones, etc.
        console.log('Registrar clic');
    }
        return (
            <div>

                <VehicleRegistrationModal isOpen={isModalOpen}
                    onClose={closeModal}
                    title='Registrar Vehículo'
                    message='Complete los campos para registrar su vehículo.'
                    buttons={[
                        {
                            text: 'Registrar',
                            onClick: handleRegistrarClick,
                            styles: 'bg-blue-500 hover:bg-blue-700 text-white font-bold',
                        },
                        {
                            text: 'Cancelar',
                            onClick: closeModal,
                            styles: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
                        },
                    ]}
                    plate={plate}
                    model={model}
                    color={color}
                    typeVehicle={typeVehicle}
                    onPlateChange={setPlate}
                    onModelChange={setModel}
                    onColorChange={setColor}
                    onTypeVehicleChange={setTypeVehicle} />
            </div>
        )
    }
