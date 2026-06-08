import React, { useEffect, useState } from 'react'
import FormBar from './FormBar/FormBar'
import InfoForm from './Forms/InfoForm';
import PatientTest from './Forms/PatientTest';
import MedicalRecords from './Forms/MedicalRecords';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetPatientInfo, insertPatientInfo } from '../../API/PatientInfo';

const AddPatient = () => {

  
  const [bar, setBar] = useState(1);


  const navigate = useNavigate();


  const {data: patientInfo,isLoading : isFetching} = useQuery({
    queryKey : ['infoPatient'],
    queryFn : GetPatientInfo
  })


  const [searchPrams, setSearchPrams] = useSearchParams()

  const form = searchPrams.get('form') || 1
  

  console.log(patientInfo);

  useEffect(() => {
    if (form === 1) {
      navigate("/AddPatient/infoForm");
    }
    else if (form === 2) {
      
    }
    else if (form === 3) {
      navigate("/AddPatient/MedicalRecords");
    }

  }, [form, navigate])




  return (
    <div className='w-full h-full m-0 p-2 flex justify-start relative'>
      <FormBar bar={bar} />

      <div className='bg-white border border-gray-300 text-gray-500 basis-full rounded-md p-2 flex justify-between relative items-start flex-col'>
        <Outlet context={{bar, setBar}} />
        {/* <button type='submit' className='absolute right-2 bottom-3 w-36 h-9 rounded-md text-white text-base bg-blue-400 border-2 border-blue-300' onClick={(e) => {
          e.preventDefault();
          setBar(bar => bar + 1);
        }}>Confirm</button> */}
      </div>
    </div>
  )
}

export default AddPatient