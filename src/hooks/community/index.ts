import { updateUserToCommunity } from "@/actions/community";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUpdateCommunity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => await updateUserToCommunity(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['community'] })
        }
    })
}