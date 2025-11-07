-- CreateTable
CREATE TABLE "CommunityStar" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityStar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CommunityStar_followerId_idx" ON "CommunityStar"("followerId");

-- CreateIndex
CREATE INDEX "CommunityStar_followingId_idx" ON "CommunityStar"("followingId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityStar_followerId_followingId_key" ON "CommunityStar"("followerId", "followingId");

-- AddForeignKey
ALTER TABLE "CommunityStar" ADD CONSTRAINT "CommunityStar_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityStar" ADD CONSTRAINT "CommunityStar_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
