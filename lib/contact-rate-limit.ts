import { prisma } from "@/lib/prisma";

const WINDOW_MS = 10 * 60 * 1000;

export async function isContactRateLimited(email: string): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MS);
  const count = await prisma.contactSubmission.count({
    where: {
      email: email.trim().toLowerCase(),
      createdAt: { gte: since },
    },
  });
  return count >= 3;
}
