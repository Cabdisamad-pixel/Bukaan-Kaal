import React, { useState } from 'react'
import FormBar from './FormBar/FormBar'
import InfoForm from './Forms/InfoForm';
import PatientTest from './Forms/PatientTest';
import MedicalRecords from './Forms/MedicalRecords';

const AddPatient = () => {
  const [bar, setBar]= useState(1);
  return (
    <div className='w-full h-full m-0 p-2 flex justify-between '>
    <FormBar bar={bar}/>
    <button onClick={() => setBar(bar => bar + 1)}>Confirm</button>
    {bar === 1 && <InfoForm/>}
    {bar === 2 && <PatientTest/>}
    {bar === 3 && <MedicalRecords/>}
    </div>
  )
}

export default AddPatient