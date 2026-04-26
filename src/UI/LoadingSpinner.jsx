import React from 'react'

const LoadingSpinner = () => {
  return (
    <>
        <div className='w-full h-screen bg-transparent backdrop-blur-sm flex justify-center items-center gap-4 absolute top-[0%]' >
          <span style={{animationDuration : '500ms'}} className='w-12 h-12 bg-blue-400 border-white animate-bounce rounded '></span>
          <span style={{animationDuration : '500ms', animationDelay: '100ms'}} className='w-12 h-12 bg-blue-400 border-white animate-bounce delay-100 rounded' ></span>
          <span style={{animationDuration : '500ms', animationDelay: '200ms'}} className='w-12 h-12 bg-blue-400 border-white animate-bounce delay-200 rounded' ></span>
        </div>
        
    </>
  )
}

export default LoadingSpinner