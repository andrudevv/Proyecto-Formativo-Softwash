import React,{useState,useEffect} from 'react'
import Axios from '../../services/axios';
import ModalError from '../ModalError';
export default function FormSearch({
    registerErrors,
    onSubmit,
    register,

}) {

    const [departments, setDepartments] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const getMunicipalities = (id) => {
        Axios.get(`http://localhost:4000/api/users/get-municipality/${id}`)
            .then((Response) => {
                setMunicipalities(Response.data);
            })
            .catch((error) => {
                console.log(error)
                throw error;
            });
    };
    const getDepartment = () => {
        Axios.get(`http://localhost:4000/api/users/getDepartments`)
            .then((Response) => {
                setDepartments(Response.data);
            })
            .catch((error) => {
                console.log(error)
                throw error;
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                getDepartment();

            } catch (error) {
                console.log(error);
                console.error('Error al obtener datos del usuario:', error);

            }
        };
        fetchData();
    }, []);
    return (
        <div>
             {registerErrors.map((error, i) => (
            <ModalError isOpen={registerErrors} message={error} key={i} 
            />))}
            <form onSubmit={onSubmit} className=" w-full mt-4 ">
                
                <h2 className="text-2xl font-semibold mb-6  text-center">Filtro de busqueda</h2>
                <div className='flex  place-content-around border border-gray-700 rounded-xl py-4'>
               

                <div className="w-1/4 text-center">
                    <label className="w-full  font-semibold text-black  pr-2 rounded-md">Departamento </label>
                    <select  {...register('department')} 
                        className="font-Pathway Gothic One w-full  p-2 bg-white rounded-md border border-gray-300 focus:ring"
                        placeholder="Departamento"
                        onChange={(e) => getMunicipalities(e.target.value)}
                    >
                        <option value=""> Departamento</option>
                        {departments.map((city) => (
                            <option
                                key={city.id}
                                value={city.id}
                                
                            >

                                {city.name}
                            </option>
                        ))}
                        ))
                    </select>
                </div> 
                <div className=" w-1/4 text-center">
                    <label className="  font-semibold text-black pr-2 rounded-md">Municipio </label>
                    <select {...register('municipality')} className="font-Pathway Gothic One w-full  p-2 w- bg-white rounded-md border border-gray-300 focus:ring" placeholder="Municipio">
                        <option value="" >Municipio</option>
                        {municipalities.map((department) => (
                            <option
                                key={department.id}
                                value={department.id}
                                
                            >

                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='w-1/4 text-center'>
                <label className="w-full  font-semibold text-black pr-2 rounded-md">Tipo de vehiculo </label>

                    <select  {...register('typeVehicles')}
                        className="font-Pathway Gothic One w-full  p-2 bg-white rounded-md border border-gray-300 focus:ring"
                        placeholder="Tipo de vehiculo">
                        <option value="">tipo de vehiculo</option>
                            <option value="carro" >carro</option>
                            <option value="moto" >moto</option>
                    </select>
                </div>





                <button type="submit" className="bg-button-primary text-black font-semibold transition delay-150 duration-300 ease-in-out hover:scale-110  rounded hover:bg-blue-400  w-[10%]">Buscar</button>
                
                </div>


            </form>
        </div>
    )
}
