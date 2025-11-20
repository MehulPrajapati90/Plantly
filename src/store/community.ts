import { create } from "zustand";
import { persist } from "zustand/middleware";


interface SearchStateProps {
    isSearchQuery: string;
    setIsSearchQuery: (query: string) => void;
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