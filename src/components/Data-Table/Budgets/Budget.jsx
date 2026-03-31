import React from 'react'
import { MdKeyboardArrowDown } from "react-icons/md"

const Budget = () => {

    const budgets = [
        {
            name: 'totol budget',
            budget: '85,125.00',
            color : 'text-gray-500'
        },
        {
            name: 'monthly budget',
            budget: '85,125.00',
            color : 'bg-indigo-700'
        },
        {
            name: 'weekly budget',
            budget: '85,125.00',
            color : 'text-gray-500'
        },
        {
            name: 'today,s budget',
            budget: '85,125.00',
            color : 'text-gray-500'
        },

    ]

    return (
        <div className='flex p-5 w-full gap-8'>
            {budgets.map((budget) => {
                return <div style={{backgroundColor : budget.color}} className='border w-56 h-28 flex flex-col p-3 gap-2 rounded-md bg-gray-200'>
                    <div className='flex gap-4 justify-start items-center capitalize'>
                        <span className='text-gr'>{budget.name}</span>
                        <MdKeyboardArrowDown className='font-bold text-red-600 text-3xl' />
                    </div>
                    <h1 className='text-2xl font-medium text-gray-500'> ${budget.budget}</h1>
                </div>
            })}

        </div>
    )
}

export default Budget