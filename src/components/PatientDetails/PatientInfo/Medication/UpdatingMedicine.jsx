import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { UpdateMedicine } from "../../../../API/Medications";
import LoadingSpinner from "../../../../UI/LoadingSpinner";

export const BackDropUpdatingMedicinePortal = ({ OnClose }) => {

    // const [searchParams, setSearchParams] = useSearchParams();

    // const removePrams = () => {
    //     const params = new URLSearchParams(searchParams);
    //     params.delete("week");
    //     setSearchParams(params);
    // }

    return (
        <>
            <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-10 cursor-pointer' onClick={OnClose}>
            </div>
        </>
    )
}

export const UpdatingMedicineOverLay = ({ OnClose, id }) => {

    const { register, handleSubmit } = useForm();

    const { id: patientID, weekId } = useParams()
    console.log(patientID, weekId);

    const queryClient = useQueryClient()

    // updating medicine query
    const { mutate: mutateMedicine, isLoading : isUpatingMedicine } = useMutation({
        mutationFn: UpdateMedicine,
        onSuccess: (data) => {
            toast.success('succefully updated')
            queryClient.invalidateQueries(['medications', patientID, weekId])
            OnClose();
        },
        onError: () => {
            toast.error('this medicine could not be updated')
        }
    })

    const customSubmitHandler = (data) => {

        const values = {
            id: id,
            dosage: data.dosage,
            frequency: data.frequency
        }

        mutateMedicine(values)
    }

    return (
        <>
            {
                isUpatingMedicine && <LoadingSpinner/>
            }
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-20'>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(customSubmitHandler)}>

                    <h2 className='text-xl font-bold mb-4'>Update this medicine</h2>
                    <p className='text-gray-600 mb-4'>choose the right dose and frequency for this patient</p>
                    <span>dose</span>
                    <div className='flex justify-between items-center gap-8 border h-14 p-1 bg-gray-200 border-gray-300 rounded-md w-[25rem]'>

                        <div className='flex  basis-[30%] justify-start items-center h-full '>
                            <input {...register('dosage')} type="radio" id="250mg" name="dosage" value="250mg" className='hidden peer' />
                            <label htmlFor="250mg" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-blue-500 peer-checked:rounded peer-checked:text-white'>250mg</label>
                        </div>

                        <div className='flex  basis-[30%] justify-start items-center h-full'>
                            <input {...register('dosage')} type="radio" id="500mg" name="dosage" value="500mg" className='hidden peer' />
                            <label htmlFor="500mg" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-blue-500 peer-checked:rounded peer-checked:text-white'>500mg</label>
                        </div>
                        <div className='flex  basis-[30%] justify-start items-center h-full'>
                            <input {...register('dosage')} type="radio" id="1000mg" name="dosage" value="1000mg" className='hidden peer' />
                            <label htmlFor="1000mg" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-blue-500 peer-checked:rounded peer-checked:text-white'>1000mg</label>
                        </div>
                    </div>
                    {/* Frequency */}
                    <span>Frequency</span>
                    <div className='flex justify-between items-center gap-8 border h-14 p-1 bg-gray-200 border-gray-300 rounded-md w-[25rem]'>

                        <div className='flex  basis-[30%] justify-start items-center h-full '>
                            <input {...register('frequency')} type="radio" id="once" name="frequency" value="once" className='hidden peer' />
                            <label htmlFor="once" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-blue-500 peer-checked:rounded peer-checked:text-white'>once</label>
                        </div>

                        <div className='flex  basis-[30%] justify-start items-center h-full'>
                            <input {...register('frequency')} type="radio" id="twice" name="frequency" value="twice" className='hidden peer' />
                            <label htmlFor="twice" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-blue-500 peer-checked:rounded peer-checked:text-white'>twice</label>
                        </div>
                        <div className='flex  basis-[30%] justify-start items-center h-full'>
                            <input {...register('frequency')} type="radio" id="three times" name="frequency" value="three times" className='hidden peer' />
                            <label htmlFor="three times" className='h-full w-full flex justify-center items-center cursor-pointer px-2 py-1 peer-checked:bg-blue-500 peer-checked:rounded peer-checked:text-white'>three times</label>
                        </div>
                    </div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded block mt-4 w-full'> Update Medicine
                    </button>
                </form>
            </div>
        </>
    )
}


const UpdatingMedicine = ({ OnCloseUpdateMedicinePortal, id }) => {

    // console.log(id);


    return (
        <>
            {createPortal(<BackDropUpdatingMedicinePortal OnClose={OnCloseUpdateMedicinePortal} />, document.getElementById('portal-root'))}
            {createPortal(<UpdatingMedicineOverLay OnClose={OnCloseUpdateMedicinePortal} id={id} />, document.getElementById('portal-root'))}
        </>
    )
}

export default UpdatingMedicine