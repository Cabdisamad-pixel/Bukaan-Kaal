import React, { useEffect } from 'react'
import { use } from 'react';

import { IoArrowBack } from "react-icons/io5";
import { Navigate, NavLink, Outlet, useNavigate, useOutletContext, useParams } from 'react-router';
import { MdErrorOutline } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import { GetPatientInfo } from '../../../API/PatientInfo';




const PatientInfo = () => {

  const patients = useOutletContext();
  const { id,name } = useParams();

  const { data: patientInfo, isLoading : patientInfoIsLoading } = useQuery({
      queryKey: ['patients'],
      queryFn:  GetPatientInfo
    })

    console.log(id);
    
  const findedPatient = patientInfo?.find(patient => patient.id === parseInt(id))
  // console.log(parseInt(id) == 1);

  // let isInitial = true

  const navigate = useNavigate();

  // useEffect(() => {

  //   if (isInitial === true) {
  //     navigate('overview');
  //     isInitial = false;
  //   }

  // }, [])

  const navigatePatientDetails = [
    {
      id: 1,
      name: "overview",
      path:'overview'
    },


    {
      id: 2,
      name: "medications",
      path: 'medications/weeks'
    },
    {
      id: 3,
      name: "lab results",
      path: 'lab-results'
    },
    {
      id: 4,
      name: "history",
      path: 'history'
    },
  ];


  return (

    <>
      {/* Header */}
      <div className='w-full h[100vh] p-4 bg-gray-100 flex flex-col justify-start items-start gap-6'>

        {/* Header of this page */}
        <div className='flex justify-start items-center gap-6'>

          {/* Get back arrow Icon  */}

          {/* <NavLink  */}
            <IoArrowBack size={24} className=' cursor-pointer bg-white w-9 h-9 border border-gray-300 rounded' onClick={() => navigate(-1)}/>
          {/* </NavLink> */}
          {/* Profile Name */}
          <div className='flex flex-col items-start'>
            <h1 className='text-gray-800 text-4xl font-medium mt-4'>{findedPatient?.firstName || 'Patient Name'}</h1>
            {/* Profile Address */}
            <p className='text-gray-600 mt-2'>{findedPatient?.Address || 'Mogadishu'}</p>
          </div>
        </div>




        {/* Status of this patient */}
        <div className='w-full h-16 bg-white border border-gray-300 rounded-lg flex flex-col justify-start items-start p-4'>
          <div className='flex justify-start items-start gap-3'>
            <MdErrorOutline size={22} color="red" />
            <div className='flex flex-col items-start'>
              <span className='text-red-500 text-sm ml-2'>Critical</span>
              <span className='text-red-500 text-sm ml-2'>
                This patient requires immediate attention.
              </span>
            </div>
          </div>
        </div>

        {/* Navigate into patient details */}
        <div className='w-full h-11 rounded-3xl bg-gray-200 flex justify-between items-center px-1'>
          {navigatePatientDetails.map((nav) => {
            return (
              <NavLink className={({ isActive }) => isActive ? 'bg-gray-300 rounded-3xl' : 'hover:bg-gray-300 rounded-full'} to={nav.path} key={nav.id}>
                <div key={nav.id} className='basis-1/4 rounded-2xl px-16 py-2  text-sm font-medium text-gray-700 cursor-pointer'>
                  {nav.name}
                </div>
              </NavLink>
            )
          })}

        </div>

        {/* Outlet for patient details */}
        <div className='w-full h-full  p-1'>
          <Outlet />
        </div>


      </div>
    </>

  )


}

export default PatientInfo