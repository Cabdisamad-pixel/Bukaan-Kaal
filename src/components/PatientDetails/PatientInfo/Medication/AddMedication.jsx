import React from 'react'
import ReactDOM from 'react-dom'
import AddMedicationOverLay from './AddMedicationOverLay';

const BackDropMedicationPortal = ({ OnClose }) => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-10 cursor-pointer' onClick={OnClose}>
        </div>
    )
}





const AddMedication = ({OnClose, existingMedications}) => {

  return (
    <>
    {ReactDOM.createPortal(<BackDropMedicationPortal OnClose={OnClose}/>, document.getElementById('portal-root'))}
    {ReactDOM.createPortal(<AddMedicationOverLay existingMedications={existingMedications} OnClose={OnClose}/>, document.getElementById('portal-root'))}
    </>
    
  )

}

export default AddMedication