"use client";

import React, { FormEvent, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useProfileImageModal } from '@/store/workspace';
import { OurFileRouter, UploadDropzone } from "@/lib/uploadThings";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Hint from '@/components/ui/hint';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAddProfileImage, useGetUserByUsername, useRemoveProfileImage } from '@/hooks/workspace';
import { toast } from 'sonner';

interface ProfileImageModalProps {
    username: string
}

const ProfileImageModal = ({ username }: ProfileImageModalProps) => {
    const router = useRouter();
    const { data } = useGetUserByUsername(username);
    const { isProfile, setIsProfile } = useProfileImageModal();
    const { mutateAsync, isPending } = useAddProfileImage();
    const { mutateAsync: removeProfileImage, isPending: isRemoving } = useRemoveProfileImage();
    const [thumbnail, setThumbnail] = useState<string | null | undefined>("");

    const handleCloseForm = () => {
        setIsProfile();
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await mutateAsync(thumbnail!);

        if (res.success) {
            toast.success("Profile image updated successfully");
            router.refresh();
            handleCloseForm();
        } else {
            toast.error("Failed to update profile image");
        }
    }

    const handleRemove = async () => {
        const res = await removeProfileImage();

        if (res.success) {
            toast.success("Profile image removed successfully");
            router.refresh();
        } else {
            toast.error("Failed to remove profile image");
        }
    }

    useEffect(() => {
        setThumbnail(data?.user?.imageUrl);
    }, [data?.user?.imageUrl]);

    return (
        <Dialog open={isProfile} onOpenChange={handleCloseForm}>
            <DialogContent className="max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Profile Image</DialogTitle>
                    <DialogDescription className="text-[12.5px] leading-3">
                        Update your profile image easily and securely!
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-14 py-5">
                    <div className="space-y-2">
                        <Label>
                            Thumbnail
                        </Label>
                        {thumbnail ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-10">
                                    <Hint asChild side="left" label="Remove thumbnail">
                                        <Button type="button" onClick={handleRemove} disabled={isPending} className="h-auto w-auto p-1.5">
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image
                                    fill
                                    alt="Thumbnail"
                                    src={thumbnail}
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone<OurFileRouter, "ProfileImageUploader">
                                    endpoint="ProfileImageUploader"
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
                                        setThumbnail(res?.[0].url);
                                    }}
                                    onUploadError={console.error}
                                />
                            </div>
                        )}

                        <div className="flex justify-between">
                            <Button disabled={isPending} variant={"default"} type="submit">
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileImageModal