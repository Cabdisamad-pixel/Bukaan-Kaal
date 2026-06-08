import React from 'react'
import ReactDOM from 'react-dom'
import Label from '../../../../UI/Label'
import Input from '../../../../UI/Input'
import { useNavigate, useParams } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AddWeek, GetWeeks } from '../../../../API/medicalRecords'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'



export const BackDrop = ({ ChangeHandler }) => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-10 cursor-pointer' onClick={ChangeHandler}>
        </div>
    )
}

const AddWeeksOverLay = ({ ChangeHandler }) => {


    const navigate = useNavigate();

    const { id } = useParams();
    console.log(id);
    const queryClient = useQueryClient();

    const { register, handleSubmit } = useForm();

    const { data: weeks, isLoading: weeksLoading } = useQuery({
        queryKey: ['weeks', id],
        queryFn: () => GetWeeks(id)
    })

    const {mutate: insertWeek, isLoading: isInsertingWeek} = useMutation({
        mutationFn: AddWeek,
        onSuccess: () => {
            toast.success('Week Added Successfully');
            queryClient.invalidateQueries({ queryKey: ['weeks', id] })

        }
    })

    const LastWeekNumber = weeks?.length > 0 ? weeks.length : 0;
    console.log(LastWeekNumber);

    const handleSubmition = (data) => {
        console.log(data);
        insertWeek(data);
        // navigate(-1)
        ChangeHandler();
    }

    return (
        <>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-20'>
            <form onSubmit={handleSubmit(handleSubmition)}>

                <h2 className='text-xl font-bold mb-4'>Add Weeks</h2>
                <p className='text-gray-600 mb-4'>Fill in the details for the new weeks.</p>

                <Label text={'Patient ID'} />
                <input {...register('patientId')} value={id} readOnly={true} className='w-[25rem] h-21 bg-transparent text-gray-800  border-gray-700 rounded-lg border outline-none text-base p-3 font-mono cursor-not-allowed' placeHolder={'Automatically Generated'} />


                {/* Status */}
                <div className='flex flex-col mt-2 mb-2 justify-start items-start gap-2'>
                    <span>Status</span>
                    <div className='flex justify-between items-center gap-8 border h-14 p-1 bg-gray-200 border-gray-300 rounded-md w-[25rem]'>

                        <div className='flex  basis-[30%] justify-start items-center h-full '>
                            <input {...register('status')} type="radio" id="Taken" name="status" value="taken" className='hidden peer' />
                            <label htmlFor="Taken" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-green-500 peer-checked:rounded peer-checked:text-white'>Taken</label>
                        </div>

                        <div className='flex  basis-[30%] justify-start items-center h-full'>
                            <input {...register('status')} type="radio" id="Pending" name="status" value="pending" className='hidden peer' />
                            <label htmlFor="Pending" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-blue-500 peer-checked:rounded peer-checked:text-white'>Pending</label>
                        </div>
                        <div className='flex  basis-[30%] justify-start items-center h-full'>
                            <input {...register('status')} type="radio" id="Not Taken" name="status" value="Not Taken" className='hidden peer' />
                            <label htmlFor="Not Taken" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-white peer-checked:rounded peer-checked:text-green-500'>Not Taken</label>
                        </div>
                    </div>
                </div>

                <Label text={'Week Number'} />
                <input {...register('weekNumber')} value={LastWeekNumber + 1} readOnly={true} className='w-[25rem] h-21 bg-transparent text-gray-800  border-gray-700 rounded-lg border outline-none text-base p-3 font-mono cursor-not-allowed' placeHolder={'Automatically Generated'} />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded block mt-4 w-full'>
                    {isInsertingWeek ? 'Adding Week...' : 'Add Week'}
                </button>
            </form>
            </div>
        </>
    )

}

const AddWeeksPortal = ({ ChangeHandler }) => {

    return (
        <div>
            {ReactDOM.createPortal(<BackDrop ChangeHandler={ChangeHandler} />, document.getElementById('BackDrop'))}
            {ReactDOM.createPortal(<AddWeeksOverLay ChangeHandler={ChangeHandler}/>, document.getElementById('AddWeeksPortal'))}
        </div>
    )

}

export default AddWeeksPortal