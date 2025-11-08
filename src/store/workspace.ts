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

interface ShareModalProps {
    isShare: boolean,
    activeWorkspace: string;
    setActiveWorkspace: (workspace: string) => void;
    setIsShare: () => void;
}

interface UserProfileModalProps {
    isUserProfile: boolean;
    setIsUserProfile: () => void;
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
}));

export const useShareModal = create<ShareModalProps>()((set) => ({
    isShare: false,
    activeWorkspace: "",
    setIsShare: () => set((state) => ({ isShare: !state.isShare })),
    setActiveWorkspace: (workspace: string) => set({ activeWorkspace: workspace })
}));

export const useUserProfileModal = create<UserProfileModalProps>()((set) => ({
    isUserProfile: false,
    setIsUserProfile: () => set((state) => ({ isUserProfile: !state.isUserProfile }))
}))