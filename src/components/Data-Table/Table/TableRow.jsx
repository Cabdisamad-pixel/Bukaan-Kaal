import React from 'react'

const TableRow = ({patient}) => {
    return (
        <tr style={{ backgroundColor: patient.id % 2 === 0 ? 'transparent' : 'rgb(229 231 235 / var(--tw-bg-opacity, 1))' }} className='w-full flex justify-between p-2 text-xs '>
            <td className='basis-1/5'>{patient.id}</td>
            <td className='basis-1/5'>{patient.name}</td>
            <td className='basis-1/5'>{patient.mobilePhone}</td>
            <td className='basis-1/5'>{patient.email}@gmail.com</td>
            <td className='basis-1/12'>{patient.status}</td>
        </tr>
    )
}

export default TableRow