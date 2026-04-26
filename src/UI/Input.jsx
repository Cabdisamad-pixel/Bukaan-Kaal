import React from 'react'

const Input = ({type,Width,placeHolder,register}) => {
  return (
    <div className='basis-4/5'>
        <input {...register} placeholder={placeHolder} style={{width:Width}} className=' h-9 bg-transparent text-gray-800  border-gray-500 rounded border outline-none text-base p-3 font-roboto ' type={type} />
    </div>
  )
}

export default Input