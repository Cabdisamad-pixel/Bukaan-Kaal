import React from 'react'

import { FiPhone } from "react-icons/fi";

import { FiSearch } from "react-icons/fi";
import LoadingSpinner from '../../UI/LoadingSpinner';
import { NavLink, Outlet } from 'react-router';
import SumarryProfile from './SumarryProfile';
import { useQuery } from '@tanstack/react-query';
import { GetPatientInfo } from '../../API/PatientInfo';


const SumarryPatientDetail = () => {



    

    const { data: patientsInfo, isLoading : PatientsInfoIsloading } = useQuery({
        queryKey: ['patients'],
        queryFn:GetPatientInfo
    })
    

    console.log(patientsInfo);
    
    const shortList = patientsInfo?.slice(0, 3) || [];


        // const patients = [
        //     {
        //         id: 1,
        //         name: 'Cabdisamad Maxamed',
        //         address: 'Mogadishu',
        //         phone: '123456789',
        //         doctor: 'Dr. Ahmed',
        //         status: 'safe'
        //     },
        //     {
        //         id: 2,
        //         name: 'Ali Mohamed',
        //         address: 'Hargeisa',
        //         phone: '987654321',
        //         doctor: 'Dr. Fatima',
        //         status: 'safe'
        //     },
        //     {
        //         id: 3,
        //         name: 'Fatima Ahmed',
        //         address: 'Berbera',
        //         phone: '555555555',
        //         doctor: 'Dr. Hassan',
        //         status: 'danger'
        //     }
        // ]

        // if(PatientsInfoIsloading){
        //     return <LoadingSpinner />
        // }

    return (
        <>
            {PatientsInfoIsloading && <LoadingSpinner />}
            <div className='w-full p-6 flex flex-col gap-8 bg-gray-100 h-full'>

                {/* header of this page / patient details */}

                <div className='w-full  flex justify-between items-start'>
                    <div className='flex justify-start  gap-3 flex-col'>
                        <h1 className='text-gray-400 text-4xl font-medium'>Patient</h1>
                        <span className='text-gray-700 text-xl '>Manage and monitor all patients info </span>
                    </div>
                    <button className='w-40 bg-gray-900 text-gray-100 hover:bg-gray-800 h-11 rounded-md'> <span className='font-mono text-2xl'>+</span> Add Patient</button>
                </div>


                {/* Search feild */}

                <div className='w-full bg-gray-200  rounded-md h-14 flex items-center gap-3 px-3 border border-gray-300'>
                    <FiSearch />
                    <input className='w-full h-full bg-gray-200 outline-none border-none border ' type='search' placeholder='search by id or by name ' />
                </div>


                {/* Summary Patient Detail */}
                {/* the summary patient detail container */}
                <div className='flex w-full h-full gap-3'>
                    {shortList.map((patient, key) => {
                        return (

                            <NavLink key={patient.id} to={`${patient.id}/overview`}>
                                <SumarryProfile id={key} patient={patient}/>
                            </NavLink>
                        )
                    })}
                </div>

            </div>

        </>
    )


}


export default SumarryPatientDetail