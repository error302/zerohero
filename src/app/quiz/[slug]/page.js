import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import QuizClient from "./QuizClient";

export default async function QuizPage({ params }) {
  const { slug } = await params;

  // Find the topic and include questions
  const topic = await prisma.topic.findUnique({
    where: { slug },
    include: {
      subject: true,
      questions: {
        include: { markingScheme: true },
      },
    },
  });

  if (!topic) {
    notFound();
  }

  // For demonstration, if no questions exist in DB, we'll inject a few dummy KCSE-style ones
  // In a real app, this would call Claude API to generate them if empty.
  let questions = topic.questions;
  if (questions.length === 0) {
    questions = [
      {
        id: "dummy-1",
        questionText: `KCSE 2018: Explain the significance of ${topic.name} in practical applications.`,
        questionType: "MCQ",
        options: JSON.stringify(["It improves efficiency", "It has no effect", "It increases mass", "It reduces volume"]),
        correctAnswer: "It improves efficiency",
        videoUrl: "https://www.youtube.com/embed/Pft2xEuJc4Q" // Tyler DeWitt - Introduction to Moles
      },
      {
        id: "dummy-2",
        questionText: `Which of the following is a primary characteristic of ${topic.name}?`,
        questionType: "MCQ",
        options: JSON.stringify(["Option A", "Option B", "Option C", "Option D"]),
        correctAnswer: "Option A"
      }
    ];
  }

  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <header className="border-b border-border bg-surface p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold">
            {topic.subject.icon}
          </div>
          <div>
            <h1 className="text-white font-bold">{topic.name} Quiz</h1>
            <p className="text-xs text-text-muted">KCSE Past Papers & Spaced Repetition</p>
          </div>
        </div>
        <a href={`/topic/${topic.slug}`} className="px-4 py-2 rounded border border-border text-sm hover:bg-surface-hover transition-colors">
          Exit Quiz
        </a>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <QuizClient questions={questions} topic={topic} />
        </div>
      </main>
    </div>
  );
}
