// import supabase from './supabase'

import supabase from "./supabase"

export const GetWeeks = async (patientId) => {



    let { data: weeks, error  } = await supabase
        .from('weeks')
        .select('*').eq('patientId', patientId)


    if (error) {
        throw new Error('Weeks could not be fetched')
        // console.log(error);
    }
    return weeks
}

// export const GetMedicationsByPatientId = async (patientId, weekId) => {
//     const { data, error } = await supabase
//         .from('Medications')
//         .select('*')
//         .eq('patientId', patientId)
//         .eq('weekId', weekId)

//     if (error) {
//         throw new Error('Medications could not be fetched')
//     }

//     return data
// }

export const AddWeek = async (week) => {

    const { data, error } = await supabase
        .from('weeks')
        .insert([week])
        .select()
    if (error) {
        throw new Error('Week could not be added')
    }
    return data;
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