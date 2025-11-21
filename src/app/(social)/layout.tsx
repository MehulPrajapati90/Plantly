"use client";

import React, { Suspense } from 'react'

const CommunityLayout = ({ children }: { children: React.ReactNode }
) => {
    return (
        <div className='min-h-screen w-full bg-[#101114]'>
            <div className="grid lg:grid-cols-4 md:grid-cols-6 grid-cols-1 border-b w-full">
                <div className="h-40 border-b" />
                <div className='lg:col-span-2 md:col-span-4 col-span-1 border min-h-screen'>
                    <div className='w-full border-b h-40  md:block hidden'>

                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        {children}
                    </Suspense>
                </div>
                <div className="h-40 border-b md:block hidden" />
            </div>
        </div>
    )
}

export default CommunityLayout;