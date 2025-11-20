"use server";

import client from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getDbUser } from "./auth";

export const updateUserToCommunity = async () => {
    const user = await currentUser();
    try {
        const updateUser = await client.user.update({
            where: {
                clerkId: user?.id
            },
            data: {
                isCommunity: true
            }
        })

        if (!updateUser) {
            return {
                success: false,
                error: "Unable to Update"
            }
        }

        return {
            success: true,
            message: "WellCome to Community!"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "Unable to Update"
        }

    }
}

export const getAllCommunityUser = async () => {
    const user = await currentUser();

    if (!user) {
        return {
            success: false,
            error: "User UnAuthenticated!"
        }
    }

    try {
        const communityPeoples = await client.username.findMany({
            where: {
                user: {
                    isCommunity: true,
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        bio: true,
                        firstName: true,
                        lastName: true,
                        createdAt: true,
                        imageUrl: true,
                        isCommunity: true,
                        username: {
                            select: {
                                username: true
                            }
                        },
                        following: {
                            select: {
                                follower: {
                                    select: {
                                        id: true
                                    }
                                }
                            },
                        }
                    }
                },
                link: {
                    select: {
                        url: true,
                        title: true,
                        profileImageUrl: true,
                        description: true,
                        clickCount: true,
                        createdAt: true
                    }
                },
                socialLinks: {
                    select: {
                        url: true,
                        platform: true,
                        createdAt: true
                    }
                }
            },
        });

        return {
            success: true,
            community: communityPeoples,
            message: "Community Peoples fetched successfully"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "Unable to fetch"
        }
    }
}

export const getCommunityUserBySearchTerm = async (term: string) => {
    const user = await currentUser();

    if (!user) {
        return {
            success: false,
            error: "User UnAuthenticated!"
        }
    }

    try {
        const searchResults = await client.username.findFirst({
            where: {
                username: term
            },
            include: {
                user: {
                    select: {
                        id: true,
                        bio: true,
                        firstName: true,
                        lastName: true,
                        createdAt: true,
                        imageUrl: true,
                        isCommunity: true,
                        following: true
                    }
                }
            }
        });

        return {
            success: true,
            results: searchResults,
            message: "Search completed"
        }
    } catch (e) {
        return {
            success: false,
            error: "Unable to fetch"
        }
    }
}

// Follow a community user
export const followCommunityUser = async (username: string) => {
    const { user } = await getDbUser();

    const otherUser = await client.username.findFirst({
        where: {
            username: username
        },
        include: {
            user: true
        }
    });

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.user.id === user?.id) {
        throw new Error("Cannot follow youself!")
    }

    const existingFollow = await client.communityStar.findFirst({
        where: {
            followerId: user?.id,
            followingId: otherUser.user.id
        }
    });

    if (existingFollow) {
        throw new Error("You are already following this user!")
    };

    const follow = await client.communityStar.create({
        data: {
            followerId: user?.id || '',
            followingId: otherUser.user.id
        },
        include: {
            following: true,
            follower: true
        }
    })

    return {
        success: follow
    }
}

export const unfollowCommunityUser = async (username: string) => {
    const { user } = await getDbUser();

    const otherUser = await client.username.findFirst({
        where: {
            username: username
        },
        include: {
            user: true
        }
    });

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.user.id === user?.id) {
        throw new Error("Cannot follow youself!")
    }

    const existingFollow = await client.communityStar.findFirst({
        where: {
            followerId: user?.id,
            followingId: otherUser.user.id
        }
    });

    if (!existingFollow) {
        throw new Error("You are not following this user!")
    };

    const unfollow = await client.communityStar.delete({
        where: {
            id: existingFollow?.id || ''
        },
        include: {
            following: true,
            follower: true
        }
    })

    return {
        success: unfollow
    }
}

export const getFollowedUsers = async () => {
    try {
        const self = await getDbUser();

        if (!self.success) {
            return [];
        }
        const followedUsers = await client.communityStar.findMany({
            where: {
                followerId: self.user?.id,
            },
            // include: {
            //     following: {
            //         select: {
            //             id: true,
            //         }
            //     }
            // }
        });
        return followedUsers;
    } catch (e) {
        return [];
    }
}