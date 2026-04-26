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

export const insertPatientInfo = async (PatientInfo) => {

    const { data, error } = await supabase
        .from('PatientInfo')
        .insert([PatientInfo])
        .select()


    if (error) {
        throw new Error('Patient info could not be inserted')
                
    }
}
