import React from 'react'
import PremIcon from '../icons/PremIcon'
function Premium() {
  return (
    <>
    <div className='w-full h-screen overflow-hidden p-4 px-6'>
    <div className='flex justify-start items-center gap-1'>
    <PremIcon/>
    <h1 className='font-bold text-2xl'>Premium for you</h1>
    </div>
    <div className='w-full h-full flex flex-col gap-2 justify-center items-center'>
      
      <div className='w-[80%] border-2 p-4 rounded-md flex flex-col gap-2'>
        <h1 className='font-bold text-2xl'>Bronze Plan at ₹<span className='text-blue-500'> 100/Month</span></h1>
        <p>Description: post 3 tweets</p>
        <button className='bg-blue-500 text-white p-2 rounded-md w-full'>Subscribe</button>
      </div>

      <div className='w-[80%] border-2 p-4 rounded-md flex flex-col gap-2'>
        <h1 className='font-bold text-2xl'>Bronze Plan at ₹<span className='text-blue-500'>300/Month</span></h1>
        <p>Description: post 5 tweets</p>
        <button className='bg-blue-500 text-white p-2 rounded-md w-full'>Subscribe</button>
      </div>

      <div className='w-[80%] border-2 p-4 rounded-md flex flex-col gap-2'>
        <h1 className='font-bold text-2xl'>Gold Plan at ₹<span className='text-orange-500'>1000</span></h1>
        <p>Description: post Unlimited tweets</p>
        <button className='bg-blue-500 text-white p-2 rounded-md w-full'>Subscribe</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default Premium