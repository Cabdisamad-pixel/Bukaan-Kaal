import React from 'react'
import { FiSettings } from "react-icons/fi";
import { MdMenu } from 'react-icons/md';
import { MdHome, MdInfo } from 'react-icons/md';
import { MdTableChart } from 'react-icons/md';
import { FaBox } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import { FiPower } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import sawir from '../../Assets/sawir.avif'
import { NavLink } from 'react-router';


const Menue = () => {
    return (
        <div className=' flex flex-col bg-gray-300 basis-1/4 h-screen p-1 font-roboto gap-3 fixed top-0 left-0 right-[80%]'>

            {/* user and setting */}


            <div className='flex flex-row gap-3 justify-start items-center h-16 w-full p-1'>
                <img src={sawir} alt="" className='w-14 rounded-full' />
                <div className='flex flex-col text-xs text-gray-500 font-roboto'>
                    welcome back <span className='text-xl text-gray-800 font-bold capitalize'>cabdisamad</span>
                </div>
                <div className='text-xl  bg-gray-100 w-12 h-11 flex justify-center items-center rounded-lg border-solid border-gray-300 border cursor-pointer'>
                    <FiSettings />
                </div>
            </div>





            {/* Home */}
            <NavLink to='./' className={({ isActive }) => isActive ? 'bg-gray-200 text-gray-900 font-bold text-6xl rounded-md' : ''}>
                <ul className='flex   w-full h-12 p-6  justify-around items-center text-sm  text-gray-600'>
                    <div className='flex w-full h-full justify-start items-center gap-6'>
                        <li><MdHome /></li>
                        <li>Home</li>
                    </div>
                    <li><MdMenu /></li>
                </ul>
            </NavLink>
            {/* Data table */}


            <ul className='flex   w-full h-12 p-6  justify-around items-center text-sm  text-gray-600'>
                <div className='flex w-full h-full justify-start items-center gap-6'>
                    <li><MdTableChart /></li>
                    <li>Data table</li>
                </div>
                <li><MdMenu /></li>
            </ul>


            {/* Products */}


            <NavLink to={'./products'} className={({ isActive }) => isActive ? 'bg-gray-200 text-gray-900 font-bold text-6xl rounded-md' : ''}>
                <ul className='flex   w-full h-12 p-6  justify-around items-center text-sm  text-gray-600'>
                    <div className='flex w-full h-full justify-start items-center gap-6'>
                        <li><FaBox /></li>
                        <li>Products</li>
                    </div>
                    <li><MdMenu /></li>
                </ul>
            </NavLink>

            {/* Person Detail  */}


            <NavLink to={'patientDetails/patients'}  className={({ isActive }) => isActive ? 'bg-gray-200 text-gray-900 font-bold text-6xl rounded-md' : ''}>
                <ul className='flex   w-full h-12 p-6  justify-around items-center text-sm  text-gray-600'>
                    <div className='flex w-full h-full justify-start items-center gap-6'>
                        <li><FaUserCircle /></li>
                        <li>Patient Detail</li>
                    </div>
                    <li><MdMenu /></li>
                </ul>
            </NavLink>
            {/* about */}


            <ul className='flex   w-full h-12 p-6  justify-around items-center text-sm  text-gray-600'>
                <div className='flex w-full h-full justify-start items-center gap-6'>
                    <li><MdInfo /></li>
                    <li>About</li>
                </div>
                <li><MdMenu /></li>
            </ul>


            {/* Support */}


            <ul className='flex   w-full h-12 p-6  justify-around items-center text-sm  text-gray-600 mt-36'>
                <div className='flex w-full h-full justify-start items-center gap-6'>
                    <li><FaHeadset /></li>
                    <li>Support</li>
                </div>
            </ul>

            {/* sign Out */}


            <ul className='flex   w-full h-12 p-6 justify-around items-center text-sm  text-gray-600'>
                <div className='flex w-full h-full justify-start items-center gap-6'>
                    <li><FiPower /></li>
                    <li>Sign out</li>
                </div>
            </ul>

        </div>
    )
}

export default Menue