import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'


import { LuPill } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { LuTriangleAlert } from "react-icons/lu";
import { FiEdit, FiTrash, FiTrash2 } from "react-icons/fi";
import { useParams } from 'react-router';
import LoadingSpinner from '../../../../UI/LoadingSpinner';
import AddMedication from './AddMedication';
import { GetMedications, takedWeek, UpdateMedicine } from '../../../../API/Medications';
import { GetCurrentWeekByPatientId } from '../../../../API/medicalRecords';
import toast from 'react-hot-toast';
import UpdatingMedicine from './UpdatingMedicine'

const WeekMedications = () => {

  // portals states
  const [showMedicationPortal, setShowMedicationPortal] = useState(false);
  const [showUpdateMedicinePortal, setshowUpdateMedicinePortal] = useState(false)

  const { id, weekId } = useParams();

  const queryClient = useQueryClient();

  const [medicineId, setMedicineId] = useState(null);

  const { mutate: updatingWeek, isLoading: updatingWeekLoading } = useMutation({
    mutationFn: takedWeek,
    onSuccess: (data) => {
      toast.success(`this week taked patient`)
      queryClient.invalidateQueries({ queryKey: ['weeks'] })
    },
    onError: () => toast.error('week is not updated ')
  })

  // console.log(weekId);

  const handleMedicineId = (id) => {
    setMedicineId(id);
  }

  const { data: medications, isLoading: MedicationsLoading } = useQuery({
    queryKey: ['medications', id, weekId],
    queryFn: () => GetMedications(id, weekId)
  })

  console.log(medications);

  // handle show medication if it,s true we will open the modal and if it,s not we will not do that till become the state true 

  const existingMedications = 1;

  console.log(existingMedications)


  // getting current week for displaying the price for this week when we check 
  const { data: currentWeek } = useQuery({
    queryKey: ['weeks', id, weekId],
    queryFn: () => GetCurrentWeekByPatientId(parseInt(id), parseInt(weekId))
  })

  console.log(currentWeek);


  const handleWeekUpdating = () => {
    const values = {
      id,
      weekNumber: weekId
    }
    updatingWeek(values)
  }


  const handleShowMedication = () => {
    setShowMedicationPortal(prev => !prev);
  }
  const handleShowUpdateMedicine = () => {
    setshowUpdateMedicinePortal(prev => !prev);
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
          {currentWeek?.status !== 'taken' && <button onClick={handleShowMedication} className='w-40 bg-gray-900 text-gray-100 hover:bg-gray-800 h-11 rounded-md'> <span className='font-mono text-2xl'>+</span> Add Medication</button>}
        </div>

        {/* About the medicine */}
        {
          showMedicationPortal && <AddMedication existingMedications={existingMedications} OnClose={handleShowMedication} />
        }

        {
          showUpdateMedicinePortal && <UpdateMedicine OnCloseUpdateMedicinePortal={handleShowUpdateMedicine} id={medicineId}/>
        }
        {


          medications?.map((medicine, idx) => {

            return (

              <div key={idx} className='bg-white w-full full rounded-md border border-gray-200 p-2'>
                <div className='flex items-center justify-start gap-44 relative'>
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

                  {/* mutation container  */}
                  <div className='flex justify-start items-center gap-2 absolute top-2 right-1'>

                    {/* edit container */}
                    <div onClick={() => {
                      // handleMedicinePrams(medicine.id)
                      handleMedicineId(medicine.id);
                      handleShowUpdateMedicine()
                    }} className='w-[2.3rem] h-[2rem] flex justify-center items-center cursor-pointer bg-emerald-100 border border-emerald-300 rounded-lg'>
                      <FiEdit className='text-emerald-400' />
                    </div>

                    {/* trash container */}
                    <div className='w-[2.3rem] h-[2rem] flex justify-center items-center cursor-pointer bg-red-100 border border-red-300 rounded-lg'>
                      <FiTrash2 className='text-red-500' />
                    </div>

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
        {medications?.length > 0 && currentWeek?.status !== 'taken' &&
          <button disabled={updatingWeekLoading} onClick={handleWeekUpdating} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded block mt-4 w-full'>
            {`taked this week for the price $${currentWeek?.price}`}
          </button>
        }
      </div>
    </>

  )

}

export default WeekMedications