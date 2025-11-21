"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CheckCheckIcon, Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { useCommunityShareModal } from "@/store/community";

const CommunityShareModal = () => {
    const { activeCommunityProfile, isProfileShare, setActiveCommunityProfile, setIsProfileShare } = useCommunityShareModal();
    const [copy, setCopy] = useState<boolean>(false);
    const handleCloseForm = () => {
        setIsProfileShare();
    }

    const shareAbleUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${activeCommunityProfile}`

    const handleCopy = () => {
        setCopy(true);
        navigator.clipboard.writeText(shareAbleUrl);

        const timer = setTimeout(() => {
            setCopy(false)
        }, 2000);

        return () => clearTimeout(timer);
    }

    return (
        <Dialog open={isProfileShare} onOpenChange={handleCloseForm}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Share Community Profile!</DialogTitle>

                    <DialogDescription className='text-[12.5px] leading-3'>
                        Share peoples community profile with the world, easily!
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col justify-start items-center gap-3 min-h-auto pt-2'>
                    <div className="flex flex-col justify-center items-start min-h-auto w-full gap-[5px]">
                        <Label htmlFor="username" className="font-sans font-normal text-[12px] text-[#f3f3f3]">Community Profile URL</Label>
                        <div className="flex justify-center items-center w-full gap-3">
                            <Input
                                id="username"
                                type="text"
                                defaultValue={shareAbleUrl}
                                // onChange={(e) => setUsername(e.target.value)}
                                className="accent-blue-500"
                            />
                            <div>
                                {copy ? (
                                    <CheckCheckIcon className="text-green-500" size={18} />
                                ) : (
                                    <Copy className="hover:text-green-300" onClick={() => handleCopy()} size={18} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default CommunityShareModal;