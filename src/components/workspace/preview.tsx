"use client";

import { useGetProfileData } from "@/hooks/workspace";
import Image from "next/image";
import { CheckCheck, Copy, Rocket, Star } from "lucide-react";
import Link from "next/link";
import { socialPlatforms } from "@/utils";
import { ModeToggle } from "../theme-toggle";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

interface PreviewProps {
    workspace: string
}

const Preview = ({ workspace }: PreviewProps) => {
    const pathname = usePathname();
    const { data, isPending } = useGetProfileData(workspace);
    const [copy, setCopy] = useState<boolean>(false);

    const redirectPath = pathname.split('/').filter(Boolean)?.[0];

    useEffect(() => {
        if (copy) {
            const timer = setTimeout(() => {
                setCopy(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [copy]);

    if (isPending) {
        return (
            <div className="w-full min-h-100 p-6 flex items-center justify-center">
                Loading...
            </div>
        )
    }

    const handleCopy = () => {
        const currentPath = pathname.split('/').filter(Boolean)?.[0];
        const copyPath = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${currentPath}`;
        navigator.clipboard.writeText(copyPath);
        setCopy(true);
    }


    const name = `${data?.profileData?.firstName} ${data?.profileData?.lastName}`;
    return (
        <div className="w-full min-h-auto p-6 flex">
            <div className="flex flex-col gap-2">
                <span className="text-2xl font-sans font-medium tracking-tight">Preview !</span>
                <span className="text-[12px] font-sans font-medium tracking-tight w-[80%]">See the realTime changes while development!</span>
            </div>

            {/* main Preview Box */}
            <div className="w-[70%] h-120 bg-black rounded-[30px] border border-[#3b3b3f] py-10 relative overflow-y-auto hidden-scrollbar">
                <div className="w-full flex items-center justify-between px-5 absolute top-0 py-5">
                    <ModeToggle />
                    <div className="border border-zinc-700 size-7.5 transition-all ease-in-out duration-200 hover:bg-zinc-800/50 rounded-full flex justify-center items-center">
                        {copy ? (
                            <CheckCheck size={15} className="text-green-400" />
                        ) : (
                            <Copy onClick={handleCopy} size={15} className="" />
                        )}
                    </div>
                </div>

                <div className="w-full flex flex-col items-center pt-8">
                    <div className="size-18 rounded-full flex items-center justify-center bg-zinc-700 border border-zinc-600 relative">
                        <Image height={20} width={20} unoptimized src={`${data?.profileData?.imageUrl}`} alt="profile image" className="size-16 rounded-full" />

                        <div className="size-5.5 bg-slate-800 absolute rounded-full flex items-center justify-center right-[-5px] bottom-0">
                            <div className="size-4 bg-green-400 rounded-full flex items-center justify-center mb-0.4">
                                <div className="size-1.5 bg-white rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <p className="text-xl font-sans font-semibold tracking-tight text-[#f3f3f3]">
                            {name}
                        </p>
                        <p className="text-[14px] font-sans font-medium tracking-tight text-zinc-400 flex justify-center">
                            @{workspace}
                        </p>
                    </div>

                    <div className="pt-10 flex gap-3">
                        {data?.profileData?.socialLink?.map(({ platform, url }: { platform: string; url: string }, idx: number) => {
                            const matched = socialPlatforms.find(
                                (p) => p.value.toLowerCase() === platform.toLowerCase()
                            );

                            if (!matched) return null;
                            const Icon = matched.icon;

                            return (
                                <Link
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-600 transition-colors border border-zinc-800 rounded-[8px] bg-zinc-900/80 size-9 flex justify-center items-center"
                                >
                                    <Icon className="w-5 h-5 size-4" />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="w-full px-5 pt-8 pb-6 flex flex-col justify-center gap-3">
                        {data?.profileData?.link.map(({ description, profileImageUrl, title, url }: { description: string | null; profileImageUrl: string | null; title: string; url: string }, idx: number) => (
                            <Link href={url} key={idx} target="_blank" className="w-full flex justify-center items-center relative bg-white h-11 rounded-[8px]">
                                <Image src={`${profileImageUrl}`} unoptimized height={20} width={20} alt="link profile" className="w-9 h-9 rounded-full absolute left-3" />
                                <span className="text-zinc-900 font-sans font-medium tracking-tight text-[16px]">{title}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="px-20 w-full">
                        <Separator className="w-full bg-white/20" />
                    </div>

                    <div className="w-full min-h-10 flex justify-between items-center px-5">
                        <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${redirectPath}`} target="_blank" className="w-full min-h-10 flex justify-between items-center px-10 bg-white/10 backdrop-opacity-30 backdrop-blur-[10px] rounded-[8px] cursor-pointer hover:bg-white/15 mt-6 transition-all ease-in-out duration-200">
                            <Rocket size={18} />
                            <p className="text-[13px] font-sans font-medium">{`Join ${data?.profileData?.firstName} on Plantly`}</p>
                            <Star size={18} className="text-yellow-400 hover:fill-yellow-400 cursor-pointer" />
                        </Link>
                    </div>

                    <div className="flex justify-center items-center gap-3 text-[11px] font-normal font-sans text-zinc-400 p-3">
                        <p className="hover:underline cursor-pointer">Report</p>
                        <p className="hover:underline cursor-pointer">Privacy</p>
                        <p className="hover:underline cursor-pointer">Terms</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview;