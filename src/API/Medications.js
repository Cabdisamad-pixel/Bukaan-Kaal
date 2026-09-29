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

export const takedWeek = async ({ id, weekNumber }) => {


    const { data, error } = await supabase
        .from('weeks')
        .update({ status: 'taken' })
        .eq('patientId', id)
        .eq('weekNumber', weekNumber)
        .select()



    if (error) console.log(error)


    return data
}


export const UpdateMedicine = async (values) => {

    const { data, error } = await supabase
    .from('Medications')
    .update({ 'dosage': values.dosage,  'frequency': values.frequency})
    // .update({  })
    .eq('id',values.id)
    // .eq('weekNumber',values.weekNumber)
    .select()
    
    console.log(values);

    if(error) throw new Error('could notbe updated')

    return data
}

export const DeleteMedicine = async (medicineId) => {

    const { data, error } = await supabase
        .from('Medications')
        .delete()
        .eq('id', medicineId)

    if (error) {
        console.error('Error deleting medicine:', error);
        throw error;
    }

    return data;
}