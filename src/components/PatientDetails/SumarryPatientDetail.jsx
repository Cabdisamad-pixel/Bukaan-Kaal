import React, { useState } from 'react'

import { FiPhone } from "react-icons/fi";

import { FiSearch } from "react-icons/fi";
import LoadingSpinner from '../../UI/LoadingSpinner';
import { NavLink, Outlet, useSearchParams } from 'react-router';
import SumarryProfile from './SumarryProfile';
import { useQuery } from '@tanstack/react-query';
import { GetPatientInfo } from '../../API/PatientInfo';
import Filter from '../../UI/Filter';
import { selectALlMedicalRecords } from '../../API/medicalRecords';


const SumarryPatientDetail = () => {


    const [searchPrams] = useSearchParams();


    // 1) Reading/selecting all patients

    const { data: patientsInfo, isLoading: PatientsInfoIsloading } = useQuery({
        queryKey: ['patients'],
        queryFn: GetPatientInfo
    })


    // 2) Reading all MedicalRecords 



    const { data: medicalRecords, isLoading: medicalRecordsIsLoading } = useQuery({
        queryKey: 'medicalRecords',
        queryFn: selectALlMedicalRecords
    })

    

    const [searchedPatient, setSearchedPAtient] = useState('');

    // 3) Handling State of searching Patient

    const handlingSearchState = (e) => {

        setSearchedPAtient(e.target.value);

    }

    // console.log(searchedPatient);



    const filterValue = searchPrams.get('filter') || 'all';

    // console.log(filterValue);

    // 4) Genreal Info for the next steps
    // The data of the status it will be come another table it,s diffrent table so we also filtring the medical records table 
    // anogoo u fiirinayno id-ga status ka la helay oo laga helay array-da medical-records ka oo la mid ah filter-ka id-giisa soo celi hadhow id-gaas 
    // ayaa la soo return gareyn doonaa waa saas case ka.



    // 5) Declaring the array name / hadey jiraan filter gooni ah array-da filterkaas aa la siinaa hadeysan jirin original array 
    let filterdPatients;

    if (filterValue === 'all') filterdPatients = patientsInfo // Original Array from supabase 


    // 6) this case is for if we get filter value not filter=all but if we get filter value that not 'all' we make this decisions

    else {
        filterdPatients = patientsInfo?.filter((patient) => {

            // console.log(patient.id); // checking if we get an id 


            // 7) waxa isku dayeynaa inaa isku match gareyno patien-ka hada la maraayo anagoo heleyno id-giisa 
            // inaa ka helno array-da records waana laga helaa marka waxaa si hubineynaa in markii la soo helo id-ga 
            // inuu match gareynaayo filterValue ga hadii uu match gareeyo ayaa lagu return gareynaa 

            const foundedPatient = medicalRecords?.find((record) => {
                return (
                    record.PatientId === patient.id && record.patientStatus === filterValue
                )
            })

            // console.log(foundedPatient); // checking if we get this info 

            // 8) foundedPatients hadii uu truthy value uu ku jiro means wax aan ahayn falsy value 
            // waxa laga soo qaadanayaa id-ga keliya asigo id-gaas loo fiirinaayo patient-ka hada la maraayo inuu isku id-yihiin 
            // hadey taasi sax noqoto ayaa la return gareynaa 
            
            return (
                patient.id === foundedPatient?.PatientId
            )
        })

        // console.log(filterdPatients); // checking if we get successfully Array 

    }

    const searchingPatients = searchedPatient ? filterdPatients?.filter(patient => patient.firstName.includes(searchedPatient) || patient.listName.includes(searchedPatient)) : filterdPatients



    // const patients = [
    //     {
    //         id: 1,
    //         firsname: 'Cabdisamad Maxamed',
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

                <div className='w-full flex flex-col justify-between items-start gap-2'>
                    <div className='w-full flex justify-between p-2 items-start'>
                        <h1 className='text-gray-400 text-4xl font-medium'>Patient</h1>
                        <button className='w-40 bg-gray-900 text-gray-100 hover:bg-gray-800 h-11 rounded-md'> <span className='font-mono text-2xl'>+</span> Add Patient</button>
                    </div>
                    <div className='flex w-full justify-start  gap-3 flex-col'>
                        <div className='flex justify-around  w-full gap-[25rem] items-center'>
                            <span className='text-gray-700 text-xl '>Manage and monitor all patients info </span>
                            <Filter />
                        </div>
                    </div>
                </div>


                {/* Search feild */}

                <div className='w-full bg-gray-200  rounded-md h-14 flex items-center gap-3 px-3 border border-gray-300'>
                    <FiSearch />
                    <input onChange={handlingSearchState} className='w-full h-full bg-gray-200 outline-none border-none border ' type='search' placeholder='search by name ' />
                </div>


                {/* Summary Patient Detail */}
                {/* the summary patient detail container */}
                <div className='flex w-[61.5rem] flex-wrap h-auto p-1 gap-2'>
                    {searchingPatients?.map((patient, key) => {
                        return (

                            <NavLink key={patient.id} to={`${patient.id}/overview`}>
                                <SumarryProfile id={key} patient={patient} />
                            </NavLink>
                        )
                    })}
                </div>

            </div>

        </>
    )


}


export default SumarryPatientDetail