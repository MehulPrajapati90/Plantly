/*
  Warnings:

  - Added the required column `workspaceId` to the `SocialLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialLink" ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Username"("id") ON DELETE CASCADE ON UPDATE CASCADE;
