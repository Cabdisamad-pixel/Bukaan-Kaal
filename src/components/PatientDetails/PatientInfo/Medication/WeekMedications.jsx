import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'


import { LuPill } from "react-icons/lu";
import { LuClock, LuCalendar } from "react-icons/lu";
import { LuTriangleAlert } from "react-icons/lu";
import { useParams } from 'react-router';
import LoadingSpinner from '../../../../UI/LoadingSpinner';
import AddMedication from './AddMedication';
import { GetMedications } from '../../../../API/Medications';

const WeekMedications = () => {


  const [showMedicationPortal, setShowMedicationPortal] = useState(false);


  const { id, weekId } = useParams();

  console.log(weekId);

  const { data: medications, isLoading: MedicationsLoading } = useQuery({
    // we add the ( id, weekID ) as a dependency in query key we need each time that happen change to the patient or even in same patient if we change the week to fetch data from the database because the cache of react query if we did,nt that if he saw the same id he thinks the same thing and he didn,t fetch the instead of that he will return the cache data but if we add the weekId as a dependency in the query key he will know that this is a different query and he will fetch the data from the database
    queryKey: ['medications', id, weekId],
    queryFn: () => GetMedications(parseInt(id), parseInt(weekId))
  })

  // handle show medication if it,s true we will open the modal and if it,s not we will not do that till become the state true 

  const handleShowMedication = () => {
    setShowMedicationPortal(prev => !prev);
  }

  console.log(setShowMedicationPortal);


  return (

    <>
      {
        MedicationsLoading && <LoadingSpinner />
      }
      {/* Container for week medications */}
      <div className='w-full h-full p-4 border border-gray-300 bg-white rounded-lg flex flex-col gap-6'>

        {/* Header Container */}
        <div className='w-full flex justify-between items-center'>
          <div>
            <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'><LuPill /> Current Medications</h2>
            <span className='text-gray-500'>Active prescriptions and dosage information</span>
          </div>
          <button onClick={handleShowMedication} className='w-40 bg-gray-900 text-gray-100 hover:bg-gray-800 h-11 rounded-md'> <span className='font-mono text-2xl'>+</span> Add Medication</button>
        </div>

        {/* About the medicine */}
        {
          showMedicationPortal && <AddMedication OnClose={handleShowMedication} />
        }
        {


          medications?.map((medicine, idx) => {
            return (
              <div key={idx} className='bg-white w-full full rounded-md border border-gray-200 p-2'>

                <div className='flex items-center justify-start gap-44'>
                  {/* rightSide */}
                  <div>
                    {/* name and dosage */}
                    <div className='w-full p-2'>
                      <div className='flex justify-start items-center gap-4'>
                        <span className='text-gray-700 font-medium text-lg capitalize'>{medicine.medicineName}</span>
                        <span className='text-gray-800 font-medium bg-gray-200 rounded-md px-2'>{medicine.dosage}</span>
                      </div>

                      {/* Usage */}
                      <div className='flex justify-start items-center gap-4 mt-2'>
                        <div className='flex items-center gap-1 text-gray-500 text-sm'>
                          <LuClock />
                          <span>{medicine.frequency}</span>
                        </div>
                      </div>

                      {/* Indication */}
                      <div className='flex justify-start items-center gap-4 mt-2'>
                        <span className='text-gray-500'>indication:</span>
                        <span className='text-gray-700 text-sm'>{medicine.indication}</span>
                      </div>
                    </div>
                  </div>
                  {/* Left Side */}
                  <div>
                    <span className=' flex items-center gap-2'><LuPill /> {medicine.route} </span>
                    {/* Doctor */}
                    <span className=' flex items-center gap-2 mt-2 text-gray-500'> Prescribed by {medicine.prescribedBy} </span>
                  </div>
                </div>

                {/* Note */}
                <div className='p-4 mt-2 bg-blue-100 border border-blue-200 rounded-md flex items-center gap-3'>
                  <LuTriangleAlert color='blue' />
                  <span className='text-blue-500 text-sm'>Note:</span>
                  <span className='text-blue-700 text-sm ml-2'>{medicine.note}</span>
                </div>
              </div>
            )
          })}
      </div>
    </>

  )

}

export default WeekMedications