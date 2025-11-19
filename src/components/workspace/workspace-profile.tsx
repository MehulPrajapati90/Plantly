"use client";

import { useGetUserByUsername } from "@/hooks/workspace";
import { Eye, HomeIcon, Instagram, Pen, Plus, Settings2, Share2 } from "lucide-react";
import Image from "next/image";
import Hint from "../ui/hint";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useProfileImageModal, useShareModal, useSocialLinksModal, useUserProfileModal } from "@/store/workspace";

interface WorkspaceProfileProps {
    workspace: string
}

const WorkspaceProfile = ({ workspace }: WorkspaceProfileProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const { setIsProfile } = useProfileImageModal();
    const { data, isPending } = useGetUserByUsername(workspace);
    const { setIsSocialLinks } = useSocialLinksModal();
    const { setIsShare, setActiveWorkspace } = useShareModal();
    const profilePhoto = data?.user?.imageUrl;
    const { setIsUserProfile } = useUserProfileModal();

    if (isPending) {
        return (
            <div className="p-10 flex justify-center items-center">Loading...</div>
        )
    }

    const handlePreview = () => {
        router.push(`/${workspace}`);
    }

    const handleShare = () => {
        setActiveWorkspace(workspace);
        setIsShare();
    }

    const handleUpdateUserProfile = () => {
        setIsUserProfile();
    }

    const handleSocialLinks = () => {
        setIsSocialLinks();
    }

    return (
        <div className="p-5 flex items-center">
            <div className="flex items-center gap-2">
                <Hint label="profile image" align="center">
                    <div className="flex justify-center items-center bg-white w-17 h-17 rounded-full relative">
                        <Image height={5} width={5} unoptimized src={`${profilePhoto}`} alt="profile-logo" className="h-15 w-15 rounded-full" />
                        <div onClick={setIsProfile} className="absolute bottom-0 right-0">
                            <Plus size={20} className="bg-slate-900 text-red-100 rounded-full border border-white hover:bg-slate-700 transition-all ease-in-out duration-200" />
                        </div>
                    </div>
                </Hint>
                <div className="flex items-center gap-2">
                    <div>
                        <p className="text-[15px] font-sans font-medium">{workspace}</p>
                        <p className="text-[13px] font-sans font-normal text-zinc-400 leading-5">add your bio here ...</p>
                    </div>

                    <Hint label="Update profile">
                        <div onClick={handleUpdateUserProfile}>
                            <Pen size={16} className="text-zinc-400 mb-3.5" />
                        </div>
                    </Hint>
                </div>
            </div>

            <div className="h-10 px-10">
                <Separator orientation="vertical" />
            </div>

            <div className="flex justify-center items-center gap-1">
                <Hint label="Share" asChild>
                    <Button onClick={handleShare} className="bg-transparent hover:bg-zinc-700 text-zinc-400 hover:text-white">
                        <Share2 size={18} />
                    </Button>
                </Hint>
                <Hint label="social links" asChild>
                    <Button onClick={handleSocialLinks} className="bg-transparent hover:bg-zinc-700 text-zinc-400 hover:text-white">
                        <Instagram size={18} />
                    </Button>
                </Hint>
                <Hint label="Settings" asChild>
                    <Button className="bg-transparent hover:bg-zinc-700 text-zinc-400 hover:text-white">
                        <Settings2 size={18} />
                    </Button>
                </Hint>
                <Hint label="Home" asChild>
                    <Button onClick={() => router.push('/')} className="bg-transparent hover:bg-zinc-700 text-zinc-400 hover:text-white">
                        <HomeIcon size={18} />
                    </Button>
                </Hint>
                <Hint label="Preview" asChild>
                    <Button onClick={handlePreview} className="bg-transparent hover:bg-zinc-700 text-zinc-400 hover:text-white">
                        <Eye size={18} />
                    </Button>
                </Hint>
            </div>
        </div>
    )
}

export default WorkspaceProfile;