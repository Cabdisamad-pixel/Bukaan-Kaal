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
export const GetOnePatientInfo = async (id) => {
    let { data, error } = await supabase
        .from('PatientInfo')
        .select('*')
        .eq('id', id)

    if (error) {
        throw new Error('Patient info could not be fetched')
    }
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
