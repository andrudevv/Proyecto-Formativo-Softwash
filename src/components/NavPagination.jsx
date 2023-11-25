import React from 'react'

export default function NavPagination({
  styles, page,setPage, styleOnMax }) 
  {

   

    let styleHidden= 'flex'
    function nextPage () {
      setPage(page + 1);
      
    };
  
    function previous (){
      setPage(page - 1);
    };
    if (page === 0) {
      styleHidden = 'hidden';
    } 
    
  return (
    <div className={styles} >
      <nav >
        <ul className="inline-flex -space-x-px text-sm ">
          <li>
            <button onClick={previous} className={`${styleHidden} items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>atras</button>
          </li>
          <li>
            <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{page}</a>
          </li>
          <li>
            <button onClick={nextPage} className={`${styleOnMax}  items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>siguiente</button>
          </li>

        </ul>
      </nav></div>
  )
}
