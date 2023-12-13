import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/UserContext'
import { useForm } from 'react-hook-form';
import FormSearch from '../../components/User/FormSearch';
import FilterLaundryCard from '../../components/User/FilterLaundryCard';
import NavPagination from '../../components/NavPagination';
export default function FindLaundry() {
    const [notFound, setNotFound] = useState(null);
    const [filterLaundry, setFilterLaundry] = useState([]);
    const [styleOnMax, setStyleOnMax] = useState('flex');
    const [page, setPage] = useState(0);

    const { registerErrors, searchLaundry } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmitSearch = handleSubmit(async (query) => {
        const filteredQuery = Object.fromEntries(
            Object.entries(query).filter(([key, value]) => value !== '')
        );
        const findLaundry = {
            ...filteredQuery,
            offset: page
        }
        const responseLaundry = await searchLaundry(findLaundry)
        if(responseLaundry.length < 5){
            setStyleOnMax('hidden')
        }else{
            setStyleOnMax('flex')
        }
        if (responseLaundry.length === 0) {
            setNotFound('no se encontraron resultados');

        }
        setFilterLaundry(responseLaundry);

    })
   
    useEffect(() => {
        if(page > 0){

            onSubmitSearch()
        }
        window.scrollTo(0, 0);
        
      }, [page, styleOnMax]);
    return (
        <div>
            <section className='w-full ' >
                <FormSearch onSubmit={onSubmitSearch} registerErrors={registerErrors} errors={errors} register={register} />
            </section>

            <section className='w-full   rounded-xl mt-24 h-auto pb-4 bg-blue-300 bg-opacity-5 mb-10'>

                {notFound == null ?
                    <>
                        <FilterLaundryCard dataFind={filterLaundry} />
                        <div className='w-full flex justify-center mt-8'>
                            <NavPagination styles={'flex justify-center '}   styleOnMax={styleOnMax} page={page} setPage={setPage} />
                        </div>
                    </> :
                    <h1>{notFound}</h1>}
            </section>

        </div>
    )
}
