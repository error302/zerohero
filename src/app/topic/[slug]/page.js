import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TopicPage({ params }) {
  const { slug } = await params;

  const topic = await prisma.topic.findUnique({
    where: { slug },
    include: {
      subject: true,
      studyNotes: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!topic) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-medium text-text-muted mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href={`/subject/${topic.subject.slug}`} className="hover:text-primary transition-colors">
          {topic.subject.name}
        </Link>
        <span>/</span>
        <span className="text-white">Form {topic.form}</span>
      </div>

      {/* Header */}
      <div className="glass-panel p-8 bg-gradient-to-br from-surface to-surface-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 text-9xl leading-none font-bold select-none">
          {topic.subject.icon}
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
            Form {topic.form} • {topic.subject.name}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            {topic.name}
          </h1>
          <p className="text-xl text-text-muted max-w-2xl leading-relaxed">
            {topic.summary}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="glass-panel p-8 md:p-12">
        {topic.studyNotes.length > 0 ? (
          <div className="space-y-12">
            {topic.studyNotes.map((note) => (
              <div key={note.id} className="prose prose-invert prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-border">
                  {note.title}
                </h2>
                
                <div className="text-text-muted leading-relaxed">
                  {/* Basic markdown simulation for now */}
                  {note.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </div>

                {note.pdfUrl && (
                  <div className="mt-8 flex flex-col gap-4">
                    <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></svg>
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">Made Familiar PDF Notes</h4>
                          <p className="text-sm text-blue-300">Complete topic revision material embedded below</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-border shadow-2xl relative bg-white">
                      <iframe 
                        src={`${note.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full absolute inset-0"
                        title="PDF Viewer"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mx-auto mb-4 text-2xl">
              🚧
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Notes Coming Soon</h3>
            <p className="text-text-muted">
              We are currently generating the AI notes for this topic. Check back later!
            </p>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <Link 
          href={`/subject/${topic.subject.slug}`}
          className="px-6 py-3 rounded-lg border border-border bg-surface hover:bg-surface-hover text-white font-medium transition-colors w-full sm:w-auto text-center"
        >
          Back to Topics
        </Link>
        <Link 
          href={`/quiz/${topic.slug}`}
          className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold shadow-lg shadow-green-900/20 transition-all hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Take KCSE Quiz
        </Link>
      </div>
    </div>
  );
}
