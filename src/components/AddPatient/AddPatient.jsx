import React, { useEffect, useState } from 'react'
import FormBar from './FormBar/FormBar'
import InfoForm from './Forms/InfoForm';
import PatientTest from './Forms/PatientTest';
import MedicalRecords from './Forms/MedicalRecords';
import { Outlet, useNavigate } from 'react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetPatientInfo, insertPatientInfo } from '../../API/PatientInfo';

const AddPatient = () => {
  const [bar, setBar] = useState(1);
  const navigate = useNavigate();


  const [infoPatient, setInfoPatient] = useState([]);


  const {data: patientInfo,isLoading : isFetching} = useQuery({
    queryKey : ['infoPatient'],
    queryFn : GetPatientInfo
  })

  // const {mutate} =useMutation({
  //   mutationFn : insertPatientInfo,
    
  // })


  

  console.log(patientInfo);

  useEffect(() => {
    if (bar === 1) {
      navigate("/AddPatient/infoForm");
    }
    else if (bar === 2) {
      navigate("/AddPatient/PatientTest");
    }
    else if (bar === 3) {
      navigate("/AddPatient/MedicalRecords");
    }

  }, [bar, navigate])


  if(bar >= 4) {
    console.log(infoPatient);
    // console.log(infoPatient[0]);
  }





  // const handleInfoPatientForm = () => {

  //   if (bar === 1) {
  //     // navigate("/PatientTest");
  //     setBar(2);
  //   }
  //   else if (bar === 2) {
  //     // navigate("/MedicalRecords");
  //     setBar(3);
  //   }
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // }

  return (
    <div className='w-full h-full m-0 p-2 flex justify-start relative'>
      <FormBar bar={bar} />

      <div className='bg-white border border-gray-300 text-gray-500 basis-full rounded-md p-2 flex justify-between relative items-start flex-col'>
        <Outlet context={{bar, setBar, infoPatient, setInfoPatient}} />
        {/* <button type='submit' className='absolute right-2 bottom-3 w-36 h-9 rounded-md text-white text-base bg-blue-400 border-2 border-blue-300' onClick={(e) => {
          e.preventDefault();
          setBar(bar => bar + 1);
        }}>Confirm</button> */}
      </div>
    </div>
  )
}

export default AddPatient