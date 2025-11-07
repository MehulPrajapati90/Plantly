import { create } from "zustand";

interface CommunityProps {
    isCommunityOpen: boolean;
    setIsCommunityOpen: () => void;
}

export const useCommunityModal = create<CommunityProps>()((set) => ({
    isCommunityOpen: false,
    setIsCommunityOpen: () => set((state) => ({ isCommunityOpen: !state.isCommunityOpen }))
})) 