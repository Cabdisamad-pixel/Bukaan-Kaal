import supabase from "./supabase";


export const insertMedications = async (medicationData) => {

    
    const { data, error } = await supabase
    .from('Medications')
    .insert(medicationData)
    .select();
    
    console.log('Inserting medication data:', medicationData); // Debug log to check the data being inserted
    if (error) {
        console.error('Error inserting medication:', error);
        throw error;
    }
    return data;
}

export const GetMedications = async (patientId, weekNumber) => {

    const { data, error } = await supabase
    .from('Medications')
    .select('*')
    .eq('patientId', patientId)
    .eq('weekNumber', weekNumber)
    // .eq('weekNumber', weekNumber);
    console.log(patientId, weekNumber);

    if (error) {
        console.error('Error fetching medications:', error);
        throw error;
    } 
    return data;
}

