"use client";

import { useUserProfileModal } from "@/store/workspace";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState, useEffect } from "react";
import { useGetUserByUsername, useUpdateUserProfile } from "@/hooks/workspace";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

interface UserProfileModalProps {
    username: string;
}

const UserProfileModal = ({ username }: UserProfileModalProps) => {
    const { mutateAsync, isPending: UpdatePending } = useUpdateUserProfile();
    const { isUserProfile, setIsUserProfile } = useUserProfileModal();
    const { data, isPending } = useGetUserByUsername(username);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        if (data?.user) {
            setFirstName(data.user.firstName || "");
            setLastName(data.user.lastName || "");
            setBio(data.user.bio || "");
        }
    }, [data]);

    const handleCloseForm = () => {
        console.log(false);
        setIsUserProfile();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(true);

        const data = {
            firstName, lastName, bio
        }

        const response = await mutateAsync(data);

        if (response.success) {
            toast.success(response.message);
        } else {
            toast.error(response.error);
        }

        setIsUserProfile();
    };

    return (
        <Dialog open={isUserProfile} onOpenChange={handleCloseForm}>
            <DialogContent className="md:max-w-[625px] max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogDescription className="text-[12.5px] leading-3">
                        Update your profile easily and securely!
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-start items-center gap-5 pt-2"
                >
                    <div className="flex w-full gap-2">
                        <div className="w-full flex flex-col gap-1">
                            <Label
                                htmlFor="firstName"
                                className="font-sans font-normal text-[12px] text-[#f3f3f3] px-1"
                            >
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="accent-blue-500"
                            />
                        </div>

                        <div className="w-full flex flex-col gap-1">
                            <Label
                                htmlFor="lastName"
                                className="font-sans font-normal text-[12px] text-[#f3f3f3] px-1"
                            >
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="accent-blue-500"
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <Label
                            htmlFor="username"
                            className="font-sans font-normal text-[12px] text-[#f3f3f3] px-1"
                        >
                            Current Workspace
                        </Label>
                        <Input
                            disabled
                            id="username"
                            type="text"
                            value={username}
                            className="accent-blue-500"
                        />
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <Label
                            htmlFor="bio"
                            className="font-sans font-normal text-[12px] text-[#f3f3f3] px-1"
                        >
                            Your Bio
                        </Label>
                        <Textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="I love black cats"
                            className="accent-blue-500"
                        />
                    </div>

                    <DialogFooter className="w-full">
                        <Button type="button" onClick={handleCloseForm} variant="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending || UpdatePending}>
                            {UpdatePending ? "Updating..." : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserProfileModal;
