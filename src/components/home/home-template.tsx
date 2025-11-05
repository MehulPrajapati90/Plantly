import { ArrowRight } from 'lucide-react'
import React from 'react'

const HomeTemplate = () => {
    return (
        <div className='flex items-center justify-center gap-2 bg-zinc-900 px-4 py-1 rounded-[25px] cursor-pointer hover:bg-[#1c1c1c]'>
            <div className='bg-blue-500 size-2.5 rounded-full animate-pulse'>
            </div>
            <p className='text-[13px] tracking-[-0.3px] font-sans font-normal'>An Application which can take you so far in your journey!</p>
            <ArrowRight size={16} />
        </div>
    )
}

export default HomeTemplate