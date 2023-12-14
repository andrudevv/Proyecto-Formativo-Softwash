import React from 'react'
import img from '../img/success.png'
export default function ModelRegister({ isOpen, title }) {
  if (!isOpen) return null;
  return (
    <div id='modal-component-container' className='fixed z-10 inset-0'>
      <div className='modal-flex-container flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='modal-bg-container fixed inset-0 bg-gray-700 bg-opacity-75'></div>

        <div className='modal-space-container hidden sm:inline-block sm:align-middle sm:h-screen'></div>

        <div id='modal-container' className='modal-container inline-block align-bottom  bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-2/5'>
          <div className='modal-wrapper bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='modal-wrapper-flex  h-24 items-center flex justify-center  '>
              <div class="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
                <img src={img} alt="success" />

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