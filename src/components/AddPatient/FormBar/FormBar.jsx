import React from 'react'

const FormBar = ({ bar }) => {

    const Height = bar === 1 ? '0%' : bar === 2 ? '50%' : '99%'

    return (
        <div className=' w-3 rounded h-[97%] flex flex-col justify-between ml-6  relative border border-gray-300'>
            <div style={{height:Height, backgroundColor:'blue', transition:'0.5s ease-in-out'}}>
                <h1 style={{ backgroundColor: bar >= 1 ? "blue" : 'gray', }} className='w-12 h-12 rounded-full  flex justify-center items-center absolute  left-[-18px] top-[-1px]' transition-colors duration-700 ease-in-out>1</h1>
                <h1 style={{ backgroundColor: bar >= 2 ? "blue" : 'gray', }} className='w-12 h-12 rounded-full  flex justify-center items-center absolute  left-[-18px] top-[45%] transition-colors duration-700 ease-in-out'>2</h1>
                <h1 style={{ backgroundColor: bar >= 3 ? "blue" : 'gray',  }} className='w-12 h-12 rounded-full  flex justify-center items-center absolute  left-[-18px] top-[93%] transition-colors duration-700 ease-in-out'>3</h1>
            </div>
        </div>
    )
}

export default FormBar