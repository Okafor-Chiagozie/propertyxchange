import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { MdOutlineBathtub, MdOutlineBed } from 'react-icons/md'
import { LuToilet } from 'react-icons/lu';
import { CgRuler } from "react-icons/cg"
import { useNavigate } from 'react-router-dom'
import HeartBtn from './HeartBtn'

const Item = ({ property }) => {

    const navigate = useNavigate()
    return (
        <div onClick={()=> navigate(`../listing/${property.id}`)} className='rounded-lg overflow-hidden bg-white ring-1 ring-gray-30/20 shadow-xl'>
            {/* IMAGE */}
            <div className='relative'>
                <img src={property.image} alt={property.title} className='h-[13rem] w-full aspect-square object-cover rounded-md' />
                <div className='absolute top-4 right-6'>
                   <HeartBtn id={property.id}/>
                </div>
                <div className='absolute top-4 left-2 bg-white/80 ring-1 ring-black/30 text-black rounded-full px-3 py-[1px]'>
                   <span className='text-sm'>{property.purpose}</span>
                </div>
            </div>
            {/* INFO */}
            <div className='m-3'>
                <div className='flexBetween'>
                    <span className='px-3 bg-gray-200/70 rounded-lg'>
                      <h5 className='medium-12 my-1 text-secondary'>{property.state}</h5>
                    </span>
                    <h4 className='h4 text-gray-600'><span>₦</span>{((property?.price - (property?.price * property?.discountPercentage / 100)) || 0).toLocaleString()}.00</h4>
                </div>
                <h4 className='bold-18 line-clamp-1 my-1'>{property.title}</h4>
                <div className='flex gap-x-2 py-2 border px-2 w-max rounded-md border-gray-300'>
                    <div className='flexCenter gap-x-2 border-r border-gray-600 pr-4 font-[500]'>
                        <MdOutlineBed /> {property.facilities.bedrooms}
                    </div>
                    <div className='flexCenter gap-x-2 border-r border-gray-600 pr-4 font-[500]'>
                        <MdOutlineBathtub /> {property.facilities.bathrooms}
                    </div>
                    <div className='flexCenter gap-x-2 border-r border-gray-600 pr-4 font-[500]'>
                        <LuToilet /> {property.facilities.toilets}
                    </div>
                    <div className='flexCenter gap-x-2 font-[500]'>
                        <CgRuler /> {property.dimensions}
                    </div>
                </div>
                <p className='pt-2 mb-4 line-clamp-2'>{property.description}</p>
            </div>
        </div>
    )
}

export default Item