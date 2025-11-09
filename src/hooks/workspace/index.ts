import { checkUsername, claimUsername, createLink, createSocialLinks, getProfileData, getUserByUsername, updateUserProfile } from "@/actions/workspace";
import { CreateLinkProps, CreateSocialLinksProps, UpdateUserProfileProps } from "@/types";
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
        mutationFn: async (username: string) => await claimUsername(username),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['username'] })
        }
    })
}

export const useGetUserByUsername = (username: string) => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => await getUserByUsername(username)
    })
}

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UpdateUserProfileProps) => await updateUserProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    })
}

export const useCreateLinks = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateLinkProps) => await createLink(data),
        onSuccess: () => [
            queryClient.invalidateQueries({ queryKey: ['links'] })
        ]
    })
}

export const useGetProfileData = (workspace: string) => {
    return useQuery({
        queryKey: ['user', 'links', 'social'],
        queryFn: async () => await getProfileData(workspace)
    })
}

export const useCreateSocialLinks = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateSocialLinksProps) => await createSocialLinks(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['social'] })
        }
    })
}