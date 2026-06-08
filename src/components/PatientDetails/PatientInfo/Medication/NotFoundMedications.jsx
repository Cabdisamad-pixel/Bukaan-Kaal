import React from 'react'




const NotFoundMedications = ({ AddWeekHandler }) => {

  return (

    <>
        <div className=' w-full h-[22rem] flex flex-col justify-center items-center gap-6 '>
            <p className='text-gray-400 font-mono text-xl'>
                to see the medication details you should add weeks for this patient first.</p>

            <p className='text-gray-600 text-lg'>
                Not Found any Weeks for this patient.
            </p>

            <button onClick={AddWeekHandler} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Add Weeks
            </button>
        </div>
    </>

  )
}

export default NotFoundMedications