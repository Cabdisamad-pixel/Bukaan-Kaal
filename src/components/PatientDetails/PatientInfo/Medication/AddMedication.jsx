import React from 'react'
import ReactDOM from 'react-dom'
import AddMedicationOverLay from './AddMedicationOverLay';

const BackDropMedicationPortal = ({ OnClose }) => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-10 cursor-pointer' onClick={OnClose}>
        </div>
    )
}

// const AddMedicationOverLay = () => {

//     return(
//         <>
//             <div className='fixed w-[25rem] h-[100%] top-[0%]  right-[0%] bg-white p-6 rounded-lg z-20'>
                
//             </div>
//         </>
//     )
// }




const AddMedication = ({OnClose}) => {

  return (
    <>
    {ReactDOM.createPortal(<BackDropMedicationPortal OnClose={OnClose}/>, document.getElementById('BackDropMedication'))}
    {ReactDOM.createPortal(<AddMedicationOverLay OnClose={OnClose}/>, document.getElementById('Add-Medication-OverLAy'))}
    </>
    
  )

}

export default AddMedication