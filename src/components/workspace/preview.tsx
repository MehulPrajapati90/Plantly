"use client";

import { useGetProfileData, useGetUserByUsername } from "@/hooks/workspace";

interface PreviewProps {
    workspace: string
}

const Preview = ({ workspace }: PreviewProps) => {
    const { data, isPending } = useGetProfileData(workspace);

    if (isPending) {
        return (
            <div className="w-full min-h-100 p-6 flex items-center justify-center">
                Loading...
            </div>
        )
    }

    console.log(data?.profileData);
    return (
        <div className="w-full min-h-auto p-6 flex ">
            <div className="flex flex-col gap-2">
                <span className="text-2xl font-sans font-medium tracking-tight">Preview !</span>
                <span className="text-[12px] font-sans font-medium tracking-tight w-[80%]">See the realTime changes while development!</span>
            </div>

            {/* main Preview Box */}
            <div className="w-[70%] min-h-100 bg-black rounded-[30px] border border-[#3b3b3f]">

            </div>
        </div>
    )
}

export default Preview;