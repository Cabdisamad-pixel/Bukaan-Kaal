import React from 'react'
import Input from '../../../UI/Input'
import Label from '../../../UI/Label'
import { useForm } from 'react-hook-form'
import { data, useOutletContext } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertPatientInfo } from '../../../API/PatientInfo'
const InfoForm = () => {



  const { register, handleSubmit } = useForm()

  const { bar, setBar, infoPatient, setInfoPatient } = useOutletContext()

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: insertPatientInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['infoPatient'] })
    }
  })

  const onsubmit = (data) => {
    // e.preventDefault();
    console.log(data);

    mutate(data);

    // setInfoPatient(prev => [...prev, data]);
  }

  return (
    <>
      <form className='w-full flex flex-col justify-start items-start gap-3' action="" onSubmit={handleSubmit(onsubmit)}>

        <h1 className='text-gray-600 text-2xl text-center mb-7 '>Patient Info</h1>
        <div className='flex w-full h-12 justify-start items-center p-6 gap-6'>

          {/* FirstName */}
          <div className='flex flex-col basis-[50%] justify-start items-start p-2 gap-2'>
            <Label text={'First Name'} />
            <Input type={'text'} Width={'25rem'} placeHolder={'Enter first name'} register={register("firstName")} />

          </div>


          {/* LastName */}

          <div className='flex basis-[50%] flex-col justify-start items-start p-2 gap-2'>
            <Label text={'Last Name'} />
            <Input type={'text'} Width={'25rem'} placeHolder={'Enter last name'} register={register('listName')} />
          </div>
        </div>




        <div className='flex justify-start items-center w-full p-8 gap-10'>
          {/* Gender */}
          <div className='flex flex-col justify-start items-start gap-2'>
            <span>Gender</span>
            <div className='flex justify-between items-center gap-8 border h-14 p-1 bg-gray-200 border-gray-300 rounded-md w-[25rem]'>

              <div className='flex  basis-[50%] justify-start items-center h-full '>
                <input type="radio" id="male" name="gender" value="male" {...register('sex')} className='hidden peer' />
                <label htmlFor="male" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-white peer-checked:rounded peer-checked:text-green-500'>Male</label>
              </div>

              <div className='flex  basis-[50%] justify-start items-center h-full'>
                <input type="radio" id="female" name="gender" value="female" {...register('sex')} className='hidden peer' />
                <label htmlFor="female" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-white peer-checked:rounded peer-checked:text-green-500'>Female</label>
              </div>
            </div>
          </div>


          {/* Age */}

          <div className='flex flex-col w-[25rem] justify-start items-start  gap-2'>
            <Label text={'Age'} />
            <Input type={'number'} Width={'25rem'} placeHolder={'Enter age'} register={register('age')} />
          </div>

        </div>


        <div className='flex justify-start items-start gap-10 px-8 h-auto mb-3'>
          {/* Email */}

          <div className='flex flex-col basis-[50%]  justify-start items-start  gap-2'>
            <Label text={'Email'} />
            <Input type={'email'} Width={'25rem'} placeHolder={'Enter email'} register={register('email')} />
          </div>

          {/* Phone number */}


          <div className='flex flex-col basis-[50%]  justify-start items-start  gap-2'>
            <Label text={'Phone'} />
            <Input type={'tel'} Width={'25rem'} placeHolder={'Enter phone number'} register={register('mobileNumber')} />
          </div>
        </div>

        {/* Address */}


        <div className='flex flex-col w-full  justify-start items-start px-7 gap-2 '>
          <Label text={'Address'} />
          <textarea {...register('address')} className=' w-[53.6rem] h-[7rem] bg-transparent text-gray-800 border-gray-700 rounded-lg border outline-none text-base p-3 font-mono resize-none' placeholder='please enter address here'/>
            {/* please enter address here
          </textarea> */}
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