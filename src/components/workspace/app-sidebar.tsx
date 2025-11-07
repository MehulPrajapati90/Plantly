"use client";
import {
    TreesIcon as Tree,
    BarChart3,
    Settings,
    Home,
    BriefcaseBusiness,
    Trees
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarSeparator,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNavItems = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Workspace",
        url: "/dashboard/workspace",
        icon: BriefcaseBusiness,
    },
    {
        title: "Overview",
        url: "/dashboard/overview",
        icon: BarChart3,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader>
                <Link href={"/"} className="flex gap-2 items-center justify-start p-4 ">
                    <div className="text-[20px] font-sans tracking-[-0.5px] font-bold text-zinc-700 dark:text-zinc-100 text-center w-full flex justify-center items-center gap-1">
                        <Trees size={20} /> <h3>Plantly</h3>
                    </div>
                </Link>
                <SidebarSeparator />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        size={"lg"}
                                        isActive={pathname === item.url}
                                    >
                                        <Link href={item.url}>
                                            <>
                                                <item.icon className="size-6 " />
                                                <span className="font-semibold text-base">
                                                    {item.title}
                                                </span>
                                            </>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />
            </SidebarContent>
        </Sidebar>
    );
}