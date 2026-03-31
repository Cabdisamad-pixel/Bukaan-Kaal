import { data } from "autoprefixer"
import supabase from "./supabase"


const GetAllNames = async () => {

    let { data: names, error } = await supabase
        .from('names')
        .select('*')


    if(error){
        throw new Error('Names could not be fetched')
        // console.error(error)
    }
    console.log(names);
    
    return names
}
export default GetAllNames