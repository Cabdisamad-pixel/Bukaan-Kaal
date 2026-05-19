import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'




const PatientDetails = () => {

 

  const navigate = useNavigate();

  useEffect(() => {
    navigate("patients");
  }, [])

  return (
    <>
      
        <div className='w-full h-auto'>
          <Outlet />
        </div>

    </>
  )
}

export default PatientDetails