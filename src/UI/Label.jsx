import React from 'react'

const Label = ({text}) => {
  return (
    <div className='basis-[25%] '>
        <label className='text-gray-700 text-base font-mono ' htmlFor="">{text}</label>
    </div>
  )
}

export default Label