import React from 'react'


import { FiSearch } from "react-icons/fi";
import SumarryPatientDetail from './SumarryPatientDetail';


const PatientDetails = () => {


  const patients = [
    {
      id: 1,
      name: 'Cabdisamad Maxamed',
      address: 'Mogadishu',
      phone: '123456789',
      doctor: 'Dr. Ahmed',
      status: 'safe'
    },
    {
      id: 2,
      name: 'Ali Mohamed',
      address: 'Hargeisa',
      phone: '987654321',
      doctor: 'Dr. Fatima',
      status: 'safe'
    },
    {
      id: 3,
      name: 'Fatima Ahmed',
      address: 'Berbera',
      phone: '555555555',
      doctor: 'Dr. Hassan',
      status: 'danger'
    }
  ]

  return (
    <>
      {/* The parent div / container */}

      <div className='w-full p-6 flex flex-col gap-6 bg-gray-100 h-full'>

        {/* header of this page / patient details */}

        <div className='w-full  flex justify-between items-start'>
          <div className='flex justify-start  gap-3 flex-col'>
            <h1 className='text-gray-400 text-4xl font-medium'>Patient</h1>
            <span className='text-gray-700 text-xl '>Manage and monitor all patients info </span>
          </div>
          <button className='w-40 bg-gray-900 text-gray-100 hover:bg-gray-800 h-11 rounded-md'> <span className='font-mono text-2xl'>+</span> Add Patient</button>
        </div>


        {/* Search feild */}

        <div className='w-full bg-gray-200  rounded-md h-11 flex items-center gap-3 px-3 border border-gray-300'>
          <FiSearch />
          <input className='w-full h-full bg-gray-200 outline-none border-none border ' type='search' placeholder='search by id or by name ' />
        </div>


        {/* Summary Patient Detail */}
        <div className='w-full flex gap-3'>
          {
            patients.map((patient) => {
              return <SumarryPatientDetail key={patient.id} name={patient.name} address={patient.address} phone={patient.phone} doctor={patient.doctor} status={patient.status} />
            })
          }
        </div>

      </div>
    </>
  )
}

export default PatientDetails