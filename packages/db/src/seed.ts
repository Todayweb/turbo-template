import { User } from "@prisma/client";
import * as argon2 from "argon2";
import { prisma } from "./client";

(async () => {
  const hashedPassword = await argon2.hash(process.env.ADMIN_PASSWORD as string);

  const initUser = {
    email: process.env.ADMIN_EMAIL as string,
    password: hashedPassword,
    role: "admin",
  } as User;

  try {
    await prisma.user.upsert({
      create: initUser,
      update: initUser,
      where: { email: initUser.email },
    });

    console.log("Seed was successful.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
