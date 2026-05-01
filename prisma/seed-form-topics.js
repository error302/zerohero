const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function mapFormSpecificPdfs() {
  console.log("🔗 Mapping form-specific PDFs to individual topics...");

  const mappingRules = [
    { subject: "Biology", form: 2, pdf: { title: "Biology Form 2 Notes", url: "/notes/biology-form-2-notes.pdf" } },
    { subject: "Biology", form: 3, pdf: { title: "Biology Form 3 Notes", url: "/notes/biology-form-3-notes.pdf" } },
    { subject: "Biology", form: 4, pdf: { title: "Biology Form 4 Notes", url: "/notes/biology-form-4-notes.pdf" } },
    { subject: "Mathematics", form: 1, pdf: { title: "Form 1 Maths Notes", url: "/notes/Maths-Form-1-Notes-Updated-Teacher.co_.ke_.pdf" } },
    { subject: "Chemistry", form: 1, pdf: { title: "Form 1 Chemistry Notes", url: "/notes/KCSE-FORM-1-CHEMISTRY-NOTES.pdf" } },
  ];

  for (const rule of mappingRules) {
    const subject = await prisma.subject.findUnique({ where: { name: rule.subject } });
    if (!subject) continue;

    // Find all topics for this specific form and subject
    const topics = await prisma.topic.findMany({
      where: { subjectId: subject.id, form: rule.form }
    });

    for (const topic of topics) {
      // Prevent duplicates
      const existing = await prisma.studyNote.findFirst({
        where: { topicId: topic.id, title: rule.pdf.title }
      });

      if (!existing) {
        await prisma.studyNote.create({
          data: {
            topicId: topic.id,
            title: rule.pdf.title,
            content: `Form ${rule.form} specific notes covering ${topic.name}.`,
            pdfUrl: rule.pdf.url,
            sortOrder: 1 // Put it after the main "Made Familiar" pdf
          }
        });
      }
    }
    console.log(`✅ Mapped ${rule.pdf.title} to ${topics.length} individual Form ${rule.form} topics.`);
  }

  console.log("🎉 Form-specific mapping complete!");
}

mapFormSpecificPdfs()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
