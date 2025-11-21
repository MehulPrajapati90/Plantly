"use client";

import CommunityShareModal from "@/components/community/comunity-profile-share";
import ProfileCards from "@/components/community/profile-cards";
import SearchBar from "@/components/community/search-bar";
import Hint from "@/components/ui/hint";
import { useGetCommunityPeopleBySearchTerm } from "@/hooks/community";
import { useSearchState } from "@/store/community";
import { ArrowDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SearchPage = () => {
    const { isSearchQuery, setIsSearchQuery } = useSearchState();
    const { data, isPending } = useGetCommunityPeopleBySearchTerm(isSearchQuery || "");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    let term = searchParams.get("term");

    useEffect(() => {
        if (!term && isSearchQuery) {
            term = isSearchQuery;
        }
        if (!term && !isSearchQuery) {
            router.push('/');
        }

        setIsSearchQuery(term!);
    }, [term]);

    return (
        <div className="w-full h-screen flex flex-col p-5 gap-10">

            {/* Header */}
            <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between w-full">
                    <h1 className="text-4xl font-medium">Search Results...</h1>
                    <SearchBar />
                </div>
                <div className="font-mono text-[12px] leading-4 flex justify-between w-full text-zinc-400">
                    <div>
                        WellCome! to our community search where possibility <br />
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
            {isPending ? (
                <div>Loading...</div>
            ) : (
                data?.results ? (
                    <div className="w-full h-auto flex flex-col gap-2">
                        <ProfileCards
                            name={`${data?.results?.user.firstName} ${data?.results?.user.lastName}`}
                            bio={data?.results?.user.bio!}
                            username={data?.results?.username!}
                            imageUrl={data?.results?.user.imageUrl!}
                            createdAt={data?.results?.createdAt!} />
                    </div>
                ) : (
                    <div className="h-auto overflow-auto hidden-scrollbar">
                        <p className="flex items-center gap-2">
                            <span className="font-medium text-xl tracking-tight">Found 0 results for</span>
                            <span className="font-medium text-xl tracking-tight text-zinc-600">" {term} "</span>
                        </p>
                    </div>
                )
            )}

            <CommunityShareModal />
        </div>
    )
};

export default SearchPage;