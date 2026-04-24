import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const companies = await prisma.company.findMany();

    return NextResponse.json(companies);
  } catch (error) {
    console.error("DB ERROR:", error);

    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}