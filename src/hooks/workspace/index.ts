import { checkUsername, claimUsername, getUserByUsername, updateUserProfile } from "@/actions/workspace";
import { UpdateUserProfileProps } from "@/types";
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
        mutationFn: async(data: UpdateUserProfileProps) => await updateUserProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user']});
        }
    })
}