"use server"

import { client } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
    try {
        const user = await currentUser();

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
                imageUrl: imageUrl || null,
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