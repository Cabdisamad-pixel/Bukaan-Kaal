import React from 'react'

const Input = ({type,Width,placeHolder,register,height}) => {
  return (
    <div className='basis-4/5'>
        <input {...register} placeholder={placeHolder} style={{width:Width, height: height}} className=' h-21 bg-transparent text-gray-800  border-gray-700 rounded-lg border outline-none text-base p-3 font-mono ' type={type} />
    </div>
  )
}

export default Input