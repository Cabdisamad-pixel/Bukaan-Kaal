import React from 'react'
import { FiPhone } from 'react-icons/fi';


import { PiUserCircleThin } from "react-icons/pi";
import { FiMail } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";

import { MdEmergency } from "react-icons/md";
import { FiShield } from "react-icons/fi";
import { useQuery } from '@tanstack/react-query';
import { GetOnePatientInfo, GetPatientInfo } from '../../../API/PatientInfo';
import LoadingSpinner from '../../../UI/LoadingSpinner';
import { useParams } from 'react-router';




const OverView = () => {

  const { id } = useParams()

  console.log(id);
  


  const { data: patientInfo, isLoading : patientInfoIsLoading } = useQuery({
    queryKey: ['patients'],
    queryFn:  GetPatientInfo
  })

  console.log(patientInfo);
  
  const findedPatient = patientInfo?.find(patient => patient.id == id)

  console.log(findedPatient);

  return (
    <>

    
      {patientInfoIsLoading && <LoadingSpinner />}

      <div className='flex flex-col justify-start items-start gap-3'>
        <div className='w-full flex justify-start items-start gap-4'>
          {/* Personal Information */}
          <div className='bg-white basis-2/4 h-72 rounded-xl p-4 border border-gray-300 gap-8 flex flex-col'>
            <div className='flex w-full justify-start items-center gap-4'>
              <PiUserCircleThin size={24} />
              <span className='text-gray-700 text-xl font-medium'>Personal Information</span>
            </div>

            <div className='flex justify-start items-center gap-28'>
              {/* FullName */}
              <div className='flex flex-col justify-start items-start gap-2'>
                <span className='text-gray-500 text-sm'>Full Name</span>
                <p className='text-gray-700 text-md font-medium'>{findedPatient?.firstName} {findedPatient?.listName}</p>
              </div>

              {/* Age */}
              <div className='flex flex-col justify-start items-start gap-2'>
                <span className='text-gray-500 text-sm'>Age</span>
                <p className='text-gray-700 text-md font-medium'>{findedPatient?.age} years</p>
              </div>
            </div>

            <div className='flex justify-start items-center gap-56'>
              {/* Gender */}
              <div className='flex flex-col justify-start items-start gap-2'>

                <span className='text-gray-500 text-sm'>Gender</span>
                <p className='text-gray-700 text-md font-medium'>{findedPatient?.sex}</p>
              </div>
              {/* Blood Type */}
              <div className='flex flex-col justify-start items-start gap-2'>

                <span className='text-gray-500 text-sm'>Blood Type</span>
                <p className='text-gray-700 text-md font-medium'>O+</p>
              </div>
            </div>

          </div>

          {/* Contact Information */}
          <div className='bg-white basis-2/4 h-72 rounded-xl p-4 border border-gray-300 gap-6 flex flex-col'>
            <div className='flex w-full justify-start items-center gap-4'>
              <FiPhone size={20} />
              <span className='text-gray-700 text-xl font-medium'>Contact Information</span>
            </div>

            {/* Call Phone */}
            <div className='flex justify-start items-center gap-4'>
              <FiPhone size={20} className='text-gray-500' />
              <div className='flex flex-col '>
                <span>Phone</span>
                <span className='text-gray-700 text-md font-medium'>{findedPatient?.mobileNumber}</span>
              </div>
            </div>
            {/* Email */}
            <div className='flex justify-start items-center gap-4'>
              <FiMail size={20} className='text-gray-500' />
              <div className='flex flex-col '>
                <span>Email</span>
                <span className='text-gray-700 text-md font-medium'>{findedPatient?.email}</span>
              </div>
            </div>
            {/* Address */}
            <div className='flex justify-start items-center gap-4'>
              <FiMapPin size={20} className='text-gray-500' />
              <div className='flex flex-col '>
                <span>Address</span>
                <span className='text-gray-700 text-md font-medium'>{findedPatient?.Address}</span>
              </div>
            </div>


          </div>

        </div>

        {/* Second Row Of Overview */}

        <div className='w-full flex flex-ro justify-start items-start gap-4'>


          <div className='bg-white basis-2/4 h-72 rounded-xl p-4 border border-gray-300 gap-5 flex flex-col'>
            <div className='flex w-full justify-start items-center gap-4'>
              <MdEmergency size={20} />
              <span className='text-gray-700 text-xl font-medium'>Emergency Contact</span>
            </div>

            {/* emergency contact */}
            <div className='flex justify-start items-center gap-3'>
              <div className='flex flex-col gap-2'>
                <span>Name</span>
                <span className='text-gray-700 text-md font-medium'>John Doe</span>
              </div>
            </div>
            {/* Relation Ship */}
            <div className='flex justify-start items-center gap-3'>
              <div className='flex flex-col '>
                <span>Relation ship</span>
                <span className='text-gray-700 text-md font-medium'>brother</span>
              </div>
            </div>
            {/* Phone Number */}
            <div className='flex justify-start items-center gap-3'>
              <div className='flex flex-col gap-1'>
                <span>Phone</span>
                <span className='text-gray-700 text-md font-medium'>+252 123456789</span>
              </div>
            </div>


          </div>

          {/* Doctor Assigned */}

          <div className='bg-white basis-2/4 h-72 rounded-xl p-4 border border-gray-300 gap-5 flex flex-col'>
            <div className='flex w-full justify-start items-center gap-4'>
              <FiShield />
              <span className='text-gray-700 text-xl font-medium'>Doctor Assigned</span>
            </div>


            {/* Doctor Information */}

            <div className='flex justify-start items-center gap-3'>
              <div className='flex flex-col gap-2'>
                <span>Name</span>
                <span className='text-gray-700 text-md font-medium'> Dr. Sarah ismail</span>
              </div>
            </div>

            {/* Doctor Specialist */}
            <div className='flex justify-start items-center gap-3'>
              <div className='flex flex-col '>
                <span>Specialist</span>
                <span className='text-gray-700 text-md font-medium'>General medicine</span>
              </div>
            </div>

            {/* Address */}
            <div className='flex justify-start items-center gap-3'>
              <div className='flex flex-col gap-1'>
                <span>Contact</span>
                <span className='text-gray-700 text-md font-medium'>+252 123456789</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default OverView