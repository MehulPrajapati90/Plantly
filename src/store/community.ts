import { create } from "zustand";
import { persist } from "zustand/middleware";


interface SearchStateProps {
    isSearchQuery: string;
    setIsSearchQuery: (query: string) => void;
}

interface CommunityShareModalProps {
    isProfileShare: boolean,
    activeCommunityProfile: string;
    setActiveCommunityProfile: (workspace: string) => void;
    setIsProfileShare: () => void;
}

export const useSearchState = create<SearchStateProps>()(persist(
    (set) => ({
        isSearchQuery: "",
        setIsSearchQuery: (query: string) => set({ isSearchQuery: query })
    }),
    {
        name: "search-query"
    }
));

export const useCommunityShareModal = create<CommunityShareModalProps>()((set) => ({
    isProfileShare: false,
    activeCommunityProfile: "",
    setIsProfileShare: () => set((state) => ({ isProfileShare: !state.isProfileShare })),
    setActiveCommunityProfile: (workspace: string) => set({ activeCommunityProfile: workspace })
}));