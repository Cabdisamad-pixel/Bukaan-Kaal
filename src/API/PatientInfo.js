import { useState } from "react";
import supabase from "./supabase"
import { useSearchParams } from "react-router";


const PAGE_SIZE = 6;


export const GetPatientsDataTable = async (page) => {


    
    let query =  supabase
    .from('PatientInfo')
    .select('* ',{count:'exact'})
    

    
    if (page !== null || page !== undefined) {
        
        const from = (page - 1 )  * PAGE_SIZE
    
        const to = (page * PAGE_SIZE) -1 > 20 ? 20 : (page * PAGE_SIZE) -1
        query.range(from, to)
    }    


    const { data: PatientInfo, error, count } = await query    

    if (error) {
        throw new Error('Patient info could not be fetched')
        // console.error(error)         
    }

    // console.log(count);
    

    return {PatientInfo, count};
}

export const GetPatientInfo = async (filter) => {

    let query = supabase
        .from('PatientInfo')
        .select('* , MedicalRecords!inner(patientStatus)')
        
        
        
        if (filter) {
            if (filter.filterField === 'patientStatus') {
            query = query[filter.method]('MedicalRecords.patientStatus', filter.filterValue)
        }
        else {
            query = query[filter.method](filter.filterField, filter.filterValue)
        }
    }

    const { data: PatientInfo, error } = await query

    // console.log(filter !== null);


    if (error) {
        throw new Error('Patient info could not be fetched')
        // console.error(error)         
    }

    return PatientInfo;
}



// get Onr patient info by id
export const GetEmailIsExist = async (email) => {
    let { data, error } = await supabase
        .from('PatientInfo')
        .select('*')
        .eq('email', email)


    if (error) {
        throw new Error('Patient info could not be fetched')
    }
    console.log(data);

    return data;
}

export const insertPatientInfo = async (PatientInfo) => {

    const { data, error } = await supabase
        .from('PatientInfo')
        .insert([PatientInfo])
        .select()


    if (error) {
        throw new Error('Patient info could not be inserted')

    }
}



