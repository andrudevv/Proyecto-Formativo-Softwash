import React, { useEffect, useState } from 'react'
import ButtonAction from '../ButtonAction'
import Spinner from '../SpinnerLoading'
// import ruta from '../../../Formativo_Backend/uploads';
// 
export default function DataProfileClient({ client, onClick, onclickImg,fileInputRef, handleFileChange}) {
  const [loading, setLoading] = useState(true);
  const [clientD, setClientD] = useState(false);
  const [hourClosing, setHourClosing] = useState('');
  const [ hourOpen, setHourOpent] = useState('')
{/* <div className=" md:flex-shrink-0">
                    <img
                        className="h-52 w-full object-cover md:w-52"
                        src="https://via.placeholder.com/150"
                        alt="Business Image"
                    />
                </div> */}
const img = clientD.imageUrl ? `http://localhost:4000/api/client/${clientD.imageUrl}` : `https://via.placeholder.com/150`  ;
const handleHourClosing = (e)=>{
  ;
  const date = new Date(`2000-01-01 ${e}`);
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  setHourClosing(`${formattedTime}`)
}
const handleHourOpen = (e)=>{
  ;
  const date = new Date(`2000-01-01 ${e}`);
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  setHourOpent(`${formattedTime}`)
}
  useEffect(() => {
    if (client) {
      setClientD(client);
      handleHourClosing(clientD.closing)
      handleHourOpen(clientD.aperture)
      setLoading(false);
    }

  }, [client])

  if (loading) {
    return <Spinner />;
  }



  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
      <div className="grid grid-cols-2  gap-10">
        <div className='w-full grid  justify-center col-span-2'>
          <img src={clientD.imageUrl ? `http://localhost:4000/api/client/${clientD.imageUrl}` : `https://via.placeholder.com/200`} alt="img" className="rounded-md w-[250px] h-[250px] col-span-1  shadow-lg shadow-black"/>
          <button onClick={onclickImg} className=' mt-8 shadow-sm shadow-black font-semibold w-auto hover:opacity-100 rounded-md transition-opacity m-4 ease-in-out duration-300 hover:bg-blue-400 hover:text-white'> Cambiar foto</button>
          <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
        </div>
        <div>
          <strong>Nit</strong> {clientD.rutLaundry}
        </div>
        <div>
          <strong>Nombre:</strong> {clientD.name}
        </div>
        <div>
          <strong>Direccion:</strong> {clientD.address}
        </div>
        <div>
          <strong>Correo:</strong> {clientD.email}
        </div>
        <div>
          <strong>Teléfono:</strong> {clientD.phone}
        </div>
        <div>
          <strong>Capacidad:</strong> {clientD.ability}
        </div>
        <div>
          <strong>Hora Apertura:</strong> {hourOpen}
        </div>
        <div>
          <strong>Hora Cierre:</strong> {hourClosing}
        </div>
        <div>
          <strong>Municipio:</strong> {clientD.municipalityId.name}
        </div>
        <div className='col-span-2 text-center'>
          <ButtonAction onClick={onClick} estilos={'w-1/3 h-10 font-bold bg-button-primary rounded-md'} text={'Actualizar'} />
        </div>
      </div>
    </div>
  )
}
