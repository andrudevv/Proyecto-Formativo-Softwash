import React from 'react'
import { Link } from 'react-router-dom';
// import BannerNotFound from './BannerNotFound';
export default function FilterLaundryCard({dataFind}) {

 
    return (
        <div className="grid grid-cols-1 gap-5 space-y-5  ">
          {dataFind.map((laundry) => (
            <BusinessCard key={laundry.id} laundry={laundry} />
          ))}
         
        </div>
      );
}
const BusinessCard = ({ laundry }) => {
    const { id, name, address, aperture, closing, phone, rutLaundry, Municipality } = laundry;
  
    return (
      <div className="w-full mx-auto bg-white-100 bg-opacity-20 p-4 rounded-xl overflow-hidden shadow-md">
        <div className="md:flex flex-col">
          <div className=" w-full flex justify-center ">
            <img
              className="h-52 w-full object-cover md:w-52"
              src="https://via.placeholder.com/150"
              alt="Business Image"
            />
          </div>
          <div className=" grid grid-cols-2 gap-5 pl-8 pr-8 text-center">
            
            <h2 className="text-lg col-span-2 font-semibold text-center">{name}</h2>
            <p className="mt-2 ">
              <strong>Nit:</strong> {rutLaundry}
            </p>
            <p className="mt-2">
              <strong>Direccion:</strong> {address}
            </p>
            <p className="mt-2">
              <strong>Abierto:</strong> {aperture}
            </p>
            <p>
              <strong>Cerrado:</strong> {closing}
            </p>
            <p>
              <strong>Telefono:</strong> {phone}
            </p>
            <p>
              <strong>Municipio:</strong> {Municipality.name}
            </p>
            <div className='flex justify-center items-center col-span-2'>
              <Link to={`/profile-laundry/${id}`} className=' w-full'>
            <button className='w-1/4  text-blue-700 border-solid border-2 transition delay-150 duration-300 ease-in-out hover:scale-110 border-blue-600 hover:bg-blue-700 rounded-xl hover:text-white '  >ver perfil</button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };