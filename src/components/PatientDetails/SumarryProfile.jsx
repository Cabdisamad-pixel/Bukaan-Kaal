import React from 'react'
import { FiPhone } from 'react-icons/fi';

const SumarryProfile = ({patient}) => {



    const getInitials = (name) => {
        const apprName = name.split(' ').slice(0, 2).map(word => word[0].toUpperCase());
        return apprName;
        // .split(" ")        // kala jar magacyada
        // .slice(0, 2)       // qaado laba magac
        // .map(word => word[0].toUpperCase()) // xarafka hore ka qaado
        // .join("");         // isku dar
    };

    console.log(getInitials("cabdisamad mohamed")); // CM


    const conditions = [
        {
            id: 1,
            name: 'Diabetes',
            status: 'Active',
        },
        {
            id: 2,
            name: 'Hypertension',
            status: 'Active',
        },
        {
            id: 3,
            name: 'Asthma',
            status: 'Active',
        }, {
            id: 4,
            name: 'Allergy',
            status: 'Active',
        }
    ]

    return (
        <>
            <div id='key' className='w-[20rem] h-[24rem] bg-gray-50 border border-gray-200 rounded-2xl  flex flex-col  gap-3 p-3 cursor-pointer hover:shadow-lg transition'>
                {/* icon name */}

                <div className='flex gap-3'>
                    <div className='w-[3.4rem] h-[3rem] rounded-[50%] bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-700'>
                        {getInitials(patient.firstName+''+patient.lastName)}
                    </div>

                    {/* name & Address */}
                    <div className='w-[9rem] h-auto flex flex-col items-start'>
                        <h2>{patient.firstName} {patient.lastName}</h2>
                        <span>{patient.Address}</span>
                    </div>
                    {/* status */}
                    <span className={`w-20 h-8 rounded-md p-1 flex justify-center items-center ${'safe' === 'safe' ? 'bg-green-200 border border-green-300' : 'bg-red-200 border border-red-300'
                        }`}>
                        safe
                    </span>
                </div>

                {/* grade ka uu maraayo bukaanka */}

                <div className='font-mono  mt-4 text-xl'>
                    grade A +
                </div>

                {/* tell Address */}

                <div className='text-sm text-gray-600 flex items-center gap-2 mt-2'>

                    <FiPhone size={20} />
                    <p>Tell: {patient.mobileNumber}</p>
                </div>

                {/* Doctor of this patient */}
                <div className='text-sm text-gray-600 flex items-center gap-2 mt-2'>

                    <p>Doctor : Caaqil</p>
                </div>

                <hr />

                {/* active conditions */}

                <div>
                    <span>Active Conditions</span>
                    {/* container of conditions */}
                    <div className='flex gap-2 mt-2 flex-wrap'>
                        {conditions.map((condition) => {
                            return <div key={condition.id} className='p-[4px] rounded-md bg-gray-200 border border-gray-300'>
                                <span>{condition.name}</span>
                            </div>

                        })}
                    </div>
                </div>

            </div>
        </>
    )
}

export default SumarryProfile