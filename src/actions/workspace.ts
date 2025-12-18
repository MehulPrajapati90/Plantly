"use server";

import client from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getDbUser } from "./auth";
import { CreateLinkProps, CreateSocialLinksProps, CreateWorkspace, UpdateUserProfileProps, UpdateWorkspaceProfile } from "@/types";

export const checkUsername = async (username: string) => {
    const user = await currentUser();
    if (!user) {
        return { success: false, error: "Not authenticated" };
    }
    try {
        const isTaken = await client.username.findFirst({
            where: {
                username: username
            }
        })

        if (isTaken) {
            const suggestion = await getSuggestion(username, 3, 10);
            return {
                success: true,
                suggestion: suggestion,
                message: "Suggestion's here"
            }
        }

        return {
            success: true,
            suggestion: [],
            message: "Username is availaible"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "failed to claim username"
        }
    }
}

export const getSuggestion = async (base: string, count = 3, maxTries = 10) => {
    const suggestions: string[] = [];

    for (let i = 1; suggestions.length < count && i < maxTries; i++) {
        const candidate = `${base}${i}`

        const exists = await client.username.findUnique({
            where: {
                username: candidate
            }
        })

        if (!exists) {
            suggestions.push(candidate)
        }
    }

    return suggestions;
}

export const claimUsername = async ({ imageUrl, profileName, username }: CreateWorkspace) => {
    const { user } = await getDbUser();
    try {
        const claim = await client.username.create({
            data: {
                userId: user?.id!,
                imageUrl: imageUrl,
                profileName: profileName,
                username: username!
            }
        })

        return {
            success: true,
            username: claim?.username,
            message: "Claimed Successfully!"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "failed to claim username"
        }
    }
}

export const getUserByUsername = async (username: string) => {
    const { user } = await getDbUser();

    if (!user) {
        return {
            success: false,
            error: "unAuthenticated User!"
        }
    }
    try {
        const response = await client.username.findUnique({
            where: {
                username: username,
                userId: user.id,
            },
            select: {
                user: {
                    select: {
                        id: true,
                        bio: true,
                        firstName: true,
                        lastName: true,
                        imageUrl: true,
                    }
                },
                profileName: true,
                imageUrl: true,
                username: true,
                socialLinks: {
                    select: {
                        platform: true,
                        url: true,
                    }
                },
                link: {
                    select: {
                        title: true,
                        description: true,
                        profileImageUrl: true,
                        clickCount: true,
                        url: true,
                    }
                }
            }
        })

        return {
            success: true,
            workspacedata: response,
            message: "User fetched successfully"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "failed to fetch User"
        }
    }
}

export const getUserByUsernameforPreview = async (username: string) => {

    try {
        const response = await client.username.findUnique({
            where: {
                username: username,
            },
            select: {
                user: {
                    select: {
                        id: true,
                        bio: true,
                        firstName: true,
                        lastName: true,
                        imageUrl: true,
                    }
                },
                profileName: true,
                imageUrl: true,
                username: true,
                socialLinks: {
                    select: {
                        platform: true,
                        url: true,
                    }
                },
                link: {
                    select: {
                        title: true,
                        description: true,
                        profileImageUrl: true,
                        clickCount: true,
                        url: true,
                    }
                }
            }
        })

        return {
            success: true,
            workspacedata: response,
            message: "User fetched successfully"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "failed to fetch User"
        }
    }
}

export const updateUserProfile = async ({ bio, firstName, lastName }: UpdateUserProfileProps) => {
    const user = await currentUser();

    if (!user) {
        return {
            success: false,
            error: "User UnAuthenticated!"
        }
    }
    try {
        const data = {
            firstName, lastName, bio
        }
        const update = await client.user.update({
            where: {
                clerkId: user.id
            },
            data: {
                ...data
            }
        })

        return {
            success: true,
            message: "User Updated Successfully"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "failed to Update"
        }
    }
}

