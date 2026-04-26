import React from 'react'
import Label from '../../../UI/Label'
import Input from '../../../UI/Input'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router'

const MedicalRecords = () => {



  const { register, handleSubmit } = useForm()


  const { bar, setBar, infoPatient, setInfoPatient } = useOutletContext()


  const onsubmit = (data) => {

    console.log(data);
    setInfoPatient(prev => [...prev, data]);

  }


  return (
    <div>
      <form className='w-full flex flex-col justify-start items-start gap-5' action="" onSubmit={handleSubmit(onsubmit)}>
        <h1 className='text-gray-600 text-2xl  mb-7'>Medical Records</h1>


        <div className='flex w-full h-12 justify-start items-center p-6 gap-6 '>


          <div className='flex justify-start items-center p-2 gap-2'>
            <Label text={'Patient Id'} />
            <Input type={'text'} Width={'18rem'} placeHolder={'Enter patient Id'} register={register('patientId')} />

          </div>




          <div className='flex justify-start items-center p-2 gap-2 '>
            <Label text={'Record Id'} />
            <Input type={'text'} Width={'18rem'} placeHolder={'Enter record Id'} register={register('recordId')} />
          </div>
        </div>


        <div className='w-full p-8 flex justify-start items-start gap-6 flex-col '>
          <Label text={'Record Result'} />
          <textarea {...register('recordResult')} placeholder='Enter Medical records ' className='w-full h-32 bg-transparent text-gray-800  border-gray-500 rounded border outline-none text-base p-3 font-mono h-80 resize-none ' type={'text'} />
        </div>


        <button type='submit' className='absolute right-2 bottom-3 w-36 h-9 rounded-md text-white text-base bg-blue-400 border-2 border-blue-300' onClick={(e) => {
          // e.preventDefault();
          setBar(bar => bar + 1);
          // console.log(data); 

        }}>Confirm</button>

      </form>
    </div>
  )
}

export default MedicalRecords