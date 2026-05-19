import React from 'react'
import { useSearchParams } from 'react-router'

const Filter = () => {

    const [searchPrams, setSearchPrams] = useSearchParams();

    const activeFilter = searchPrams.get('filter') || 'all'

    // console.log(activeFilter);
    

    const handleFilter = (e) => {

        searchPrams.set('filter',e);
        setSearchPrams(searchPrams);
    }

  return (
    <>
        {/* container */}
        <div className='flex justify-start items-center gap-6 bg-white border border-gray-200 w-[18rem] h-11 p-1   rounded'>
            <span className={`hover:cursor-pointer basis-[33%] flex justify-center items-center h-full  ${activeFilter === 'all' && 'bg-sky-500 border border-blue text-white font-mono font-semibold rounded-sm'}`} onClick={() => handleFilter('all')}>All</span>
            <span className={`hover:cursor-pointer basis-[33%] flex justify-center items-center h-full  ${activeFilter === 'stable' && 'bg-sky-500 border border-blue text-white font-mono font-semibold rounded-sm'}`} onClick={() => handleFilter('stable')}>Stable</span>
            <span className={`hover:cursor-pointer basis-[33%] flex justify-center items-center h-full  ${activeFilter === 'critical' && 'bg-sky-500 border border-blue text-white font-mono font-semibold rounded-sm'}`} onClick={() => handleFilter('critical')}>Critical</span>
        </div>
    </>
  )
}

export default Filter