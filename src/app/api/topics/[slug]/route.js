import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/topics/[slug] — Returns a topic with its study notes and questions
export async function GET(request, { params }) {
  const { slug } = await params;

  const topic = await prisma.topic.findUnique({
    where: { slug },
    include: {
      subject: true,
      studyNotes: { orderBy: { sortOrder: "asc" } },
      questions: {
        include: { markingScheme: true },
        orderBy: { year: "desc" },
      },
    },
  });

  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json(topic);
}
