// import supabase from './supabase'

import supabase from "./supabase"

export const GetWeeks = async () => {



    let { data: weeks, error  } = await supabase
        .from('weeks')
        .select('*')


    if (error) {
        throw new Error('Weeks could not be fetched')
        // console.log(error);
    }
    return weeks
}



export const GetMedications = async () => {


    let { data: Medications, error } = await supabase
        .from('Medications')
        .select('*')


    if ( error ) {
        throw new Error('Medications could not be fetched')
    }    

    return Medications
}

export const selectALlMedicalRecords = async() => {
    let { data: MedicalRecords, error } = await supabase
        .from('MedicalRecords')
        .select('*')
    
        
    if(error){
        throw new Error('medical records could not be selected')
    }

    return MedicalRecords
}

export const insertPatientMedicalRecord = async (record) => {

    
const { data, error } = await supabase
  .from('MedicalRecords')
  .insert([record])
  .select()
          
   if(error){
    throw new Error(error)
   }

}