import React from 'react'
import Label from '../../../UI/Label'
import Input from '../../../UI/Input'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { insertPatientMedicalRecord, selectALlMedicalRecords } from '../../../API/medicalRecords'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../../UI/LoadingSpinner'

const MedicalRecords = () => {


  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm()


  const { data: medicalRecordsData } = useQuery({
    queryKey: ['medicalRecords'],
    queryFn: selectALlMedicalRecords
  })

  // console.log(medicalRecordsData);

  const LastMedicalIdRecord = medicalRecordsData?.length + 1

  const { bar, setBar, infoPatient, setInfoPatient } = useOutletContext()

  const { mutate, isLoading: insertIsLoading } = useMutation({
    mutationFn: insertPatientMedicalRecord,
    onSuccess: () => {
      toast.promise({

      })
      queryClient.invalidateQueries({ queryKey: ['medicalRecords'] });
    },
    onError: () => {
      toast.error('error ayaa jiro')
    }
  })

  const onsubmit = (data) => {

    console.log(data);
    // setInfoPatient(prev => [...prev, data]);

    mutate(data)
  }


  return (

    <div>
      {
        insertIsLoading && <LoadingSpinner />
      }
      <form className='w-full flex flex-col justify-start items-start gap-5' action="" onSubmit={handleSubmit(onsubmit)}>
        <h1 className='text-gray-600 text-2xl  mb-7'>Medical Records</h1>


        <div className='flex w-full h-12 justify-start items-center p-6 gap-6 '>


          <div className='flex flex-col justify-start items-start p-2 gap-2'>
            <Label text={'Patient Id'} />
            <Input type={'text'} Width={'25rem'} placeHolder={'Enter patient Id'} register={register('PatientId')} />

          </div>




          <div className='flex flex-col justify-start items-start p-2 gap-2 '>
            <Label text={'Record Id'} />
            <input value={LastMedicalIdRecord} readOnly={true} className='w-[25rem] h-21 bg-transparent text-gray-800  border-gray-700 rounded-lg border outline-none text-base p-3 font-mono cursor-not-allowed' placeHolder={'Automatically Generated'} />
          </div>
        </div>


        <div className='w-full flex justify-start items-center gap-11 p-8'>
          <div className='flex flex-col justify-start items-start gap-2 basis-[40%]'>
            <span>Status</span>
            <div className='flex justify-between items-center gap-8 border h-14 p-1 bg-gray-200 border-gray-300 rounded-md w-[25rem]'>

              <div className='flex  basis-[50%] justify-start items-center h-full '>
                <input type="radio" id="stable" name="status" value="stable" {...register('patientStatus')} className='hidden peer' />
                <label htmlFor="stable" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-green-400 peer-checked:rounded peer-checked:text-white'>stable</label>
              </div>

              <div className='flex  basis-[50%] justify-start items-center h-full'>
                <input type="radio" id="critical" name="status" value="critical" {...register('patientStatus')} className='hidden peer' />
                <label htmlFor="critical" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-red-400 peer-checked:rounded peer-checked:text-white'>critical</label>
              </div>
            </div>
          </div>

          <div className=' basis-[50%] h-auto flex justify-start items-center  mt-7 '>



            <div className='w-full h-[3.5rem]'>
              <input type='select' {...register('TotolWeeks')} list='weeks' className=' w-full h-full flex justify-center items-center text-center outline-none border border-gray-300 rounded-lg appearance-none cursor-pointer' />

              <datalist name="weeks" id="weeks">
                <option>how many weeks</option>
                <option value="1">1week</option>
                <option value="2">2week</option>
                <option value="3">3week</option>
                <option value="4">4week</option>
                <option value="5">5week</option>
                <option value="6">6week</option>
                <option value="7">7week</option>
                <option value="8">8week</option>
                <option value="9">9week</option>
                <option value="10">10week</option>
              </datalist>
            </div>
          </div>




        </div>

        <div className='w-full px-6'>
          <div className='flex flex-col justify-start items-start p-2 gap-2 '>
            <Label text={'Price'} />
            <Input type={'number'} Width={'40rem'} placeHolder={'Enter Price Per Week'} register={register('price')} />
          </div>
        </div>


        <button type='submit' className='absolute right-[23%] bottom-[10%] w-[32rem] h-14 rounded-md text-white text-2xl bg-green-500 border-2 border-green-600' onClick={(e) => {
          // e.preventDefault();
          setBar(bar => bar + 1);
          // console.log(data); 

        }}>Confirm</button>

      </form>
    </div>
  )
}

export default MedicalRecords