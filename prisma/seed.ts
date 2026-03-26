import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = (
    process.env.INITIAL_OWNER_EMAIL || "owner@247tyrecare.local"
  ).toLowerCase();
  const password = process.env.INITIAL_OWNER_PASSWORD || "changeme";
  const hash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    create: { email, password: hash },
    update: { password: hash },
  });

  console.log(`Seeded admin user: ${email} (change password after first login)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
