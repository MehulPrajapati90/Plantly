"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

interface WorkspaceDropDownProps {
    active: string;
    workspaces: string[];
    onSelect: (workspace: string) => void;
}

const WorkspaceDropDown = ({
    active,
    workspaces,
    onSelect,
}: WorkspaceDropDownProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const lastPath = pathname.split("/").filter(Boolean).pop();
    const handleSelect = (workspace: string) => {
        onSelect(workspace);
        router.push(`/${workspace}/${lastPath}`);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="capitalize">
                    {active || "Select workspace"}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
                {workspaces.map((workspace) => (
                    <DropdownMenuItem
                        key={workspace}
                        onClick={() => handleSelect(workspace)}
                        className={`capitalize ${workspace === active ? "font-semibold text-[#f3f3f3]" : ""
                            }`}
                    >
                        {workspace}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default WorkspaceDropDown;
