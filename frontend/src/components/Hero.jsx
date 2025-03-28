import React from 'react'
import { Link } from "react-router-dom"
import client1 from "../assets/client1.jpg"
import client2 from "../assets/client2.jpg"
import client3 from "../assets/client3.jpg"
import client4 from "../assets/client4.jpg"
import client5 from "../assets/client5.jpg"
import client6 from "../assets/client6.jpg"

const Hero = () => {
  return (
    <section className='max-padd-container bg-hero bg-cover bg-no-repeat min-h-[722px] !h-auto w-full'>
      <div className='relative top-32 xs:top-48'>
        <h1 className='h1 capitalize max-w-[41rem]'>Discover Your <span className='text-orange-500'>Dream</span> <span className='text-blue-700'>Property</span> Today</h1>
        <p className='my-5 max-w-[33rem] text-lg text-gray-900 drop-shadow-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non rerum dolorum cumque magni rem illo quia, autem porro excepturi.</p>
        {/* BUTTON */}
        <div className='inline-flex items-center justify-center gap-4 bg-white rounded ring-1 ring-slate-900/5 mt-4 h-[50px]'>
          <div className='text-center regular-14 leading-tight pl-5 cursor-default'>
            <p className='regular-14'><span className='uppercase font-bold'>10% off</span> On All Properties</p>
          </div>
          <Link to={'/listing'} className='btn-dark !rounded-tl-none !rounded-bl-none !rounded-lg !h-[50px] flex justify-center items-center'>Explore</Link>
        </div>
        <div className='flex flex-col gap-4 mt-10 mb-4 max-w-64'>
          <div className='flex relative'>
            {/* CLIENT IMAGES */}
            <img src={client1} alt="" className='h-[46px] border-2 border-white shadow-sm rounded-full' />
            <img src={client2} alt="" className='h-[46px] border-2 border-white shadow-sm rounded-full absolute left-8' />
            <img src={client3} alt="" className='h-[46px] border-2 border-white shadow-sm rounded-full absolute left-16' />
            <img src={client4} alt="" className='h-[46px] border-2 border-white shadow-sm rounded-full absolute left-24' />
            <img src={client5} alt="" className='h-[46px] border-2 border-white shadow-sm rounded-full absolute left-32' />
            <img src={client6} alt="" className='h-[46px] border-2 border-white shadow-sm rounded-full absolute left-40' />
            <div className='h-[46px] w-[46px] border-2 border-white shadow-sm bg-slate-500/70 text-white absolute left-48 rounded-full flexCenter text-xs font-semibold'>210k+</div>
          </div>
          <div className='h5 !font-semibold max-w-52'>People successfully got their dream homes</div>
        </div>
      </div>
    </section>
  )
}

export default Hero