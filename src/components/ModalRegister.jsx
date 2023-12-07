import React from 'react'

export default function ModelRegister({isOpen,title}) {
  if (!isOpen) return null;
  return (
    <div id='modal-component-container' className='fixed z-10 inset-0'>
      <div className='modal-flex-container flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='modal-bg-container fixed inset-0 bg-gray-700 bg-opacity-75'></div>

        <div className='modal-space-container hidden sm:inline-block sm:align-middle sm:h-screen'></div>

        <div id='modal-container' className='modal-container inline-block align-bottom  bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-1/4'>
          <div className='modal-wrapper bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='modal-wrapper-flex  h-24 items-center flex justify-center  '>
              <div className='modal-icon mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10'>
                <svg
                  className='w-6 h-6 text-green-600'
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"

                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>

              <div className='modal-content text-center mt-3 sm:mt-0 sm:ml-4 sm:text-left'>
               
                <div className='modal-text my-2'>
                <h3 className='text-2xl font-medium text-center flex justify-center text-gray-900'>{title}</h3>
                </div>
              </div>
            </div>
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