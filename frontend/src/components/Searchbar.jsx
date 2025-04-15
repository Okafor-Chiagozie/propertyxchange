import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'

const Searchbar = ({ filter, setFilter }) => {
    return (
        <div className='flex items-center justify-center w-full py-4'>
          {/* <h1 className='text-center mb-6'>
            <span className='text-4xl font-bold text-secondary'>Find</span>
            <span className='text-4xl font-bold text-gray-600'>Search</span>
            <span className='text-4xl font-bold text-secondary'>Residences</span>
          </h1> */}
          <div className='flexBetween pl-6 h-[3.3rem] bg-white w-[min(800px,100%)] rounded-full ring-[0.5px] ring-secondary shadow-lg '>
              <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder='Enter residency name/state/country' className='bg-transparent border-none outline-none w-full' />
              <FaLocationDot className='relative right-4 text-xl hover:text-secondary cursor-pointer'/>
          </div>
        </div>
    )
}

export default Searchbar