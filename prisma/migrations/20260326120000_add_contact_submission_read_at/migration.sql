-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN IF NOT EXISTS "readAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "ContactSubmission_readAt_idx" ON "ContactSubmission"("readAt");
