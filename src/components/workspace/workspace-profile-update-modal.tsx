"use client";

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useUserWorkspaceProfileModal } from '@/store/workspace';
import { useRemoveWorkspaceImage, useUpdateWorkspaceProfile } from '@/hooks/workspace';
import { Trash, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { OurFileRouter, UploadDropzone } from "@/lib/uploadThings";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Hint from '../ui/hint';
import Image from 'next/image';

interface UpdateUserWorkspaceModalProps {
    workspacedata: {
        username: string | null;
        user: {
            id: string;
            firstName: string | null;
            lastName: string | null;
            imageUrl: string | null;
            bio: string | null;
        };
        link: {
            title: string;
            url: string;
            description: string | null;
            clickCount: number;
            profileImageUrl: string | null;
        }[];
        imageUrl: string | null;
        profileName: string | null;
        socialLinks: {
            url: string;
            platform: string;
        }[];
    } | null;
    workspace: string
}

const UpdateUserWorkspaceModal = ({ workspace, workspacedata }: UpdateUserWorkspaceModalProps) => {
    const router = useRouter();
    const { mutateAsync, isPending } = useUpdateWorkspaceProfile();
    const { mutateAsync: removeWorkspaceImage, isPending: removeWorkspaceImagePending } = useRemoveWorkspaceImage();
    const { setWorkspaceProfile, isWorkspaceProfile } = useUserWorkspaceProfileModal();
    const [workspaceImage, setWorkspaceImage] = useState("");
    const [workpaceProfileName, setworkpaceProfileName] = useState("");

    const handleRemove = async () => {
        const res = await removeWorkspaceImage(workspace);

        if (res?.success) {
            toast.success(res?.message);
        } else {
            toast.error(res?.error);
        }
        setWorkspaceImage("");
    }

    const handleUpdateUserProfile = async () => {
        const res = await mutateAsync({
            profileName: workpaceProfileName,
            imageUrl: workspaceImage,
            workspace: workspace
        });

        if (res?.success) {
            toast.success(res?.message);
        } else {
            toast.error(res?.error);
        }

        setWorkspaceProfile();
    }

    const handleCloseForm = () => {
        setWorkspaceProfile();
    }

    useEffect(() => {
        if (workspacedata?.user) {
            setworkpaceProfileName(workspacedata?.profileName || "");
            setWorkspaceImage(workspacedata?.imageUrl || "");
        }
    }, [workspacedata, workspace]);

    return (
        <Dialog open={isWorkspaceProfile} onOpenChange={handleCloseForm}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Create new Workspace</DialogTitle>

                    <DialogDescription className='text-[12.5px] leading-3'>
                        proceed and enter a unique identifier!
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col justify-start items-center gap-3 min-h-auto'>
                    <div className="flex flex-col justify-center items-start min-h-auto w-full gap-[5px]">
                        <Label htmlFor="username" className="font-sans font-normal text-[12px] text-[#f3f3f3]">Workspace Name</Label>
                        <Input
                            id="profile name"
                            type="text"
                            value={workspace}
                            disabled
                            className="accent-blue-500"
                        />
                    </div>
                </div>
                <div className='flex flex-col justify-start items-center gap-3 min-h-auto'>
                    <div className="flex flex-col justify-center items-start min-h-auto w-full gap-[5px]">
                        <Label htmlFor="username" className="font-sans font-normal text-[12px] text-[#f3f3f3]">Workspace Profile Name</Label>
                        <Input
                            id="username"
                            type="text"
                            value={workpaceProfileName!}
                            onChange={(e) => setworkpaceProfileName(e.target.value)}
                            className="accent-blue-500"
                        />
                    </div>
                </div>
                <div className='gap-3 pt-2'>
                    {workspaceImage ? (
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                            <div className="absolute top-2 right-2 z-10">
                                <Hint asChild side="left" label="Remove Workspace Image">
                                    <Button type="button" onClick={handleRemove} className="h-auto w-auto p-1.5">
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
                        <div className="rounded-xl border outline-dashed outline-muted w-full object-fill">
                            <UploadDropzone<OurFileRouter, "UpdateProfileImage">
                                endpoint="UpdateProfileImage"
                                input={{ username: workspace }}
                                appearance={{
                                    label: {
                                        color: "#FFFFFF"
                                    },
                                    allowedContent: {
                                        color: "#FFFFFF"
                                    },
                                    button: {
                                        backgroundColor: "#00aeff",
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
                    <div className="flex gap-2">
                        <Button disabled={isPending || !workpaceProfileName || !workspaceImage || removeWorkspaceImagePending} onClick={handleUpdateUserProfile}>Update</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateUserWorkspaceModal;