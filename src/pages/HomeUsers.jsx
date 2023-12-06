import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Footer from "../components/Footer";
// import img from "../img/publicidad.jpg"

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

  return (
    <>
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="flex flex-col items-center justify-start">
        <div className="max-h-2xl rounded-mdmy-4 mx-20  ">
          <div className="mx-auto max-w-3xl py-4 sm:py-8 lg:max-w-none px-4">
            <h1 className="text-3xl font-Pathway Gothic One bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300 hover:text-blue-500 text-center mt-2 mb-6">
              BIENVENIDO
            </h1>
        {/* <img src={imagepubli} alt="" className="w-10 h-10" /> */}
            <p className="text-2xl font-Pathway Gothic One text-gray-700 text-center">
              Creamos soluciones innovadoras para simplificar la vida de los
              propietarios de vehículos y mejorar la industria de los lavaderos
              de autos en la cuidad de Armenia. Nuestra principal actividad es
              proporcionar un software de reservas de lavado de autos que
              revoluciona la forma en que las personas mantienen sus vehículos
              en perfecto estado.
            </p>
          </div>

          <div className="">
            <h2 className="text-4xl font-Pathway Gothic One text-gray-900 text-center mb-0">
              Conoce lavaderos cercanos
            </h2>

            <div className="max-w-screen-2xl mt-0 space-y-8 p-8  lg:grid lg:grid-cols-3 lg:gap-2 lg:space-y-0 ">
              {callouts.map((callout) => (
                <div
                  key={callout.name}
                  className="flex flex-col items-center justify-between border border-gray-300 rounded-lg p-6 bg-violet-50 hover:bg-blue-100 max-w-xs mx-auto"
                >
                  <div className="relative h-72 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-4 text-base text-gray-700">
                    <a
                      href={callout.href}
                      className="no-underline hover:underline"
                    >
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-Pathway Gothic One text-gray-900">
                    {callout.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4  bg-violet-50 hover:bg-blue-50 mb-4">
        <h2 className="text-3xl font-Pathway Gothic One text-gray-700 text-center">
          ¿Qué puedes hacer en nuestra página?
        </h2>
        <h3 className="text-2xl font-Pathway Gothic One text-gray-600 text-center">
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
        </h3>
      </div>
      <div className="max-w-screen-2xl mt-0 space-y-8 p-8 mx-auto">
        <div className="border border-zinc-400 p-4 mb-8">
          <button>
            <a href="https://web.facebook.com/?locale=es_LA&_rdc=1&_rdr">
              Conoce nuestras redes sociales
            </a>
          </button>
        </div>
      </div>
     
    </div>
  
    </>
  );
}

export default HomeUsers;