import React from 'react'

export default function ContentTable({fields , fieldsMapping, data,buttonActions,stylesTable,stylesThead,stylesTbody, styleActions}) {
    return (
        <table className={`mt-4 ${stylesTable}`}>
            <thead className={`${stylesThead} hidden md:table-header-group`} >
                <tr className='text-center'>
                    {fields.map((field) => (
                        <th key={field} scope="col" className='p-2'>{fieldsMapping[field] || field}</th>
                    ))}
                </tr>
            </thead>
            <tbody className={stylesTbody}>
                {data.map((row,index)=>(
                    <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}>
                    {fields.map((field,subIndex) => (
                        <td key={subIndex} className={`text-center p-2 ${field === 'acciones' ? styleActions : ''}`}>
                           {field === 'acciones' ? buttonActions(row['id']) : row[field]}
                        </td>
                    ))}
                </tr>
                ))}
                
            </tbody>
        </table>
    )
}