import { useState } from "react";
import supabase from "./supabase"


export const GetPatientInfo = async () => {

    let { data: PatientInfo, error } = await supabase
        .from('PatientInfo')
        .select('*')

    if (error) {
        throw new Error('Patient info could not be fetched')
        // console.error(error)         
    }
    return PatientInfo;
}

// get Onr patient info by id
export const GetEmailIsExist= async (email) => {
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



