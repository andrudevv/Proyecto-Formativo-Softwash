
import React, { useState } from "react";
import {BsChevronCompactLeft,BsChevronCompactRight} from 'react-icons/bs'
import imgtitulo from "../../img/TituloWash2.png"
export default function HomeUser() {

    const callouts = [
        {
          name: "AQUA AUTO SPA",
          description: "Mas informacion del lavadero",
          imageSrc:
            "https://lh3.googleusercontent.com/p/AF1QipPWG93UR7NU00fXlkQuw_1p3RYGcsxkElLtZMLp=s680-w680-h510",
          imageAlt:
            "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
          href: "#",
          abierto: '06:00 a.m.',
          cerrado: '05:00 p.m.',
          telefono: '3245345466',
          municipio: 'Calarca'
        },
        {
          name: "FERRAUTOS CAR WASH",
          description: "Mas informacion del lavadero",
          imageSrc:
            "https://lh3.googleusercontent.com/p/AF1QipN_xuonldwrrJ6fKVDcDdhbxIoTBGqPl60B7LDd=s680-w680-h510",
          imageAlt:
            "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
          href: "#",
          abierto: '06:00 a.m.',
          cerrado: '05:00 p.m.',
          telefono: '3125345466',
          municipio: 'Tebaida'
        },
        {
          name: "PRONTO WASH",
          description: "Mas informacion del lavadero",
          imageSrc:
            "https://elportaldelquindio.com/imgupload/74PRG1_PRONTOWASH-01.jpg",
          imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
          href: "#",
          abierto: '06:00 a.m.',
          cerrado: '05:00 p.m.',
          telefono: '3235345466',
          municipio: 'Armenia'
        },
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0)
    
      const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? callouts.length - 1 : currentIndex -1;
        setCurrentIndex(newIndex);
      }
    
      const nextSlide = () => {
       const isLastSlide = currentIndex === callouts.length -1;
       const newIndex = isLastSlide ? 0 : currentIndex +1
       setCurrentIndex(newIndex)
      }
  return (
    <>
    <div className="items-center justify-start min-h-screen ">
    
    <div className="items-center justify-start">  
      <div className="max-h-2xl rounded-md ">
        <div className="w-auto -mx-24">
      <div>
      <img  className=" h-full object-cover" src={imgtitulo} alt="titulo"/>
      </div>

    
          <p className="text-2xl font-Pathway Gothic One text-white text-center bg-blue-700 border-blue-700  p-8">
            Creamos soluciones innovadoras para simplificar la vida de los
            propietarios de vehículos y mejorar la industria de los lavaderos
            de autos en la cuidad de Armenia. Nuestra principal actividad es
            proporcionar un software de reservas de lavado de autos que
            revoluciona la forma en que las personas mantienen sus vehículos
            en perfecto estado.
          </p>
        </div>

        <div className="">
          <h2 className="text-4xl font-Pathway Gothic One text-black text-center  mt-5">
            Conoce lavaderos cercanos
          </h2>



          <div className="max-w-[1400px] h-[600px] w-full m-auto py-16 px-4 relative group">
            <div  className="w-full h-full rounded-2xl flex items-center justify-center shadow-md shadow-gray-500 border-blue-100 border-2 bg-gray-100 duration-500">
        <div className="grid grid-cols-1  text-center ">
            <div className="flex justify-center ">
            <img src={callouts[currentIndex].imageSrc} alt="" className="h-[250px] w-[300px] rounded-xl"/>

            </div>
            <h2 className="flex justify-center">{callouts[currentIndex].name}</h2>
            <button className="flex justify-center bg-blue-200 hover:bg-blue-400 rounded-md">{callouts[currentIndex].description}</button>
            <span>Abierto: {callouts[currentIndex].abierto}</span>
            <span>Cerrado: {callouts[currentIndex].cerrado}</span>
            <span>Teléfono: {callouts[currentIndex].telefono}</span>
            <span>Municipio: {callouts[currentIndex].municipio}</span>
            
        </div>

            </div>
            {/* flecha derecha */}
            <div className="absolute hidden group-hover:block  top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-blue-400 text-black cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30}/>
            </div>
           
            {/* flecha izquierda */}
             <div className="absolute hidden group-hover:block  top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-blue-400 text-black cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30}/>
            </div>
          </div>
    


        </div>
      </div>
    </div>

    
    <div className="p-4  bg-blue-900">
      <h2 className="text-3xl font-Pathway Gothic One text-color text-center">
        ¿Qué puedes hacer en nuestra página?
      </h2>
      <p className="text-2xl font-Pathway Gothic One text-color text-center bg-blue-900 border-blue-900  p-8">
        <br />
        <br />
        Podrás apartar la cita en el lavadero de su preferencia y en la
        disponibilidad deseada según lo disponga el lavadero.
        <br />
        Encontrarás múltiples servicios para cada tipo de vehículo según así
        lo brinde el lavadero.
        <br />
        Seguro y confiable al realizar las citas.
        <br />
        Tendrás la ubicación real del lavadero deseado.
      </p>
      
    </div>
  </div>

  </>
  )
}




