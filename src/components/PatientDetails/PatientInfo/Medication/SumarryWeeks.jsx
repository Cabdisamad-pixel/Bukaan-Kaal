import { Query, useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { GetWeeks } from '../../../../API/medicalRecords';
import LoadingSpinner from '../../../../UI/LoadingSpinner';




const SumarryWeeks = () => {


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

    const { id } = useParams();


    const { data: weeks, isLoading : weeksLoading } = useQuery({
        queryKey: ['weeks'],
        queryFn: GetWeeks
    })

    console.log(weeks);


    //  filitiring array of and returned week only if weeks.patientId === id tha comes prams in side the router where using usePrmas

    const filteredWeeks = weeks?.filter((week) => week.patientId == parseInt(id));

    // sorted the filtered Array by asending ( number )

    const sortedWeeks = filteredWeeks?.sort((a, b) => a.weekNumber - b.weekNumber);



    console.log(weeks);


    // const  handleTheLastWeekTaken = weeks.filter(week => week.status === 'taken').length
    // console.log(handleTheLastWeekTaken);

    return <>

        {/* if isLoading is true display and loadingSpinner */}

        {
            weeksLoading && <LoadingSpinner/>
        }

        {/* Parent div / container */}


        < div className='w-full min-h-[100%] flex flex-col justify-start items-start gap-6' >
            {
                sortedWeeks?.map((week, idx) => {
                    return <button disabled={week.status === 'not taken'} onClick={() => navigate(`${week.id}`)} key={idx} className={` w-full flex justify-between p-4 border-2 ${week.status === 'taken' ? 'bg-green-200 border-green-300 rounded-lg text-green-900 cursor-pointer' : week.status === 'pending' ? 'bg-yellow-200 border-yellow-300 rounded-lg text-yellow-900 cursor-pointer' : 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed rounded-lg'}`}>
                        <h3>week{week.weekNumber}</h3>
                        <p>{week.status} </p>
                    </button>
                })
            }
        </div >
    </>


}

export default SumarryWeeks