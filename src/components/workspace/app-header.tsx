"use client"

import { ModeToggle } from '@/components/theme-toggle'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

const AppHeader = () => {
    const pathname = usePathname();
    const splitedPathName = pathname.split("/").pop()?.split("/") || [];
    const currentPage = splitedPathName[splitedPathName.length - 1]

    return (
        <header className="flex min-h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="flex flex-1 items-center justify-between h-full">
                <BreadcrumbList className="flex items-center h-full">
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
                <div className='flex justify-center items-center gap-4 px-2'>
                    <ModeToggle />
                    <UserButton />
                </div>
            </Breadcrumb>
        </header>
    )
}

export default AppHeader;