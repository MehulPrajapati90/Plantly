"use client"

import type React from "react"

import { SidebarProvider } from "@/components/ui/sidebar"

interface Props {
    children: React.ReactNode,
    defaultOpen?: boolean
}

export function SidebarWrapper({
    children,
    defaultOpen = true,
}: Props) {
    return <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
}