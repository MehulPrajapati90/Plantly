"use client";

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useWorkspaceModel } from '@/store/workspace';
import { useCheckUsername, useClaimUsername } from '@/hooks/workspace';
import { CheckCheck, LoaderCircle, Trash, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { OurFileRouter, UploadDropzone } from "@/lib/uploadThings";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Hint from '../ui/hint';
import Image from 'next/image';

const CreateWorkspaceModal = () => {
    const router = useRouter();
    const { mutateAsync, isPending } = useCheckUsername();
    const { mutateAsync: claimAsync, isPending: isLoading } = useClaimUsername();
    const { setIsWorkspace, isWorkspace } = useWorkspaceModel();
    const [username, setUsername] = useState<string>("");
    const [suggestion, setSuggestion] = useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const [workspaceImage, setWorkspaceImage] = useState("");
    const [workpaceProfileName, setworkpaceProfileName] = useState("");

    const handleRemove = async () => {
        setWorkspaceImage("");
    }

    const handleCheckUsername = async () => {
        const res = await mutateAsync(username.trim());

        if (res.success && res?.suggestion?.length! > 0) {
            setSuggestion(res?.suggestion!)
        } else if (res.success && res?.suggestion?.length === 0) {
            // setAvailable(true);
        } else {
            setError(res?.error!);
        }
    }

    const handleClaimUsername = async () => {
        const res = await claimAsync({
            imageUrl: workspaceImage,
            profileName: workpaceProfileName,
            username: username,
        });

        if (res.success) {
            toast.success(res.message);

            router.push(`/${res?.username}/workspace`);
        } else {
            toast.error(res.error);
        }
        setSuggestion([]);
        setUsername("");
    }

    useEffect(() => {
        if (!username.trim()) {
            setSuggestion([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            handleCheckUsername();
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [username]);

    return (
        <Dialog open={true} >
            <DialogContent className='sm:max-w-[480px] bg-[#0b1021] text-white border border-white/10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]'>
                <DialogHeader>
                    <DialogTitle className="text-white">Create new Workspace</DialogTitle>

                    <DialogDescription className='text-[12.5px] leading-4 text-white/70'>
                        proceed and enter a unique identifier!
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col justify-start items-center gap-3 min-h-auto pt-2'>
                    <div className="flex flex-col justify-center items-start min-h-auto w-full gap-[5px]">
                        <Label htmlFor="username" className="font-sans font-normal text-[12px] text-white/80">Workspace name</Label>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="accent-blue-500 bg-white/5 border-white/15 text-white placeholder:text-white/50 focus-visible:ring-[#4e7bff]"
                        />
                    </div>
                </div>
                {suggestion.length > 0 && (
                    <div className='flex justify-start items-center px-2'>
                        <p className='text-[13px] text-[#f97316] font-medium pr-5'>Suggestions</p>
                        <Separator orientation='vertical' />
                        {suggestion.map((item) => (
                            <Button key={item} onClick={() => setUsername(item)} variant={"link"} className='text-[13px] text-white/80 font-normal hover:text-white'>{item}</Button>
                        ))}
                    </div>
                )}

                <div className='flex flex-col justify-start items-center gap-3 min-h-auto'>
                    <div className="flex flex-col justify-center items-start min-h-auto w-full gap-[5px]">
                        <Label htmlFor="username" className="font-sans font-normal text-[12px] text-white/80">Workspace profile name</Label>
                        <Input
                            id="profile name"
                            type="text"
                            value={workpaceProfileName}
                            onChange={(e) => setworkpaceProfileName(e.target.value)}
                            className="accent-blue-500 bg-white/5 border-white/15 text-white placeholder:text-white/50 focus-visible:ring-[#4e7bff]"
                        />
                    </div>
                </div>
                <div className='gap-3 pt-2'>
                    {workspaceImage ? (
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/15 bg-black/40">
                            <div className="absolute top-2 right-2 z-10">
                                <Hint asChild side="left" label="Remove thumbnail">
                                    <Button type="button" onClick={handleRemove} disabled={isPending} className="h-auto w-auto p-1.5 bg-white/10 hover:bg-white/20">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </Hint>
                            </div>
                            <Image
                                fill
                                alt="workspace image"
                                src={workspaceImage}
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="rounded-xl border border-white/10 bg-white/5 outline-dashed outline-white/20 w-full object-fill">
                            <UploadDropzone<OurFileRouter, "UploadWorkspaceImage">
                                endpoint="UploadWorkspaceImage"
                                appearance={{
                                    label: {
                                        color: "#FFFFFF"
                                    },
                                    allowedContent: {
                                        color: "#FFFFFF"
                                    },
                                    button: {
                                        backgroundColor: "#4e7bff",
                                        padding: "8px 10px"
                                    }
                                }}
                                onClientUploadComplete={(res) => {
                                    setWorkspaceImage(res?.[0].url);
                                }}
                                onUploadError={console.error}
                            />
                        </div>
                    )}
                </div>

                <DialogFooter className="relative w-full flex items-center justify-center px-1">
                    {(isPending || isLoading) && (<LoaderCircle size={20} className="absolute left-4 text-white animate-spin" />)}

                    {!isPending && !isLoading && username && suggestion.length > 0 && (<X className='absolute left-4 text-[#f97316]' />)}

                    {!isPending && !isLoading && username && suggestion.length === 0 && (<CheckCheck className='absolute left-4 text-[#10b981]' />)}

                    <div className="flex gap-2">
                        <Button disabled={isPending || isLoading || !username || suggestion.length > 0 || !workpaceProfileName || !workspaceImage} onClick={handleClaimUsername} className="bg-[#1341D0] hover:bg-[#0f33a6] text-white rounded-[8px]">
                            Claim
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkspaceModal;