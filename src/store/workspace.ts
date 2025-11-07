import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectUsernameWorkspaceProps {
    workspace: string;
    setWorkspace: (username: string) => void;
}

interface WorkspaceModelProps {
    isWorkspace: boolean;
    setIsWorkspace: () => void;
}

export const useSelectUsernameWorkspace = create<SelectUsernameWorkspaceProps>()(persist(
    (set) => ({
        workspace: "",
        setWorkspace: (username: string) => set({ workspace: username })
    }),
    {
        name: "current-workspace"
    }
));

export const useWorkspaceModel = create<WorkspaceModelProps>()((set) => ({
    isWorkspace: false,
    setIsWorkspace: () => set((state) => ({ isWorkspace: !state.isWorkspace }))
}))