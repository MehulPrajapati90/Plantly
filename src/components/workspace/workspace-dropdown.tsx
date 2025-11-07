"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface WorkspaceDropDownProps {
    active: string;
    workspaces: string[];
    onSelect?: (workspace: string) => void;
}

const WorkspaceDropDown = ({
    active,
    workspaces,
    onSelect,
}: WorkspaceDropDownProps) => {
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
                        onClick={() => onSelect?.(workspace)}
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
