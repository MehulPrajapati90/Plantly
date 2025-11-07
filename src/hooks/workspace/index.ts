import { checkUsername, claimUsername } from "@/actions/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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