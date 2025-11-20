"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import { useSearchState } from "@/store/community";

const SearchBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { setIsSearchQuery } = useSearchState();
    const [value, setValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, []);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = qs.stringifyUrl({
            url: "/search",
            query: { term: value },
        }, { skipEmptyString: true, skipNull: true })
            .replace("/?", "?");

        setIsSearchQuery(value);
        router.push(url);
    }

    return (
        <>
            <form
                onSubmit={onSubmit}
                className="flex w-full max-w-70 h-9 items-center overflow-hidden rounded-[30px] bg-[#1A1B1E] shadow-xl border transition-all duration-200"
            >
                <div className="flex flex-1 items-center pl-4 relative">
                    <Search size={18} className="text-zinc-600" />

                    <Input
                        ref={inputRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter your idea..."
                        style={{
                            borderRadius: "10px 0 0 10px"
                        }}
                        className="ml-2 w-full border-none bg-transparent shadow-none font-sans tracking-[-0.2px] focus-visible:ring-0 focus-visible:ring-offset-0 text-[#f3f3f3]"
                    />

                    {value && (
                        <button
                            type="button"
                            onClick={() => setValue("")}
                            className="absolute right-2 p-1 rounded-full transition"
                        >
                            <X size={18} className="text-zinc-600" />
                        </button>
                    )}
                </div>

                <button
                    disabled={!value}
                    type="submit"
                    className="bg-zinc-800 px-4 py-2 font-medium font-sans tracking-tight text-white transition-all duration-200 hover:bg-zinc-950 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    Search
                </button>
            </form>


        </>
    )
}

export default SearchBar;