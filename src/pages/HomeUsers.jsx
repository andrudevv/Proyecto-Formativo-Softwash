import React, { useState } from "react";
import {BsChevronCompactLeft,BsChevronCompactRight} from 'react-icons/bs'
import imgtitulo from "../img/TituloWash2.png"
import imgCorte from '../img/corteWash.png'
function HomeUsers() {
  const callouts = [
    {
      name: "AQUA AUTO SPA",
      description: "Mas informacion del lavadero",
      imageSrc:
        "https://lh3.googleusercontent.com/p/AF1QipPWG93UR7NU00fXlkQuw_1p3RYGcsxkElLtZMLp=s680-w680-h510",
      imageAlt:
        "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
      href: "#",
    },
    {
      name: "FERRAUTOS CAR WASH",
      description: "Mas informacion del lavadero",
      imageSrc:
        "https://lh3.googleusercontent.com/p/AF1QipN_xuonldwrrJ6fKVDcDdhbxIoTBGqPl60B7LDd=s680-w680-h510",
      imageAlt:
        "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
      href: "#",
    },
    {
      name: "PRONTO WASH",
      description: "Mas informacion del lavadero",
      imageSrc:
        "https://elportaldelquindio.com/imgupload/74PRG1_PRONTOWASH-01.jpg",
      imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
      href: "#",
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
          <div className="w-auto ">
        <div >
        <img  className=" h-full object-cover" src={imgtitulo} alt="titulo"/>
        </div>
        
      
            <p className="text-2xl font-Pathway Gothic One text-white text-center bg-blue-700 border-blue-700  p-8">
              Creamos soluciones innovadoras para simplificar la vida de los
              propietarios de vehículos y mejorar la industria de los lavaderos
              de autos en la ciudad de Armenia. Nuestra principal actividad es
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
              <div style={{backgroundImage: `url(${callouts[currentIndex].imageSrc})`}} className="w-full h-full rounded-2xl bg-center bg-cover duration-500"></div>
              {/* flecha derecha */}
              <div className="absolute hidden group-hover:block  top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <BsChevronCompactLeft onClick={prevSlide} size={30}/>
              </div>
             
              {/* flecha izquierda */}
               <div className="absolute hidden group-hover:block  top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <BsChevronCompactRight onClick={nextSlide} size={30}/>
              </div>
            </div>
            

          </div>
        </div>
      </div>

      
      <img  className="w-full h-full object-cover mt-20" src={imgCorte} alt="corte"/>
      
    </div>
  
    </>
  );
}

export default HomeUsers;