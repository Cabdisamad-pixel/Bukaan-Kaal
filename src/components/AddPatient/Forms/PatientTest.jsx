import React from 'react'
import Input from '../../../UI/Input'
import Label from '../../../UI/Label'
import { useOutletContext } from 'react-router'
import { useForm } from 'react-hook-form'

const PatientTest = () => {


  const { register, handleSubmit } = useForm()


  const { bar, setBar, infoPatient, setInfoPatient } = useOutletContext()

  const onsubmit = (data) => {
    // e.preventDefault();
    // console.log(data);
    setInfoPatient(prev => [...prev, data]);
  }

  return (

    <div>
      <form className='w-full flex flex-col justify-start items-start gap-5' action="" onSubmit={handleSubmit(onsubmit)}>
        <h1 className='text-gray-600 text-2xl  mb-7'>Patient Test</h1>

        <div className='flex w-full h-12 justify-start items-center p-6 gap-6 '>

          {/* PatientID */}
          <div className='flex flex-col justify-start items-start p-2 gap-2'>
            <Label text={'Patient Id'} />
            <Input type={'text'} Width={'25rem'} placeHolder={'Enter patient Id'} register={register('patientId')} />

          </div>


          {/* TestId */}

          <div className='flex flex-col justify-start items-start p-2 gap-2 '>
            <Label text={'Test Id'} />
            <Input type={'text'} Width={'25rem'} placeHolder={'Enter test Id'} register={register('testId')} />
          </div>
        </div>

        <div className='w-full p-8 flex justify-start items-start gap-6 flex-col '>
          <Label text={'Test Result'} />
          <textarea {...register('testResult')} placeholder='Enter test result' className='w-full h-32 bg-transparent text-gray-800  border-gray-500 rounded border outline-none text-base p-3 font-mono h-80 resize-none ' type={'text'} />
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

export default PatientTest