export const createLink = async ({ description, title, url, profileImageUrl, username }: CreateLinkProps) => {
    const { user } = await getDbUser();

    if (!user) {
        return {
            success: false,
            error: "User UnAuthenticated!"
        }
    }
    try {
        const workspace = await client.username.findUnique({
            where: {
                username: username
            }
        })

        const profileImage = profileImageUrl ? profileImageUrl : (await fetch(`https://ui-avatars.com/api/?background=random&name=${title}`).then(res => res.url));

        const create = await client.link.create({
            data: {
                userId: user?.id,
                workspaceId: workspace?.id!,
                title: title,
                url: url,
                description: description,
                profileImageUrl: profileImage,
            }
        })

        return {
            success: true,
            message: "Link Created Successfully!"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "failed to Create"
        }
    }
}

export const getWorkspaceByName = async (workspace: string) => {
    try {
        const currentWorkspace = await client.username.findUnique({
            where: {
                username: workspace
            },
        })

        return {
            workspace: currentWorkspace
        };
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "failed to fetch"
        }
    }
}

export const getProfileData = async (workspace: string) => {
    const { workspacedata } = await getUserByUsername(workspace);
    const currentWorkspace = await getWorkspaceByName(workspace);
    try {
        const data = await client.user.findFirst({
            where: {
                id: workspacedata?.user?.id,
            },
            include: {
                link: {
                    where: {
                        workspaceId: currentWorkspace.workspace?.id,
                        userId: workspacedata?.user?.id
                    },
                    select: {
                        title: true,
                        description: true,
                        profileImageUrl: true,
                        url: true,
                    }
                },
                socialLink: {
                    where: {
                        workspaceId: currentWorkspace.workspace?.id,
                        userId: workspacedata?.user?.id
                    },
                    select: {
                        platform: true,
                        url: true,
                    }
                },
            },
        });

        return {
            success: true,
            profileData: data,
            message: "Fetched Successfully!"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "failed to fetch"
        }
    }
}

export const createSocialLinks = async ({ platform, url, username }: CreateSocialLinksProps) => {
    const { user } = await getDbUser();
    try {
        const workspace = await client.username.findUnique({
            where: {
                username: username
            }
        })

        const createSocial = await client.socialLink.create({
            data: {
                userId: user?.id!,
                workspaceId: workspace?.id!,
                url: url,
                platform: platform
            }
        })

        return {
            success: true,
            message: "Create Social Links"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "failed to Create"
        }
    }
}

export const addProfileImage = async (image: string) => {
    const user = await currentUser();

    if (!user) {
        return {
            success: false,
            error: "User UnAuthenticated!"
        }
    }
    try {
        const updateUser = await client.user.update({
            where: {
                clerkId: user?.id
            },
            data: {
                imageUrl: image
            }
        })

        return {
            success: true,
            message: "Updated user profile successfully"
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: "failed to add profile image"
        }
    }
}

export const removeProfileImage = async () => {
    const user = await currentUser();

     if (!user) {
        return {
            success: false,
            error: "User UnAuthenticated!"
        }
    }
    try {
        const updateUser = await client.user.update({
            where: {
                clerkId: user?.id
            },
            data: {
                imageUrl: null
            }
        })

        return {
            success: true,
            message: "Updated user profile successfully"
        }
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: "failed to add profile image"
        }
    }
}

export const updateWorkspaceProfile = async ({ imageUrl, profileName, workspace }: UpdateWorkspaceProfile) => {
    const { user } = await getDbUser();

    if (!user) {
        return {
            success: false,
            error: "User UnAuthenticated!"
        }
    }
    try {
        const update = await client.username.update({
            where: {
                username: workspace,
            },
            data: {
                profileName: profileName,
                imageUrl: imageUrl
            }
        })

        return {
            success: true,
            message: "Updated workspace profile successfully"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "failed to Update"
        }
    }
}

export const removeWorkspaceProfileImage = async (workspace: string) => {
    const { user } = await getDbUser();

    if (!user) {
        return {
            success: false,
            error: "User UnAuthenticated!"
        }
    }
    try {
        const update = await client.username.update({
            where: {
                username: workspace,
            },
            data: {
                imageUrl: null
            }
        })

        return {
            success: true,
            message: "Removed workspace profile image successfully"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "failed to Remove"
        }
    }
}