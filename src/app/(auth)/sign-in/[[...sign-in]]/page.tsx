import { SignIn } from '@clerk/nextjs'
import { Star } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='w-full min-h-full flex justify-center items-center py-20 gap-5'>
      <div className='relative'>
        <Image width={10} height={10} unoptimized alt='sign-in' src={'https://images.pexels.com/photos/1645668/pexels-photo-1645668.jpeg'} className='min-h-full w-[400px] rounded-[20px]' />
        <div className='absolute top-0 min-h-full w-[400px] rounded-[20px] backdrop-blur-[5px] backdrop-opacity-90 flex flex-col items-center justify-center gap-4'>
          <div className='absolute bottom-5'>
            <div className='flex items-center justify-center'>
              <Star fill='white' className='size-4'/>
              <Star fill='white' className='size-4'/>
              <Star fill='white' className='size-4'/>
              <Star fill='white' className='size-4'/>
              <Star fill='white' className='size-4'/>
            </div>

            <p className='text-[12px] font-sans font-normal'>Start to cater your customers!</p>
          </div>

          <p className='text-3xl font-medium font-sans w-[70%] text-center leading-7 tracking-tight'>Turn Confusion into Clarity today!</p>

          <p className='text-[13px] font-sans font-normal text-center tracking-tight w-[70%] leading-4'>Show your customer that your are the one who can possibily make it happen</p>
        </div>
      </div>
      <SignIn />
    </div>
  )
}