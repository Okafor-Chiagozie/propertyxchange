import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { getProperty, removeBooking } from '../utils/api'
import { PuffLoader } from 'react-spinners'
import { FaLocationDot, FaStar } from 'react-icons/fa6'
import { MdOutlineBathtub, MdOutlineBed, MdCheck, MdClose } from 'react-icons/md'
import { LuToilet } from 'react-icons/lu';
import { CgRuler } from 'react-icons/cg'
import Map from '../components/Map'
import useAuthCheck from '../hooks/useAuthCheck'
import { useAuth0 } from '@auth0/auth0-react'
import BookingModal from '../components/BookingModal'
import UserDetailContext from '../context/UserDetailContext'
import { Button } from '@mantine/core'
import { toast } from 'react-toastify'
import HeartBtn from '../components/HeartBtn'

const Property = () => {
  const [modalOpened, setModalOpened] = useState(false)
  const { validateLogin } = useAuthCheck()
  const { pathname } = useLocation()
  const id = pathname.split('/').slice(-1)[0]
  const { user } = useAuth0()

  const { data, isError, isLoading } = useQuery(["resd", id], () => getProperty(id))

  const { userDetails: { token, bookings }, setUserDetails } = useContext(UserDetailContext)

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }))

      toast.success("Booking cancelled", { position: 'bottom-right' })
    }
  })

  if (isLoading) {
    return (
      <div className='h-64 flexCenter'>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color='#555'
          aria-label='puff-loading'
        />
      </div>
    )
  }
  if (isError) {
    return (
      <div>
        <span>Error while fetching property details</span>
      </div>
    )
  }

  return (
    <section className='max-padd-container my-[99px]'>
      {/* IMAGE */}
      <div className='pb-2 relative'>
        <img src={data?.image} alt={data?.title} className='rounded-xl max-h-[27rem] w-full object-cover aspect-square' />
        {/* LIKE BTN */}
        <div className='absolute top-8 right-8'>
          <HeartBtn id={id}/>
        </div>
        <div className='absolute top-7 left-4 bg-white/80 ring-1 ring-black/30 text-black rounded-full px-3 py-[1px]'>
          <span className='text-sm'>{data?.purpose}</span>
        </div>
      </div>
      {/* CONTAINER */}
      <div className='xl:flexBetween gap-8 mt-4'>
        {/* LEFT SIDE */}
        <div className='flex-1'>
          <div className='flex flex-col md:flex-row gap-y-3 justify-between pt-4 mb-4'>
            <div className='flex flex-col gap-y-2 mb-3'>
              <h4 className='bold-28'>{data?.title}</h4>
              <p className='flexStart gap-x-2 text-base'>
                <FaLocationDot />
                <div className='text-secondary font-bold'>
                  {data?.address}, {data?.state}, {data?.country}
                </div>
              </p>
              <span className='flex items-center justify-start'>
                <span className='font-semibold'>LGA: &nbsp;</span>
                <span className='bold-16 my-1 text-blue-400'>{data?.lga}</span>
              </span>
            </div>

            <div className='flex flex-col gap-y-2'>
              <div className='flex flex-col'>
                <span className='font-bold line-through text-base text-gray-400'>₦{data?.price.toLocaleString()}.00</span>
                <span className='bold-20'>₦{((data?.price - (data?.price * data?.discountPercentage / 100)) || 0).toLocaleString()}.00</span>
              </div>
              <div className='flex items-baseline gap-2 text-orange-500'>
                <h4 className='bold-16 relative bottom-0.5 text-black'>5.0</h4>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
          </div>
          <div className='flex flex-wrap gap-x-4 py-2 px-2'>
            <div className='flexCenter gap-x-2 border-r border-gray-600 pr-4 font-[500]'>
                <MdOutlineBed /> {data?.facilities.bedrooms} <span className='text-gray-500'>bedroom(s)</span>
            </div>
            <div className='flexCenter gap-x-2 border-r border-gray-600 pr-4 font-[500]'>
                <MdOutlineBathtub /> {data?.facilities.bathrooms} <span className='text-gray-500'>bathroom(s)</span>
            </div>
            <div className='flexCenter gap-x-2 border-r border-gray-600 pr-4 font-[500]'>
                <LuToilet /> {data?.facilities.toilets} <span className='text-gray-500'>toilet(s)</span>
            </div>
            <div className='flexCenter gap-x-2 font-[500]'>
                <CgRuler /> {data?.dimensions} <span className='text-gray-500'>sqft</span>
            </div>
          </div>
          <h4 className='mt-4 mb-2 bold-20'>Property Details</h4>
          <p className='mb-4 regular-16'>
            <span className='font-semibold underline'>Property type: </span>
            <span>{data?.type}</span>
          </p>
          <p className='mb-4 regular-16'>{data?.description}</p>
          <p className='mb-6 regular-16 flex flex-wrap gap-x-4'>
            <span className='flex items-center gap-x-2'>
              <span className='font-semibold'>Furnished: </span>
              {data?.furnished ? <span className='text-green-500'><MdCheck /></span> : <span className='text-red-500'><MdClose /></span>}
            </span>
            <span className='flex items-center gap-x-2'>
              <span className='font-semibold'>Parking space: </span>
              {data?.parking ? <span className='text-green-500'><MdCheck /></span> : <span className='text-red-500'><MdClose /></span>}
            </span>
            <span className='flex items-center gap-x-2'>
              <span className='font-semibold'>Serviced: </span>
              {data?.serviced ? <span className='text-green-500'><MdCheck /></span> : <span className='text-red-500'><MdClose /></span>}
            </span>
            <span className='flex items-center gap-x-2'>
              <span className='font-semibold'>Newly built: </span>
              {data?.newlyBuilt ? <span className='text-green-500'><MdCheck /></span> : <span className='text-red-500'><MdClose /></span>}
            </span>
          </p>
          <p className='mb-4 regular-16'>
            <span className='h5 text-black underline'>Extra Features</span>

            <p className='py-3 flex flex-wrap gap-x-2'>
              {data?.extraFeatures
                ?.split(',')
                .map((feature, index) => (
                  <span key={index} className="py-1 px-4 rounded-full bg-gray-200/70 mr-2 mb-2 text-sm font-semibold text-secondary">
                    {feature.trim()}
                  </span>
                ))}
            </p>
          </p>

          {data?.installment == 'Allowed' && (
            <div className='mb-4 regular-16'>
              <span className='h5 text-black underline'>Installment payment</span>

              <div className='py-3 flex flex-wrap gap-x-4'>
                <span>
                  <span className='font-semibold text-base text-secondary'>Initial Payment: </span>
                  <span className='text-base'>₦{data?.initialPayment.toLocaleString()}</span>
                </span>
                <span>
                  <span className='font-semibold text-base text-secondary'>Subsequent Payment: </span>
                  <span className='text-base'>₦{data?.installmentPayment.toLocaleString()}</span>
                </span>
                <span>
                  <span className='font-semibold text-base text-secondary'>Installment Frequency: </span>
                  <span className='text-base'>{data?.installmentFrequency}</span>
                </span>
              </div>
            </div>
          )}

          <div className='flexBetween pt-7'>
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  onClick={() => cancelBooking()}
                  variant='outline'
                  w={"100%"}
                  color='red'
                  disabled={cancelling}
                >
                  Cancel Booking
                </Button>
                <p className='text-red-500 medium-15 ml-3'>
                  You've already Booked visit for {bookings?.filter((booking) => booking?.id === id)[0].date}
                </p>
              </>
            ) : (
              <Button
                onClick={() => {
                  validateLogin() && setModalOpened(true)
                }}
                variant='filled'
                w={"50%"}
                color='black'
                >
                Book visit
              </Button>
            )
            }
            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className='flex-1 mt-10'>
          <Map
            address={data?.address}
            state={data?.state}
            country={data?.country}
          />
        </div>
      </div>
    </section>
  )
}

export default Property