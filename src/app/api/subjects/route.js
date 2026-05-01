import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/subjects — Returns all subjects with topic counts per form
export async function GET() {
  const subjects = await prisma.subject.findMany({
    include: {
      topics: {
        orderBy: [{ form: "asc" }, { name: "asc" }],
        include: {
          _count: { select: { questions: true, studyNotes: true } },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(subjects);
}
