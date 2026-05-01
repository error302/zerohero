const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const mockQuestions = [
  // CHEMISTRY - The Mole Concept
  {
    topicName: "The Mole Concept",
    questionText: "What is the number of moles in 11.2 litres of Carbon (IV) oxide at s.t.p? (Molar gas volume at s.t.p = 22.4L)",
    options: ["0.25 moles", "0.5 moles", "1.0 moles", "2.0 moles"],
    correctAnswer: "0.5 moles"
  },
  {
    topicName: "The Mole Concept",
    questionText: "KCSE 2017: Calculate the mass of 0.2 moles of Sodium Hydroxide (NaOH). (Na=23, O=16, H=1)",
    options: ["4g", "8g", "40g", "80g"],
    correctAnswer: "8g"
  },
  // BIOLOGY - Cell Structure & Organisation
  {
    topicName: "Cell Structure & Organisation",
    questionText: "KCSE 2019: Which organelle is responsible for the synthesis of ATP?",
    options: ["Ribosome", "Golgi apparatus", "Mitochondrion", "Lysosome"],
    correctAnswer: "Mitochondrion"
  },
  {
    topicName: "Cell Structure & Organisation",
    questionText: "What is the function of the rough endoplasmic reticulum?",
    options: ["Lipid synthesis", "Protein synthesis and transport", "Digestion of cell waste", "Photosynthesis"],
    correctAnswer: "Protein synthesis and transport"
  },
  // PHYSICS - Linear Motion
  {
    topicName: "Linear Motion",
    questionText: "KCSE 2016: A car accelerates uniformly from rest to a velocity of 20 m/s in 5 seconds. Calculate its acceleration.",
    options: ["2 m/s²", "4 m/s²", "5 m/s²", "10 m/s²"],
    correctAnswer: "4 m/s²"
  },
  {
    topicName: "Linear Motion",
    questionText: "Which of the following equations represents uniformly accelerated linear motion?",
    options: ["v = u + at", "v = u - at²", "F = ma", "W = Fd"],
    correctAnswer: "v = u + at"
  },
  // MATHEMATICS - Matrices
  {
    topicName: "Matrices",
    questionText: "KCSE 2018: Find the determinant of a 2x2 matrix with top row (3, 2) and bottom row (4, 5).",
    options: ["7", "15", "8", "23"],
    correctAnswer: "7"
  },
  {
    topicName: "Matrices",
    questionText: "A matrix whose determinant is zero is called a:",
    options: ["Identity matrix", "Singular matrix", "Inverse matrix", "Null matrix"],
    correctAnswer: "Singular matrix"
  }
];

async function seedQuestions() {
  console.log("🌱 Injecting KCSE Questions into the database...");

  for (const q of mockQuestions) {
    // Find the topic by name
    const topic = await prisma.topic.findFirst({
      where: { name: q.topicName }
    });

    if (topic) {
      await prisma.question.create({
        data: {
          topicId: topic.id,
          questionText: q.questionText,
          questionType: "MCQ",
          options: JSON.stringify(q.options),
          correctAnswer: q.correctAnswer,
        }
      });
      console.log(`✅ Added question to: ${q.topicName}`);
    } else {
      console.log(`❌ Topic not found: ${q.topicName}`);
    }
  }

  console.log("🎉 Successfully added questions!");
}

seedQuestions()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
