import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SubjectPage({ params }) {
  const { slug } = await params;

  const subject = await prisma.subject.findUnique({
    where: { slug },
    include: {
      topics: {
        orderBy: [{ form: "asc" }, { name: "asc" }],
      },
    },
  });

  if (!subject) {
    notFound();
  }

  // Group topics by Form
  const topicsByForm = subject.topics.reduce((acc, topic) => {
    if (!acc[topic.form]) acc[topic.form] = [];
    acc[topic.form].push(topic);
    return acc;
  }, {});

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-6 glass-panel p-8 bg-gradient-to-r from-surface to-surface-hover border-l-4 border-l-primary">
        <div className="w-20 h-20 rounded-2xl bg-surface flex items-center justify-center text-5xl shadow-inner border border-border shrink-0">
          {subject.icon}
        </div>
        <div>
          <Link href="/" className="text-sm font-medium text-primary hover:text-primary-hover mb-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white tracking-tight">{subject.name}</h1>
          <p className="text-text-muted mt-2 text-lg">{subject.paper}</p>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="space-y-12">
        {[1, 2, 3, 4].map((formNum) => {
          const formTopics = topicsByForm[formNum];
          if (!formTopics || formTopics.length === 0) return null;

          return (
            <section key={formNum} className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">
                    F{formNum}
                  </span>
                  Form {formNum}
                </h2>
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-sm font-medium text-text-muted">{formTopics.length} Topics</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {formTopics.map((topic, index) => (
                  <Link 
                    href={`/topic/${topic.slug}`} 
                    key={topic.id}
                    className="glass-panel p-5 hover-lift group border-l-2 border-l-transparent hover:border-l-primary transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center text-xs font-bold text-text-muted group-hover:text-primary transition-colors border border-border">
                        {index + 1}
                      </div>
                      
                      {/* Status indicator (mock) */}
                      <div className="w-2 h-2 rounded-full bg-border group-hover:bg-primary/50 transition-colors"></div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors leading-tight">
                      {topic.name}
                    </h3>
                    
                    <p className="text-sm text-text-muted line-clamp-2 mt-auto mb-4">
                      {topic.summary}
                    </p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                      <span className="text-xs font-medium text-text-muted flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                        KLB Notes
                      </span>
                      <span className="text-xs font-medium text-text-muted flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        Quiz
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
