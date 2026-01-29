// test/seed-projects.js
import { PrismaClient } from "../lib/generated/prisma/index.js";
const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.findFirst({
    where: { name: "Demo Company" },
  });

  const team = await prisma.team.findFirst({
    where: { name: "Backend Team" },
  });

  if (!company || !team) {
    throw new Error("Company or Team missing");
  }

  const project = await prisma.project.create({
    data: {
      name: "Website Revamp",
      companyId: company.id,
      teamId: team.id, // ✅ NOW VALID
    },
  });

  console.log("✅ Project created:", project);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());