import { useQuery } from '@tanstack/react-query'
import GetAllNames from '../../API/getAllNames'
import TableRow from './TableRow';
import LoadingSpinner from '../../../UI/LoadingSpinner';

const Table = () => {


    const {data,isLoading, isError } = useQuery({
        queryKey : ['names'],
        queryFn : GetAllNames
    })

    console.log(data);
    

    // const tableData = [
    //     {
    //         patientId: 1,
    //         patientName: 'dcsaAS',
    //         patientPhone: 67677878,
    //         patientEmail: 'sdcnjsdjcns',
    //         patientStatus: 'caafimaaday',
    //     },
    //     {
    //         patientId: 2,
    //         patientName: 'cabdikariim',
    //         patientPhone: 67878,
    //         patientEmail: 'cabdikariim',
    //         patientStatus: 'caafimaadin',
    //     },
    //     {
    //         patientId: 3,
    //         patientName: 'maxamed',
    //         patientPhone: 6000000,
    //         patientEmail: 'maxamed',
    //         patientStatus: 'caafimaaday',
    //     },
    //     {
    //         patientId: 4,
    //         patientName: 'jonas',
    //         patientPhone: 6000000,
    //         patientEmail: 'maxamed',
    //         patientStatus: 'caafimaaday',
    //     },
    //     {
    //         patientId: 5,
    //         patientName: 'maxmiller',
    //         patientPhone: 6000000,
    //         patientEmail: 'maxamed',
    //         patientStatus: 'caafimaaday',
    //     },
    //     {
    //         patientId: 6,
    //         patientName: 'cabdisamad',
    //         patientPhone: 67677878,
    //         patientEmail: 'sdcnjsdjcns',
    //         patientStatus: 'caafimaaday',
    //     },
    //     {
    //         patientId: 7,
    //         patientName: 'cabdikariim',
    //         patientPhone: 67878,
    //         patientEmail: 'cabdikariim',
    //         patientStatus: 'caafimaadin',
    //     },
    //     {
    //         patientId: 8,
    //         patientName: 'maxamed',
    //         patientPhone: 6000000,
    //         patientEmail: 'maxamed',
    //         patientStatus: 'caafimaaday',
    //     },
    //     {
    //         patientId: 9,
    //         patientName: 'jonas',
    //         patientPhone: 6000000,
    //         patientEmail: 'maxamed',
    //         patientStatus: 'caafimaaday',
    //     },
    //     {
    //         patientId: 10,
    //         patientName: 'maxmiller',
    //         patientPhone: 6000000,
    //         patientEmail: 'maxamed',
    //         patientStatus: 'caafimaaday',
    //     }
    // ]
    // if(error){
    //     console.error(error)
    // }
    // if(isLoading){
    //     return<h1>Is loading </h1>
    // }
    console.log(data);
    console.log(isError);
    
    
    return (
        <div className='w-full h-auto'>
            <table className='w-full flex flex-col gap-1'>
                {/* table head */}


                <tr className='w-full flex justify-between  p-2 text-sm font-sm text-gray-500'>
                    <td className='basis-1/5'>Id</td>
                    <td className='basis-1/5'>Name</td>
                    <td className='basis-1/5'>phone</td>
                    <td className='basis-1/5'>Email</td>
                    <td className='basis-1/12'>Status</td>
                </tr>



                {/* Loading Spinner */}
                
                {isLoading && <LoadingSpinner/>}

                {/* mapping to the patientsData */}



                {data?.map((patient,key) =>{
            
                    return (
                        <TableRow patient={patient} key={key}/>
                    )
                })}

            </table>
        </div>
    )
}

export default Table