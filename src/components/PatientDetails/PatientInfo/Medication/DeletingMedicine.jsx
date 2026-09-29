import React from 'react'

import { createPortal } from 'react-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';

import { FiAlertTriangle, FiTrash2, FiX } from 'react-icons/fi'
import { DeleteMedicine } from '../../../../API/Medications';
import { useParams } from 'react-router';
import LoadingSpinner from '../../../../UI/LoadingSpinner';





const DeletingMedicineBackdrop = ({ OnClose}) => {

    return (
        <>

            <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-10 cursor-pointer'>
            </div>
        </>
    )
}

const DeletingMedicinePortal = ({ id : medicineId, OnClose }) => {


    const queryClient = useQueryClient();

    const { id : patientId, weekId} = useParams();

    console.log("patient id",patientId, "week id", weekId, "medicine id", medicineId);
    

    const {mutate : deleteMedicine, isLoading: isDeleting} = useMutation({
        mutationFn: () => DeleteMedicine(medicineId),
        onSuccess : () => {
            toast.success("Medicine deleted successfully")
            queryClient.invalidateQueries({queryKey : ['medications']})
        },
        onError : () => {
            toast.error("Medicine not deleted")
        }
    })

    const handleConfirmDelete = () => {
        deleteMedicine()
        OnClose()
    }


    return (
        <>
            {
                isDeleting && <LoadingSpinner/>
            }
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <div className="relative w-full max-w-sm mx-4 bg-[#0B1120] border border-slate-800 rounded-xl shadow-2xl font-['Inter']">
                    {/* Header */}
                    <div className="flex items-start justify-between p-5 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20">
                                <FiAlertTriangle className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-slate-100">
                                    Delete Medicine
                                </h2>
                                <p className="text-xs text-slate-500">
                                    This action cannot be undone
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={OnClose}
                            className="p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
                        >
                            <FiX className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Are you sure you want to delete{" "}
                            <span className="font-mono text-emerald-400">
                                this medicine
                            </span>
                            ? All associated dosage records will be permanently removed.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-800 bg-slate-900/40 rounded-b-xl">
                        <button
                            onClick={OnClose}
                            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleConfirmDelete}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors"
                        >
                            <FiTrash2 className="w-3.5 h-3.5" />
                            Delete Medicine
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}



const DeletingMedicine = ( {id, OnClose} ) => {


    return (

        <>
            {
                createPortal(<DeletingMedicineBackdrop OnClose={OnClose}/>, document.getElementById('portal-root'))
            }
            {
                createPortal(<DeletingMedicinePortal id={id} OnClose={OnClose}/>, document.getElementById('portal-root'))
            }
        </>


    )
}

export default DeletingMedicine