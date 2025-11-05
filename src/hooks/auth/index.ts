import { getUsernamesOfUser, onBoardUser } from "@/actions/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOnboardUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => await onBoardUser(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })
}

export const useGetUsernames = () => {
    return useQuery({
        queryKey: ['username'],
        queryFn: async () => await getUsernamesOfUser()
    })
}