import React from 'react'

export default function ContentTableAppointment({fields , fieldsMapping, data,buttonActions,stylesTable,stylesThead,stylesTbody, styleActions}) {
    return (
        <table className={`mt-4 ${stylesTable}`}>
            <thead className={`${stylesThead}  sm:table-header-group`} >
                <tr className='text-center border border-solid border-black'>
                    {fields.map((field) => (
                        <th key={field} scope="col" className='p-2'>{fieldsMapping[field] || field}</th>
                    ))}
                </tr>
            </thead>
            <tbody className={stylesTbody}>
                {data.map((row,index)=>(
                    <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white ' }>
                    {fields.map((field,subIndex) => (
                        <td key={subIndex}  className={`text-center  max-w-xl break-all border-collapse border table-cell  border-black p-2 ${field === 'acciones' ? styleActions : ''}`}>
                           {field === 'acciones' ? buttonActions(row['id']) : (field.includes('.') ? row[field.split('.')[0]][field.split('.')[1]] : row[field])}
                        </td>
                    ))}
                </tr>
                ))}
                
            </tbody>
        </table>
    )
}
