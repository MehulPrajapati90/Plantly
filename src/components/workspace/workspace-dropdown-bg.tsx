"use client";

import { useGetUsernames } from "@/hooks/auth";
import { useSelectUsernameWorkspace } from "@/store/workspace";
import WorkspaceDropDown from "./workspace-dropdown";

interface WorkspaceDropDownBgProps {
    active: string
}

const WorkspaceDropDownBg = ({ active }: WorkspaceDropDownBgProps) => {
    const { setWorkspace, workspace } = useSelectUsernameWorkspace();
    const { data, isPending } = useGetUsernames();

    if (isPending) {
        return <div>...loading</div>
    }
    return (
        <WorkspaceDropDown
            active={active}
            workspaces={data?.usernames! || []}
            onSelect={(ws) => setWorkspace(ws)}
        />
    )
}

export default WorkspaceDropDownBg