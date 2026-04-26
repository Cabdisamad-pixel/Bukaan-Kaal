import React from 'react'

const TableRow = ({patient}) => {
    return (
        <tr style={{ backgroundColor: patient.id % 2 === 0 ? 'transparent' : 'rgb(229 231 235 / var(--tw-bg-opacity, 1))' }} className='w-full flex justify-between p-2 text-xs '>
            <td className='basis-1/5'>{patient.id}</td>
            <td className='basis-1/5'>{patient.firstName} {patient.lastName}</td>
            <td className='basis-1/5'>{patient.mobileNumber}</td>
            <td className='basis-1/5'>{patient.email}</td>
            <td className='basis-1/12'>caafimaaday</td>
        </tr>
    )
}

export default TableRow