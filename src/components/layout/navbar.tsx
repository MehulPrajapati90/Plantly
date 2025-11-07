"use client"

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import UserControl from "./user-controls";
import { Orbit, TreePalm, Trees } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState } from "react";

const Navbar = () => {
    const isSignedInUser = useUser()?.isSignedIn;
    const { theme } = useTheme();
    return (
        <nav className="sticky top-0 left-0 right-0 z-50">
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md dark:border-white/10 transition-all duration-200 hover:bg-white/15 dark:hover:bg-black/15 px-2 md:px-20">
                <div className="px-6 py-4 flex justify-between items-center pt-5 md:pt-8">
                    <div className="flex justify-center items-center">
                        <Link href={"/"} className="flex items-center justify-center gap-20">
                            <div className="flex items-center justify-center gap-1.5">
                                <div>
                                    <Trees size={20} />
                                </div>
                                <span className="font-bold text-xl dark:text-[#f3f3f3] text-[#101114] font-sans tracking-[-1.1px]">
                                    Plantly
                                </span>
                            </div>
                        </Link>
                        <div className="font-normal text-[13px] dark:text-[#f3f3f3] text-[#101114] font-sans flex justify-center items-center gap-3 pl-8">
                            <p>docs</p>
                            <p>community</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <div className="flex h-6 items-center gap-3">
                            <ModeToggle />
                            <Separator orientation="vertical" className="h-6" />
                            <Link href={'https://github.com/MehulPrajapati90/Plantly'} target="_blank">
                                <Button variant={"ghost"} size={"sm"} className="flex justify-center items-center gap-1.5 p-2">
                                    <Image width={5} height={5} className="h-4 w-4" src={`${theme !== 'light' ? '/github-white.svg' : '/github-black.svg'}`} alt="github" />
                                    <p className="text-[13.5px] font-medium text-zinc-500">0k</p>
                                </Button>
                            </Link>
                            <Separator orientation="vertical" className="h-6" />
                            <SignedIn >
                                <UserControl />
                            </SignedIn>
                            <SignedOut>
                                <div className="flex items-center gap-2">
                                    <SignInButton>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="rounded-[6px] text-sm font-sans font-semibold text-[12px] bg-white text-black hover:bg-white/20 dark:hover:bg-black"
                                        >
                                            Sign In
                                        </Button>
                                    </SignInButton>
                                    <SignUpButton>
                                        <Button
                                            size="sm"
                                            className="text-sm font-sans font-normal text-[12px] bg-[#222222] hover:bg-[#363636] text-white rounded-[5px]"
                                        >
                                            Sign Up
                                        </Button>
                                    </SignUpButton>
                                </div>
                            </SignedOut>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar