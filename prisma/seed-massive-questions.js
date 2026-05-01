const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const massiveQuestionBank = [
  // ─── MATHEMATICS ───────────────────────────────────────
  {
    topicName: "Linear Equations",
    questionText: "Solve for x: 3(x - 2) + 4 = 13",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    correctAnswer: "x = 5",
    videoUrl: "https://www.youtube.com/embed/bAerID24QJ0" // Brian McLogan
  },
  {
    topicName: "Indices & Logarithms",
    questionText: "Simplify: log(100) + log(10)",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3",
    videoUrl: "https://www.youtube.com/embed/Zq4ZnyKPaGQ" // The Organic Chemistry Tutor
  },
  {
    topicName: "Quadratic Equations & Expressions",
    questionText: "Solve the quadratic equation x² - 5x + 6 = 0",
    options: ["x=2, x=3", "x=-2, x=-3", "x=1, x=6", "x=-1, x=-6"],
    correctAnswer: "x=2, x=3",
    videoUrl: "https://www.youtube.com/embed/qeByhTF8WEw" // Math Antics
  },
  {
    topicName: "Differentiation",
    questionText: "Find the derivative (dy/dx) of y = 3x² + 2x",
    options: ["6x", "3x + 2", "6x + 2", "x² + 2"],
    correctAnswer: "6x + 2",
    videoUrl: "https://www.youtube.com/embed/5yfh5cf4-0w" // The Organic Chemistry Tutor
  },

  // ─── PHYSICS ───────────────────────────────────────────
  {
    topicName: "Pressure",
    questionText: "Calculate the pressure exerted by a force of 200N on an area of 4m².",
    options: ["50 Pa", "100 Pa", "400 Pa", "800 Pa"],
    correctAnswer: "50 Pa",
    videoUrl: "https://www.youtube.com/embed/XjT2o_9zKEE" // Professor Dave
  },
  {
    topicName: "Newton's Laws of Motion",
    questionText: "A mass of 5kg accelerates at 2m/s². What is the net force acting on it? (F=ma)",
    options: ["2.5 N", "5 N", "10 N", "20 N"],
    correctAnswer: "10 N",
    videoUrl: "https://www.youtube.com/embed/kKKM8Y-u7ds" // CrashCourse Physics
  },
  {
    topicName: "Mains Electricity",
    questionText: "Which wire in a standard 3-pin plug is colored brown?",
    options: ["Earth", "Neutral", "Live", "Ground"],
    correctAnswer: "Live",
    videoUrl: "https://www.youtube.com/embed/Mh-oI3R-X8U" // Free Science Lessons
  },
  {
    topicName: "Radioactivity",
    questionText: "What type of radiation consists of high-energy electrons?",
    options: ["Alpha particles", "Beta particles", "Gamma rays", "Neutrons"],
    correctAnswer: "Beta particles",
    videoUrl: "https://www.youtube.com/embed/5oUagoF_viQ" // Amoeba Sisters
  },

  // ─── CHEMISTRY ─────────────────────────────────────────
  {
    topicName: "Acids, Bases & Indicators",
    questionText: "What is the pH of a neutral solution at 25°C?",
    options: ["0", "7", "10", "14"],
    correctAnswer: "7",
    videoUrl: "https://www.youtube.com/embed/ckbmzEYDkE8" // Tyler DeWitt
  },
  {
    topicName: "Structure of the Atom",
    questionText: "If an atom has 11 protons and 12 neutrons, what is its mass number?",
    options: ["11", "12", "23", "1"],
    correctAnswer: "23",
    videoUrl: "https://www.youtube.com/embed/h6LPAwAmnCQ" // Tyler DeWitt
  },
  {
    topicName: "Organic Chemistry I",
    questionText: "What is the general formula for Alkanes?",
    options: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnHn"],
    correctAnswer: "CnH2n+2",
    videoUrl: "https://www.youtube.com/embed/U7h2A9UaYMQ" // The Organic Chemistry Tutor
  },
  {
    topicName: "Organic Chemistry II",
    questionText: "Which functional group identifies an alcohol?",
    options: ["-COOH", "-OH", "-CHO", "-NH2"],
    correctAnswer: "-OH",
    videoUrl: "https://www.youtube.com/embed/0BshvE0_86U" // Professor Dave
  },

  // ─── BIOLOGY ───────────────────────────────────────────
  {
    topicName: "Nutrition in Plants",
    questionText: "What is the primary product of the light-independent stage of photosynthesis?",
    options: ["Oxygen", "ATP", "Glucose", "Water"],
    correctAnswer: "Glucose",
    videoUrl: "https://www.youtube.com/embed/sQK3Yr4Sc_k" // Amoeba Sisters
  },
  {
    topicName: "Transport in Plants",
    questionText: "Which tissue is responsible for the transport of water from the roots to the leaves?",
    options: ["Phloem", "Xylem", "Cambium", "Epidermis"],
    correctAnswer: "Xylem",
    videoUrl: "https://www.youtube.com/embed/jtuX7H05tmQ" // Amoeba Sisters
  },
  {
    topicName: "Transport in Animals",
    questionText: "Which blood vessel carries deoxygenated blood from the heart to the lungs?",
    options: ["Aorta", "Vena Cava", "Pulmonary Artery", "Pulmonary Vein"],
    correctAnswer: "Pulmonary Artery",
    videoUrl: "https://www.youtube.com/embed/_0sGyTGNyC0" // CrashCourse Biology
  },
  {
    topicName: "Genetics III",
    questionText: "In a heterozygous individual (Aa), what percentage of gametes will carry the recessive allele?",
    options: ["25%", "50%", "75%", "100%"],
    correctAnswer: "50%",
    videoUrl: "https://www.youtube.com/embed/i-0HXmX-4K0" // Amoeba Sisters
  }
];

async function seedMassiveQuestions() {
  console.log("🚀 Starting Massive Question Bank Injection...");

  let successCount = 0;

  for (const q of massiveQuestionBank) {
    const topic = await prisma.topic.findFirst({
      where: { name: q.topicName }
    });

    if (topic) {
      // Prevent duplicates if script is run multiple times
      const existing = await prisma.question.findFirst({
        where: { topicId: topic.id, questionText: q.questionText }
      });

      if (!existing) {
        await prisma.question.create({
          data: {
            topicId: topic.id,
            questionText: q.questionText,
            questionType: "MCQ",
            options: JSON.stringify(q.options),
            correctAnswer: q.correctAnswer,
            videoUrl: q.videoUrl
          }
        });
        successCount++;
        console.log(`✅ Added to ${q.topicName}`);
      } else {
        console.log(`⚠️ Skipped duplicate in ${q.topicName}`);
      }
    } else {
      console.log(`❌ Topic not found in DB: ${q.topicName}`);
    }
  }

  console.log(`\n🎉 Success! Injected ${successCount} new KCSE questions into the database.`);
}

seedMassiveQuestions()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
