const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const extraSubjects = [
  {
    name: "English",
    slug: "english",
    icon: "📝",
    paper: "Paper 1, 2 & 3",
    pdfs: [
      { title: "English Grammar Notes", url: "/notes/English-grammar-notes-1.docx" },
      { title: "Functional Writing Notes", url: "/notes/FUNCTIONAL-WRITING-NOTES-F1-4.docx" },
      { title: "Oral Literature Notes", url: "/notes/ORAL-LITERATURE-NOTES-1.pdf" }
    ]
  },
  {
    name: "Kiswahili",
    slug: "kiswahili",
    icon: "🗣️",
    paper: "Karatasi 1, 2 na 3",
    pdfs: [
      { title: "Kiswahili Notes Form 1-4", url: "/notes/KISWAHILI-NOTES-FORM-1-4-1.docx" },
      { title: "Fasihi, Isimu Jamii na Lugha", url: "/notes/Fasihi-Isimu-Jamii-na-Lugha-F1-4.docx" },
      { title: "Isimu Jamii Notes", url: "/notes/ISIMU-JAMII-NOTES-1.pdf" },
      { title: "Sarufi na Matumizi ya Lugha", url: "/notes/Sarufi-na-Matumizi-ya-Lugha-F1-4.docx" },
      { title: "Kiswahili Fasihi Simulizi", url: "/notes/kiswahili-fasihi-simulizi.docx" },
      { title: "Kiswahili Ushairi", url: "/notes/kiswahili-ushairi.docx" }
    ]
  },
  {
    name: "IRE",
    slug: "ire",
    icon: "🕌",
    paper: "Paper 1 & 2",
    pdfs: [
      { title: "Form 1 IRE Notes Simplified", url: "/notes/FORM 1 IRE NOTES SIMPLIFIED.pdf" },
      { title: "Form 1 IRE Notes (Teacher.co.ke)", url: "/notes/Form-1-IRE-Notes-Teacher.co_.ke_.pdf" }
    ]
  }
];

const extraScienceMathPdfs = [
  {
    subjectName: "Mathematics",
    pdfs: [
      { title: "Mathematics Formulae Booklet", url: "/notes/Mathematics-Formulae-Teacher.co_.ke_.pdf" },
      { title: "Maths Revision Kit Updated", url: "/notes/Mathematics-Revision-Kit-Updated-Teacher.co_.ke_.pdf" },
      { title: "Maths Topical Revision", url: "/notes/Mathematics-Revision-Topical-Teacher.co_.ke_.pdf" },
      { title: "Form 1 Maths Notes", url: "/notes/Maths-Form-1-Notes-Updated-Teacher.co_.ke_.pdf" }
    ]
  },
  {
    subjectName: "Biology",
    pdfs: [
      { title: "Biology Form 1-4 Complete Booklet", url: "/notes/BIOLOGY-NOTES-FORM-1-4-BOOKLET.pdf" },
      { title: "Biology Form 2 Notes", url: "/notes/biology-form-2-notes.pdf" },
      { title: "Biology Form 3 Notes", url: "/notes/biology-form-3-notes.pdf" },
      { title: "Biology Form 4 Notes", url: "/notes/biology-form-4-notes.pdf" }
    ]
  },
  {
    subjectName: "Chemistry",
    pdfs: [
      { title: "Chemistry Form 1-4 Booklet", url: "/notes/CHEMISTRY-NOTES-FORM-1-4-BOOKLET-G.docx" },
      { title: "Form 1 Chemistry Notes", url: "/notes/KCSE-FORM-1-CHEMISTRY-NOTES.pdf" },
      { title: "KLB Chemistry B3", url: "/notes/KLB-Chem-B3 (3).pdf" },
      { title: "Practical Chemistry 4", url: "/notes/PRACTICAL-CHEMISTRY-4.docx" }
    ]
  },
  {
    subjectName: "Physics",
    pdfs: [
      { title: "Physics Form 1-4 Notes Booklet", url: "/notes/Physics-Form-1-4-Notes-Booklet-Teacher.co_.ke_.pdf" },
      { title: "Physics Paper 1 Summarised Notes", url: "/notes/Physics-P1-Summarised-Notes-Teacher.co_.ke_.pdf" }
    ]
  }
];

async function seedExtra() {
  console.log("📚 Adding new subjects and reference PDFs...");

  // 1. Add new subjects (English, Kiswahili, IRE)
  for (const sub of extraSubjects) {
    let subject = await prisma.subject.findUnique({ where: { slug: sub.slug } });
    if (!subject) {
      subject = await prisma.subject.create({
        data: {
          name: sub.name,
          slug: sub.slug,
          icon: sub.icon,
          paper: sub.paper
        }
      });
    }

    // Create a "General Reference" topic to hold the PDFs
    let topic = await prisma.topic.findUnique({ where: { slug: `${sub.slug}-general-reference` } });
    if (!topic) {
      topic = await prisma.topic.create({
        data: {
          name: "General Reference & Notes",
          slug: `${sub.slug}-general-reference`,
          form: 1, // Put it in Form 1 so it shows up at the top
          summary: `Complete revision materials and notes for ${sub.name}.`,
          subjectId: subject.id
        }
      });
    }

    // Add PDFs to the topic
    for (const pdf of sub.pdfs) {
      await prisma.studyNote.create({
        data: {
          topicId: topic.id,
          title: pdf.title,
          content: "Please view the embedded document below.",
          pdfUrl: pdf.url
        }
      });
    }
    console.log(`✅ Added ${sub.name} with ${sub.pdfs.length} PDFs`);
  }

  // 2. Add extra PDFs to existing subjects (Math, Bio, Chem, Phy)
  for (const item of extraScienceMathPdfs) {
    const subject = await prisma.subject.findUnique({ where: { name: item.subjectName } });
    if (subject) {
      // Find or create "General Reference" topic
      let topic = await prisma.topic.findUnique({ where: { slug: `${subject.slug}-general-reference` } });
      if (!topic) {
        topic = await prisma.topic.create({
          data: {
            name: `${subject.name} General Reference Booklets`,
            slug: `${subject.slug}-general-reference`,
            form: 1, // Puts it at the top of Form 1
            summary: "Comprehensive revision booklets, formula sheets, and compiled notes.",
            subjectId: subject.id
          }
        });
      }

      // Add PDFs
      for (const pdf of item.pdfs) {
        // Prevent duplicates
        const existing = await prisma.studyNote.findFirst({ where: { topicId: topic.id, title: pdf.title } });
        if (!existing) {
          await prisma.studyNote.create({
            data: {
              topicId: topic.id,
              title: pdf.title,
              content: "Please view the embedded document below.",
              pdfUrl: pdf.url
            }
          });
        }
      }
      console.log(`✅ Added ${item.pdfs.length} extra PDFs to ${item.subjectName}`);
    }
  }

  console.log("🎉 All extra subjects and PDFs seeded successfully!");
}

seedExtra()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
