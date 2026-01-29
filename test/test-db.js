import { PrismaClient } from "../lib/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Create / get company
  const company = await prisma.company.create({
    data: { name: "Demo Company" },
  });

  // 2️⃣ Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@company.com" },
    update: { role: "ADMIN" },
    create: {
      email: "admin@company.com",
      role: "ADMIN",
      companyId: company.id,
    },
  });

  // 3️⃣ Team Head
  const teamHead = await prisma.user.upsert({
    where: { email: "head@company.com" },
    update: { role: "TEAM_HEAD" },
    create: {
      email: "head@company.com",
      role: "TEAM_HEAD",
      companyId: company.id,
    },
  });

  // 4️⃣ Employee
  const employee = await prisma.user.upsert({
    where: { email: "employee@company.com" },
    update: { role: "EMPLOYEE" },
    create: {
      email: "employee@company.com",
      role: "EMPLOYEE",
      companyId: company.id,
    },
  });

  // 5️⃣ Output (THIS IS WHAT YOU WANTED TO SEE)
  console.log("Company:", company);
  console.log("Admin:", admin);
  console.log("Team Head:", teamHead);
  console.log("Employee:", employee);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });