"use server";

import { client } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

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