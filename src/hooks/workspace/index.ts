import { addProfileImage, checkUsername, claimUsername, createLink, createSocialLinks, getProfileData, getUserByUsername, removeProfileImage, removeWorkspaceProfileImage, updateUserProfile, updateWorkspaceProfile } from "@/actions/workspace";
import { CreateLinkProps, CreateSocialLinksProps, CreateWorkspace, UpdateUserProfileProps, UpdateWorkspaceProfile } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCheckUsername = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (username: string) => await checkUsername(username),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['username'] })
        }
    })
}
export const useClaimUsername = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ imageUrl, profileName, username }: CreateWorkspace) => await claimUsername({ imageUrl, profileName, username }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['username'] })
        }
    })
}

export const useGetUserByUsername = (username: string) => {
    return useQuery({
        queryKey: ['user', username],
        queryFn: async () => await getUserByUsername(username),
        enabled: !!username
    })
}

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UpdateUserProfileProps) => await updateUserProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['user-social-links'] });
        }
    })
}

export const useCreateLinks = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateLinkProps) => await createLink(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] })
            queryClient.invalidateQueries({ queryKey: ['user'] })
            queryClient.invalidateQueries({ queryKey: ['user-social-links'] })
        }
    })
}

export const useGetProfileData = (workspace: string) => {
    return useQuery({
        queryKey: ['user-social-links'],
        queryFn: async () => await getProfileData(workspace)
    })
}

export const useCreateSocialLinks = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateSocialLinksProps) => await createSocialLinks(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['social'] })
            queryClient.invalidateQueries({ queryKey: ['user'] })
            queryClient.invalidateQueries({ queryKey: ['user-social-links'] })
        }
    })
}

export const useAddProfileImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (image: string) => await addProfileImage(image),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['links'] })
            queryClient.invalidateQueries({ queryKey: ['user-social-links'] });
        }
    })
}

export const useRemoveProfileImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => await removeProfileImage(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['links'] })
            queryClient.invalidateQueries({ queryKey: ['user-social-links'] });
        }
    })
}

export const useUpdateWorkspaceProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ profileName, imageUrl, workspace }: UpdateWorkspaceProfile) => await updateWorkspaceProfile({ profileName, imageUrl, workspace }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['links'] })
            queryClient.invalidateQueries({ queryKey: ['user-social-links'] });
        }
    })
}

export const useRemoveWorkspaceImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (workspace: string) => await removeWorkspaceProfileImage(workspace),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['links'] })
            queryClient.invalidateQueries({ queryKey: ['user-social-links'] });
        }
    })
}