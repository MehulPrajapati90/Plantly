"use server";

import { client } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getDbUser } from "./auth";

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

export const claimUsername = async (username: string) => {
    const { user } = await getDbUser();
    try {
        const claim = await client.username.create({
            data: {
                userId: user?.id!,
                username: username!
            }
        })

        return {
            success: true,
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

export const getUserByUsername = async(username: string) => {
    const user = await currentUser();

    if(!user){
        return {
            success: false,
            error: "unAuthenticated User!"
        }
    }
    try {
        const response = await client.username.findUnique({
            where: {
                username: username
            },
            include: {
                user: true,
            }
        })

        return {
            success: true,
            user: response?.user,
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