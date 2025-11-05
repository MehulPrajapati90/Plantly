import Navbar from '@/components/layout/navbar';
import React from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main className='w-full min-h-full flex justify-center items-center'>
            {children}
          </main>

          {/* Footer */}
        </>
    )
}

export default HomeLayout;