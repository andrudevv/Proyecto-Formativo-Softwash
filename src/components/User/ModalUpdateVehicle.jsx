import React,{ useEffect } from "react";


export default function ModalUpdateVehicle({
    errors,
    onSubmit,
  isOpen,
  title,
  
  buttons,
  register,
  handleSubmit,
  editingVehicle,
  setValue, reset
}) {
    useEffect(() => {
        if (editingVehicle) {
          // Establece los valores iniciales del formulario con los datos del vehículo que se está editando
          Object.keys(editingVehicle).forEach((key) => {
            setValue(key, editingVehicle[key]);
          });
        } else {
          // Si no hay un vehículo en edición, simplemente resetea el formulario
          reset();
        }
      }, [editingVehicle, setValue, reset]);


    if (!isOpen) return null;
  return (
    <div id='modal-component-container' className='fixed z-10 inset-0'>
      <div className='modal-flex-container flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='modal-bg-container fixed inset-0 bg-gray-700 bg-opacity-75'></div>

        <div className='modal-space-container hidden sm:inline-block sm:align-middle sm:h-screen'></div>

        <div
          id='modal-container'
          className='modal-container  inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full'
        >
          <div className='modal-wrapper bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='modal-wrapper-flex sm:flex flex justify-center sm:items-start'>
              

              <div className='modal-content text-center mt-3 sm:mt-0 sm:ml-4 sm:text-left'>
                <h3 className='text-lg font-medium text-center mb-10 text-gray-900'>{title}</h3>
                <div className='modal-text my-2'>
                  
                </div>
                <form onSubmit={handleSubmit((values) => onSubmit(values, editingVehicle))}>
                {/* Agregar campos de registro de vehículo */}
                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-700'>Placa</label>
                  <input type="text" {...register('plate', { required: true,pattern:/^[A-Z]{3}-\d{2}[A-Z\d]?$/ })} maxLength={7} minLength={6} 
           className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="ABC-123(carro)  / ABC-12A(moto)" />
                    {errors.plate && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                </div>

                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-700'>Modelo</label>
                  <input type="number" {...register('model', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="2000" />
                    {errors.model && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                </div>

                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-700'>Color</label>
                  <input type="text" {...register('color', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="Azul" />
                    {errors.color && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                </div>

                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-700'>Tipo de Vehículo</label>
                  <input type="text" {...register('typeVehicle', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="carro / moto" />
                    {errors.typeVehicle && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                </div>
                {/* Fin de campos de registro de vehículo */}
                </form>
              </div>
            </div>
          </div>

          <div className='modal-actions bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => button.onClick && button.onClick()}
                className={`${
                  index > 0 ? 'ml-3' : ''
                }  w-full justify-center rounded-md border shadow-md px-4 py-2  sm:w-auto sm:text-sm ${button.estilos}`}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
