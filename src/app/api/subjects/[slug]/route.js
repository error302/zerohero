import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/subjects/[slug] — Returns a single subject with all topics grouped by form
export async function GET(request, { params }) {
  const { slug } = await params;

  const subject = await prisma.subject.findUnique({
    where: { slug },
    include: {
      topics: {
        orderBy: [{ form: "asc" }, { name: "asc" }],
        include: {
          _count: { select: { questions: true, studyNotes: true } },
        },
      },
    },
  });

  if (!subject) {
    return NextResponse.json({ error: "Subject not found" }, { status: 404 });
  }

  // Group topics by form
  const topicsByForm = {};
  for (const topic of subject.topics) {
    if (!topicsByForm[topic.form]) topicsByForm[topic.form] = [];
    topicsByForm[topic.form].push(topic);
  }

  return NextResponse.json({ ...subject, topicsByForm });
}
