"use server"

import client from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
    try {
        const user = await currentUser();
        const dbUser = await getDbUser();

        if (!user) {
            return {
                succes: false,
                error: "No Authenticated user found"
            }
        }

        const { id, firstName, lastName, imageUrl, emailAddresses } = user;

        const Currentuser = await client.user.upsert({
            where: {
                clerkId: id
            },
            update: {
                firstName: firstName || null,
                lastName: lastName || null,
                imageUrl: imageUrl === dbUser?.user?.imageUrl ? imageUrl : dbUser?.user?.imageUrl,
                email: emailAddresses[0]?.emailAddress || "",
            },
            create: {
                clerkId: id,
                firstName: firstName || null,
                lastName: lastName || null,
                imageUrl: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || "",
                username: {
                    create: {
                        username: user?.username!
                    }
                }
            },
            include: {
                username: true,
            }
        })

        return {
            success: true,
            user: Currentuser,
            message: "User onBoarded successfully"
        }
    } catch (e) {
        console.error("Error Onboarding User!", e);
        return {
            success: false,
            error: "Failed to onboard user!"
        }
    }
}

export const getDbUser = async () => {
    const user = await currentUser();

    if(!user) {
        return {
            success: false,
            message: "User UnAuthenticated"
        }
    }
    try {
        const DBuser = await client.user.findUnique({
            where: {
                clerkId: user?.id
            }
        })

        if (!DBuser) {
            return {
                success: false,
                error: "Failed to fetch user!"
            }
        }

        return {
            success: true,
            user: DBuser,
            message: "user fetched successfully"
        }
    } catch (e) {
        console.error("Error User!", e);
        return {
            success: false,
            error: "Failed to fetch user!"
        }
    }
}

export const getUsernamesOfUser = async () => {
    try {
        const { user } = await getDbUser();
        const response = await client.username.findMany({
            where: {
                userId: user?.id
            },
            orderBy: {
                createdAt: "desc"
            },
        })

        if (!response) {
            return {
                success: false,
                error: "Failed to fetch username!"
            }
        }

        const usernames = response.map((items) => (items.username));

        return {
            success: true,
            usernames: usernames,
            message: "Fetched user successfully!"
        }
    } catch (e) {
        console.log("Error: ", e);
        return {
            success: false,
            error: "Failed to onboard user!"
        }
    }
}