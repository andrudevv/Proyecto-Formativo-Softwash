import React from 'react'

export default function ModelRegister({enviar}) {
    
    return (
        <div id='modal-component-container' className='fixed inset-0'>
                        <div className='modal-flex-container flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                          <div className='modal-bg-container fixed inset-0 bg-gray-700 bg-opacity-75'></div>

                          <div className='modal-space-container hidden sm:inline-block sm:align-middle sm:h-screen'></div>

                          <div id='modal-container' className='modal-container inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full'>
                            <div className='modal-wrapper bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                              
                                

                                <div className='modal-content text-center mt-3 sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3 className='text-lg font-medium text-gray-900'>Realizar Pago</h3>
                    <div className='modal-text my-2 flex-col justify-center w-full'>
                      <p className='flex my-12 font-bold text-xl'>Total: 50.000$</p>
                      <button tipe="submit"   onClick={enviar} className='w-full bg-green-400 rounded-md '>Pagar</button>
                    </div>
                  
                </div>
              </div>
    
              <div className='modal-actions bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                {/* {buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => button.onClick && button.onClick()}
                    className={`${
                      index > 0 ? 'ml-3' : ''
                    } w-full inline-flex justify-center rounded-md border border-gray-300 shadow-md px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 sm:w-auto sm:text-sm ${button.styles}`}
                  >
                    {button.text}
                  </button>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      );
}



//FORMA DE USAR EN OTRO LADO QUE SE REQUIERA
{/* <CustomModal
  isOpen={isModalOpen}
  onClose={closeModal}
  title="Eliminar cita"
  message="¿Seguro que quieres eliminar la cita?"
  buttons={[
    {
      text: 'Eliminar',
      onClick: handleEliminarClick,
      styles: 'bg-red-500 hover:bg-red-700 text-white font-bold',
    },
    {
      text: 'Cancelar',
      onClick: closeModal,
      styles: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
    },
  ]}
/> */}