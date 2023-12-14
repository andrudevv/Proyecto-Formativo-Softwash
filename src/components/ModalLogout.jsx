import React from 'react'

export default function ModalLogout({isOpen}) {

    if (!isOpen) return null;
  return (
    <div id='modal-component-container' className='fixed z-10 inset-0'>
    <div className='modal-flex-container flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='modal-bg-container fixed inset-0 bg-gray-700 bg-opacity-75'></div>

        <div className='modal-space-container hidden sm:inline-block sm:align-middle sm:h-screen'></div>

        <div

            className=' inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:my-8 sm:align-middle sm:max-lg p-6 '
        >
            <div className='modal-wrapper bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='modal-wrapper-flex sm:flex flex justify-center sm:items-start'>


                    <div className='modal-content text-center mt-3 sm:mt-0 sm:ml-4 sm:text-left'>
                        <h3 className='text-lg font-medium text-center text-gray-900 mb-4'>¡Gracias por utilizar nuestro servicio!</h3>
                        <h3 className='text-lg font-medium text-center text-gray-900'>Esperamos verte de nuevo pronto.</h3>
                       

                    </div>
                </div>
            </div>

           
        </div>
    </div>
</div>
  )
}
