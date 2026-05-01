import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { calculateSM2 } from "@/lib/sm2";

export async function POST(request) {
  try {
    const { questionId, quality } = await request.json();

    if (!questionId || typeof quality !== "number" || quality < 0 || quality > 5) {
      return NextResponse.json({ error: "Invalid payload. 'quality' must be 0-5." }, { status: 400 });
    }

    // Since auth isn't fully set up yet, grab the first STUDENT
    const user = await prisma.user.findFirst({
      where: { role: "STUDENT" },
    });

    if (!user) {
      return NextResponse.json({ error: "No student found" }, { status: 401 });
    }

    // Fetch existing progress or use defaults
    const progress = await prisma.userProgress.findUnique({
      where: {
        userId_questionId: {
          userId: user.id,
          questionId: questionId,
        },
      },
    });

    // Calculate new SM-2 values
    const sm2 = calculateSM2(
      quality,
      progress?.repetitions ?? 0,
      progress?.easeFactor ?? 2.5,
      progress?.interval ?? 0
    );

    // Upsert the progress
    const updatedProgress = await prisma.userProgress.upsert({
      where: {
        userId_questionId: {
          userId: user.id,
          questionId: questionId,
        },
      },
      update: {
        scoreReceived: quality,
        nextReviewDate: sm2.nextReviewDate,
        easeFactor: sm2.easeFactor,
        interval: sm2.interval,
        repetitions: sm2.repetitions,
      },
      create: {
        userId: user.id,
        questionId: questionId,
        scoreReceived: quality,
        maxScore: 5,
        nextReviewDate: sm2.nextReviewDate,
        easeFactor: sm2.easeFactor,
        interval: sm2.interval,
        repetitions: sm2.repetitions,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Progress saved",
      nextReviewDate: updatedProgress.nextReviewDate,
      intervalDays: updatedProgress.interval,
    });
  } catch (error) {
    console.error("Quiz Submit Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
