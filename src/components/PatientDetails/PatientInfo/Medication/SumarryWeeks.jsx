import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { GetWeeks } from '../../../../API/medicalRecords';
import LoadingSpinner from '../../../../UI/LoadingSpinner';
import NotFoundMedications from './NotFoundMedications';
import AddWeeksPortal from './AddWeeksPortal';
import toast from 'react-hot-toast';
import { formatDate } from '../../../../services/formatDate';
import { FaCalendar } from 'react-icons/fa';




const SumarryWeeks = () => {


    const [showAddWeeks, setShowAddWeeks] = useState(false);

    const { id } = useParams();

    const { data: weeks, isLoading: weeksLoading } = useQuery({
        queryKey: ['weeks', id],
        queryFn: () => GetWeeks(id)
    })


    const handleAddWeeks = () => {
        if (weeks.length > 0 && weeks[weeks.length - 1]?.status !== 'taken') {
            return toast.error('Please update the status of the last week before adding a new one.')
        }
        setShowAddWeeks(prev => !prev);
    }

    const navigate = useNavigate();


    //     const weeks =[
    //   {
    //     id : 1,
    //     name : 'week 1',
    //     status : 'taken'
    //   },
    //   {
    //     id : 2,
    //     name : 'week 2',
    //     status : 'taken'
    //   },
    //   {
    //     id : 3,
    //     name : 'week 3',
    //     status : 'pending'
    //   },
    //   {
    //     id : 4,
    //     name : 'week 4',
    //     status : 'pending'
    //   },
    //   {
    //     id : 5,
    //     name : 'week 5',
    //     status : 'pending'
    //   }
    // ]





    console.log(weeks);


    //  filitiring array of and returned week only if weeks.patientId === id tha comes prams in side the router where using usePrmas

    // const filteredWeeks = weeks?.filter((week) => week.patientId == parseInt(id));

    // sorted the filtered Array by asending ( number )

    const sortedWeeks = weeks?.sort((a, b) => a.weekNumber - b.weekNumber);



    console.log(weeks);


    // const  handleTheLastWeekTaken = weeks.filter(week => week.status === 'taken').length
    // console.log(handleTheLastWeekTaken);

    // console.log(weeks[0]?.created_at.split('T')[0])

    if (weeks === undefined) return





    return <>

        {/* if isLoading is true display and loadingSpinner */}

        {
            weeksLoading && <LoadingSpinner />
        }

        {/* Parent div / container */}


        < div className='w-full min-h-[100%] flex flex-col justify-start items-start gap-6' >

            {
                sortedWeeks?.length === 0 ? showAddWeeks ? <AddWeeksPortal ChangeHandler={handleAddWeeks} /> : <NotFoundMedications AddWeekHandler={handleAddWeeks} /> :
                    sortedWeeks?.map((week, idx) => {
                        return (
                            <button disabled={week.status === 'not taken'} onClick={() => navigate(`${week.weekNumber}`)} key={idx} className={` w-full flex justify-between items-center p-4 border rounded-2xl h-[5.7rem] ${week.status === 'taken' ? 'bg-emerald-50 border-emerald-400  text-green-900 cursor-pointer' : 'bg-amber-100 border-amber-400  text-yellow-900 cursor-pointer'}`}>
                                <div className='flex justify-start items-center gap-3'>
                                    <span className={`w-11 h-11 rounded-[50%] flex justify-center items-center text-white text-xl font-semibold ${week.status === 'taken' ? 'bg-emerald-500 ' : 'bg-amber-500'} `}>{week.weekNumber}</span>
                                    <div className='flex justify-start flex-col items-start gap-1'>
                                        <h3 className='capitalize font-semibold'>week {week.weekNumber}</h3>
                                        <p className='text-sm flex justify-center items-center gap-2'> <FaCalendar  /> {formatDate(week.created_at)}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col items-end gap-2'>
                                    <p className={` text-sm font-semibold capitalize rounded-2xl ${week.status === 'taken' ? 'w-[3rem] bg-emerald-100 text-emerlad-800' :' w-[4.5rem] bg-amber-200 text-amber-900' }`}>{week.status} </p>
                                    <div className={`w-[6rem] h-[0.5rem] rounded-xl ${week.status !== 'taken' && 'bg-amber-50 border border-amber-200'}`}>
                                        <div className={`rounded-2xl ${week?.status === 'taken' ? 'bg-emerald-400 w-[100%] h-full' : 'bg-amber-400 w-[40%] h-full'}`}></div>
                                    </div>
                                    <span className='text-sm text-gray-500'>
                                        {week.status === 'taken' ? '100%'  : '40%'}
                                    </span>
                                </div>
                            </button>
                        )

                    })
            }
            {sortedWeeks?.length > 0 ? showAddWeeks ? <AddWeeksPortal ChangeHandler={handleAddWeeks} /> :
                <button onClick={handleAddWeeks} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded block mt-4 w-full'>
                    Add Week
                </button>
                : null}
        </div >
    </>


}

export default SumarryWeeks