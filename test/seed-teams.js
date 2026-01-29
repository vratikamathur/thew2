// test/seed-teams.js
import { PrismaClient } from "../lib/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Get company
  const company = await prisma.company.findFirst({
    where: { name: "Demo Company" },
  });

  if (!company) {
    throw new Error("Company not found. Run test-db.js first.");
  }

  // 2️⃣ Get TEAM_HEAD user
  const teamHead = await prisma.user.findFirst({
    where: { role: "TEAM_HEAD" },
  });

  if (!teamHead) {
    throw new Error("TEAM_HEAD not found.");
  }

  // 3️⃣ Create Team + assign team head ✅
  const team = await prisma.team.create({
    data: {
      name: "Backend Team",
      companyId: company.id,
      teamHeadId: teamHead.id,
    },
  });

  console.log("✅ Team created:", team);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());