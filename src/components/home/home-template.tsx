import { ArrowRight } from 'lucide-react'
import React from 'react'

const HomeTemplate = () => {
    return (
        <div className='flex items-center justify-center gap-2 bg-white border border-[#e5e7ef] px-4 py-1.5 rounded-[25px] cursor-pointer hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4e7bff] focus-visible:outline-offset-2 transition'>
            <div className='bg-[#4e7bff] size-2.5 rounded-full animate-pulse'></div>
            <p className='text-[13px] tracking-[-0.3px] font-sans font-normal text-[#0f172a]'>Plantly keeps every profile tidy and ready</p>
            <ArrowRight size={16} className='text-[#0f172a]' />
        </div>
    )
}

export default HomeTemplate