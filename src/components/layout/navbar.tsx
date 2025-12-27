"use client"

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import UserControl from "./user-controls";
import { Trees } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
    const router = useRouter();

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-[#e5e7ef] shadow-sm">
            <div className="px-4 md:px-10">
                <div className="py-4 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <Link href={"/"} className="flex items-center gap-2 hover:opacity-90 transition">
                            <Trees size={20} className="text-[#0f172a]" />
                            <span className="font-bold text-xl text-[#0f172a] font-sans tracking-[-1.1px]">
                                Plantly
                            </span>
                        </Link>
                        <div className="font-sans text-[13px] text-[#0f172a] flex items-center gap-4">
                            <Link href="https://www.notion.so/Plantly-Docs-2d646f5bd6b880c69814e0558b79776e?source=copy_link" className="hover:text-[#1341D0] transition" target="_blank">docs</Link>
                            <p
                                onClick={() => router.push('/community')}
                                className="cursor-pointer hover:text-[#1341D0] transition"
                            >
                                community
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={'https://github.com/MehulPrajapati90/Plantly'} target="_blank">
                            <Button variant={"ghost"} size={"sm"} className="flex items-center gap-1.5 px-3 py-1.5 text-[#0f172a] hover:bg-[#f5f6fb] rounded-[6px]">
                                <Image width={16} height={16} className="h-4 w-4" src="/github-black.svg" alt="github" />
                                <p className="text-[13.5px] font-medium text-[#475569]">0k</p>
                            </Button>
                        </Link>
                        <SignedIn>
                            <UserControl />
                        </SignedIn>
                        <SignedOut>
                            <div className="flex items-center gap-2">
                                <SignInButton>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-[6px] text-sm font-sans font-semibold text-[12px] text-[#0f172a] hover:bg-[#f5f6fb]"
                                    >
                                        Sign In
                                    </Button>
                                </SignInButton>
                                <SignUpButton>
                                    <Button
                                        size="sm"
                                        className="text-sm font-sans font-semibold text-[12px] bg-[#1341D0] hover:bg-[#0f33a6] text-white rounded-[6px]"
                                    >
                                        Sign Up
                                    </Button>
                                </SignUpButton>
                            </div>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar