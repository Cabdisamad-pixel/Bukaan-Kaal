import React from 'react'



const Category = ({ id, name, icon }) => {


  // const 

  return (


    
      <div style={{color:'#15A9E3', fontSize:'1rem'}} className='group flex justify-center items-center gap-3  rounded-md p-1 cursor-pointer hover:bg-sky-300 p-3 transition-all duration-300 ease-in-out'>
        {icon} 
        <span  className='font-mono text-gray-500 group-hover:text-gray-50 '>{name}</span>
      </div>

  )
}

export default Category