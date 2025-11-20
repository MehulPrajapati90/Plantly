"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Hint from "../ui/hint";
import { useFollowCommunityUser, useGetAllFollowedUser, useUnfollowCommunityUser } from "@/hooks/community";
import { toast } from "sonner";

interface ProfileCardsProps {
    following?: {
        follower: { id: string }
    }[];
    id?: string;
    userId?: string;
    imageUrl: string;
    name: string;
    bio: string;
    username: string;
    createdAt: Date;
    idx?: number;
}


const ProfileCards = ({ imageUrl, name, bio, username, createdAt, idx, userId, id, following }: ProfileCardsProps) => {
    // const { data, isPending } = useGetAllFollowedUser();
    const { mutateAsync: followMutateAsync, isPending: isFollowPending } = useFollowCommunityUser();
    const { mutateAsync: unfollowMutateAsync, isPending: isUnfollowPending } = useUnfollowCommunityUser();

    const isFollowing = following?.some(f => f.follower.id === userId);

    const handleFollowUser = async (username: string) => {
        try {
            console.log(username, userId, id);
            const res = await followMutateAsync(username);

            return toast.success(`You are now following ${username}!`);
        } catch (e) {
            console.log(e);
            return toast.error(`Failed to follow ${username}. Please try again.`);
        }
    };

    // console.log("Here: ", data)
    return (
        <div key={idx} className="w-full h-20 bg-zinc-900 rounded-md border border-b-zinc-600 flex items-center gap-2 relative">
            <button disabled={isFollowPending || userId === id} className="absolute top-2 right-2" onClick={() => handleFollowUser(username)}>
                <Hint asChild label={`Follow ${username}`} align="center" side="right">
                    <Star size={18} className={`text-yellow-400 ${(userId === id || isFollowing) && "fill-yellow-400"}`} />
                </Hint>
            </button>
            <Image src={imageUrl || "/default-profile.png"} alt={name} width={80} height={80} className="w-16 h-16 rounded-full object-cover m-2 inline-block align-middle" />
            <div className="w-full flex flex-col gap-1.5">
                <div className="flex flex-col leading-3">
                    <h2 className="text-lg font-medium">{name}</h2>
                    <h2 className="text-[12px] font-medium text-zinc-500">@{username}</h2>
                </div>
                <div className="w-full flex items-center justify-between pr-3">
                    <p className="text-sm text-zinc-400">{bio}</p>
                    <p className="text-xs text-zinc-600">Joined: {createdAt.toDateString()}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileCards;