import { followCommunityUser, getAllCommunityUser, getCommunityUserBySearchTerm, getFollowedUsers, unfollowCommunityUser, updateUserToCommunity } from "@/actions/community";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUpdateCommunity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => await updateUserToCommunity(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['community'] })
            queryClient.invalidateQueries({ queryKey: ['community-user'] })
        }
    })
}

export const useCommunityPeople = () => {
    return useQuery({
        queryKey: ['community-user'],
        queryFn: async () => await getAllCommunityUser()
    })
}

export const useGetCommunityPeopleBySearchTerm = (term: string) => {
    return useQuery({
        queryKey: ['community-search', term],
        queryFn: async () => await getCommunityUserBySearchTerm(term)
    });
}

export const useFollowCommunityUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (username: string) => await followCommunityUser(username),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['community-user'] });
        },
    })
}

export const useUnfollowCommunityUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (username: string) => await unfollowCommunityUser(username),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['community-user'] });
        },
    })
}

export const useGetAllFollowedUser = () => {
    return useQuery({
        queryKey: ['community-user'],
        queryFn: async () => await getFollowedUsers()
    })
}