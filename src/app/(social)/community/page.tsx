"use client";

import CommunityShareModal from "@/components/community/comunity-profile-share";
import ProfileCards from "@/components/community/profile-cards";
import SearchBar from "@/components/community/search-bar";
import Hint from "@/components/ui/hint";
import { useGetDBUser } from "@/hooks/auth";
import { useCommunityPeople } from "@/hooks/community";
import { ArrowDown } from "lucide-react";

const CommunityPage = () => {
    const { data, isPending } = useCommunityPeople();
    const { data: userData, isPending: isUserPending } = useGetDBUser();

    if (isPending || isUserPending) {
        return (
            <div className="w-full h-screen flex flex-col p-5 gap-10">

                {/* Header */}
                <div className="w-full flex flex-col gap-2">
                    <div className="flex justify-between w-full">
                        <h1 className="text-4xl font-medium">Community</h1>
                        <SearchBar />
                    </div>
                    <div className="font-mono text-[12px] leading-4 flex justify-between w-full text-zinc-400">
                        <div>
                            WellCome! to our community where possibility <br />
                            meets Opportunity.
                        </div>
                        <div>
                            <Hint label="scroll down" align="center">
                                <div className="h-8 w-8 border border-zinc-600 rounded-full flex items-center justify-center bg-zinc-900">
                                    <ArrowDown width={"15px"} className="text-zinc-400" />
                                </div>
                            </Hint>
                        </div>
                    </div>
                    <div className="h-auto overflow-auto hidden-scrollbar py-5">Loading...</div>
                </div>
            </div>
        )
    }

    console.log(data?.community);
    return (
        <div className="w-full h-screen flex flex-col p-5 gap-10">

            {/* Header */}
            <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between w-full">
                    <h1 className="text-4xl font-medium">Community</h1>
                    <SearchBar />
                </div>
                <div className="font-mono text-[12px] leading-4 flex justify-between w-full text-zinc-400">
                    <div>
                        WellCome! to our community where possibility <br />
                        meets Opportunity.
                    </div>
                    <div>
                        <Hint label="scroll down" align="center">
                            <div className="h-8 w-8 border border-zinc-600 rounded-full flex items-center justify-center bg-zinc-900">
                                <ArrowDown width={"15px"} className="text-zinc-400" />
                            </div>
                        </Hint>
                    </div>
                </div>
            </div>

            {/* Scrollable List */}
            <div className="h-auto overflow-auto hidden-scrollbar">
                <div className="w-full h-auto flex flex-col gap-3.5">
                    {data?.community?.map((val, idx) => (
                        <ProfileCards
                            following={val.user.following}
                            key={idx}
                            userId={userData?.user?.id!}
                            id={val.user.id}
                            name={`${val.user.firstName} ${val?.user.lastName}`}
                            bio={val?.user.bio!}
                            username={val?.username!}
                            imageUrl={val?.user.imageUrl!}
                            createdAt={val?.createdAt!} />
                    ))}
                </div>
            </div>

            <CommunityShareModal />
        </div>
    )
}

export default CommunityPage;