import React,{ useEffect } from "react";


export default function ModalUpdateService({
    errors,
    onSubmit,
  isOpen,
  title,
  buttons,
  register,
  handleSubmit,
  editingService,
  setValue, reset

}) {

  const handlePrice = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    if (inputValue === '') {
      return e.target.value = 0
    }
    if (!isNaN(inputValue)) {
      const numericValue = parseInt(inputValue, 10);
      const cop = new Intl.NumberFormat().format(numericValue)

      return e.target.value = `${cop}`;
    } else {
      return e.target.value = 0;
    }
  };
    useEffect(() => {
        if (editingService) {
          
          Object.keys(editingService).forEach((key) => {
            setValue(key, editingService[key]);
          });
        } else {
         
          reset();
        }
      }, [editingService, setValue, reset]);


    if (!isOpen) return null;
  return (
    <div  className='fixed z-10 inset-0'>
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
                <form onSubmit={handleSubmit((values) => onSubmit(values, editingService))}>
                {/* Agregar campos de registro de vehículo */}
                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-700'>Nombre</label>
                  <input type="text" {...register('name', { required: true})}  
           className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="lavado completo" />
                    {errors.name && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                </div>

                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-700'>Duracion</label>
                  <input type="text" {...register('duration', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="30 minutos" />
                    {errors.duration && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                </div>

                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-700'>Descripcion</label>
                  <input type="text" {...register('description', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="lavado rapido" />
                    {errors.description && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                </div>

                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-700'>Precio</label>
                  <input type="text" {...register('price', { required: true })} onChange={handlePrice} className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="25000" />
                    {errors.price && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                </div>
                <div className='flex flex-col'>
                  <label className='font-semibold text-gray-700'>Tipo de Vehículo</label>
                  <input type="text" {...register('typeVehicles', { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" placeholder="carro" />
                    {errors.typeVehicles && (
                      <p className="absolute right-0 top-0  text-red-500">&#9888;requerido</p>
                    )}
                </div>
                {/* Fin de campos de registro de vehículo */}
                </form>
              </div>
            </div>
          </div>

          <div className='modal-actions bg-gray-50 px-4 py-3  justify-center  sm:px-6 sm:flex sm:flex-row-reverse'>
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => button.onClick && button.onClick()}
                className={`${
                  index > 0 ? 'ml-3' : ''
                } w-full justify-center rounded-md border shadow-md px-4 py-2  sm:w-auto sm:text-sm ${button.estilos}`}
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
