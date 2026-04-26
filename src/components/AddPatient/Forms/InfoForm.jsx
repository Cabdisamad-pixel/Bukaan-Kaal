import React from 'react'
import Input from '../../../UI/Input'
import Label from '../../../UI/Label'
import { useForm } from 'react-hook-form'
import { data, useOutletContext } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { insertPatientInfo } from '../../../API/PatientInfo'
const InfoForm = () => {



  const {register, handleSubmit} = useForm()

  const {bar, setBar, infoPatient, setInfoPatient} = useOutletContext()


  const {mutate } = useMutation({
    mutationFn : (data) => insertPatientInfo(data)
  })

  const onsubmit = (data) => {
    // e.preventDefault();
    console.log(data);

    mutate(data);
    
    setInfoPatient(prev => [...prev, data]);
  }

  return (
    <>
      <form className='w-full flex flex-col justify-start items-start gap-5' action="" onSubmit={handleSubmit(onsubmit)}>

        <h1 className='text-gray-600 text-2xl text-center mb-7 '>Patient Info</h1>
        <div className='flex w-full h-12 justify-start items-center p-6 gap-6'>

          {/* FirstName */}
          <div className='flex justify-start items-center p-2 gap-2'>
            <Label text={'First Name'} />
            <Input type={'text'} Width={'18rem'} placeHolder={'Enter first name'} register = {register("firstName")} />

          </div>


          {/* LastName */}

          <div className='flex justify-start items-center p-2 gap-2'>
            <Label text={'Last Name'} />
            <Input type={'text'} Width={'18rem'} placeHolder={'Enter last name'} register={register('listName')} />
          </div>
        </div>





        {/* Gender */}

        <div className='flex justify-start items-center gap-8'>
          <div className='flex w-full h-12 justify-start items-center p-8 gap-8'>
            <input type="radio" id="male" name="gender" value="male" {...register('sex')} />
            <Label text={'Male'} />
          </div>

          <div className='flex w-full h-12 justify-start items-center p-8 gap-8'>
            <input type="radio" id="female" name="gender" value="female" {...register('sex')} />
            <Label text={'Female'} />
          </div>
        </div>


        {/* Age */}

        <div className='flex w-full h-12 justify-start items-center p-7 gap-8'>
          <Label text={'Age'} />
          <Input type={'number'} Width={'30rem'} placeHolder={'Enter age'} register={register('age')} />
        </div>

        {/* Email */}

        <div className='flex w-full h-12 justify-start items-center p-7 gap-8'>
          <Label text={'Email'} />
          <Input type={'email'} Width={'30rem'} placeHolder={'Enter email'} register={register('email')} />
        </div>

        {/* Phone number */}


        <div className='flex w-full h-12 justify-start items-center p-7 gap-8'>
          <Label text={'Phone'} />
          <Input type={'tel'} Width={'30rem'} placeHolder={'Enter phone number'} register={register('mobileNumber')} />
        </div>

        {/* Address */}


        <div className='flex w-full h-12 justify-start items-center p-7 gap-8'>
          <Label text={'Address'} />
          <Input type={'text'} Width={'30rem'} placeHolder={'Enter address'} register={register('Address')} />
        </div>

        <button type='submit' className='absolute right-2 bottom-3 w-36 h-9 rounded-md text-white text-base bg-blue-400 border-2 border-blue-300' onClick={(e) => {
          // e.preventDefault();
          setBar(bar => bar + 1);
          // console.log(data);
          
        }}>Confirm</button>

      </form >
    </>
  )
}

export default InfoForm