import { client } from "@/lib/db";
import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {

    ProfileImageUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1
        }
    })
        .middleware(async () => {
            const user = await currentUser();
            if (!user) throw new UploadThingError("Unauthorized");
            return { user: user }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            await client.user.update({
                where: {
                    clerkId: metadata.user?.id
                },
                data: {
                    imageUrl: file.url
                }
            })

            return { fileUrl: file.url }
        }),

    UploadLinkUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1
        }
    })
        .input(z.object({
            id: z.string()
        }))
        .middleware(async ({ input }) => {
            const user = await currentUser();
            if (!user) throw new UploadThingError("Unauthorized");
            return { user: user, id: input?.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // TODO: Update the link with the uploaded file URL
            if (!metadata.id) {
                throw new UploadThingError("No link ID provided in metadata");
            }
        })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
