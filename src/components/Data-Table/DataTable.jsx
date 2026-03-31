import React from 'react'
import Budget from './Budgets/Budget';
import Table from './Table/Table';
import { Link } from 'react-router';



const DataTable = () => {



  const today = new Date();
  const formattedDate = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');

  return (
    
    <>
      <header className='flex justify-between p-5 h-22 border-b'>
        <h1 className='text-2xl font-medium text-gray-700'>Data Table</h1>
        <Link to={'/AddPatient'}>
          <button className='w-28 bg-indigo-700 text-white rounded h-10'>Add Patient</button>
        </Link>
      </header>


      {/* Patients result & sort */}

      <div className='flex justify-between p-4'>

        {/* Patients result  */}

        <div className='flex flex-col'>
          <h1 className='text-3xl font-medium text-gray-600'>Patients</h1>
          <span className='text-gray-400 text-xs'>18 results found</span>
        </div>


        {/* sorting by A-Z or sorting by date  */}

        <div className='flex gap-3'>
          <select className='border w-36 h-10 text-center rounded-md text-gray-700 text-xs cursor-pointer'>
            <option value="" disabled selected>
              Sort by
            </option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <input type="date" value={formattedDate} className='border w-36 h-10 text-center rounded-md text-gray-700 text-xs cursor-pointer' />

        </div>
      </div>
      <Budget />
      <Table />
    </>


  )
}

export default DataTable