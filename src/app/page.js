import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Dashboard() {
  const subjects = await prisma.subject.findMany({
    include: {
      topics: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">Student Dashboard</h2>
        <p className="text-text-muted">Welcome back. Pick up where you left off and secure that A.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Streak Card */}
        <div className="glass-panel p-6 flex flex-col items-center justify-center text-center gap-2">
          <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-2">
            <span className="text-3xl">🔥</span>
          </div>
          <h3 className="text-2xl font-bold text-white">4 Days</h3>
          <p className="text-sm text-text-muted uppercase tracking-wider font-semibold">Current Streak</p>
        </div>
        
        {/* Mastery Card */}
        <div className="glass-panel p-6 flex flex-col items-center justify-center text-center gap-2">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
            <span className="text-3xl">🎯</span>
          </div>
          <h3 className="text-2xl font-bold text-white">12%</h3>
          <p className="text-sm text-text-muted uppercase tracking-wider font-semibold">Syllabus Mastery</p>
        </div>

        {/* Pending Reviews Card */}
        <div className="glass-panel p-6 flex flex-col items-center justify-center text-center gap-2 md:col-span-2 bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border-indigo-500/30">
          <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-2">
            <span className="text-3xl">🧠</span>
          </div>
          <h3 className="text-2xl font-bold text-white">14 Questions Ready</h3>
          <p className="text-sm text-indigo-300 uppercase tracking-wider font-semibold">Spaced Repetition Review</p>
          <button className="mt-4 px-6 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-lg transition-colors">
            Start Review Session
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-primary">📚</span> Core Subjects
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <Link 
              href={`/subject/${subject.slug}`} 
              key={subject.id}
              className="glass-panel p-6 hover-lift group block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-surface flex items-center justify-center text-3xl shadow-inner border border-border">
                    {subject.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {subject.name}
                    </h4>
                    <p className="text-sm text-text-muted mt-1">{subject.paper}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between text-sm">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1.5 text-text-muted">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                    {subject.topics.length} Topics
                  </span>
                </div>
                
                {/* Mock progress bar */}
                <div className="flex items-center gap-3 w-1/2">
                  <span className="text-xs font-semibold text-text-muted w-8 text-right">0%</span>
                  <div className="h-2 w-full bg-surface rounded-full overflow-hidden border border-border">
                    <div className="h-full bg-primary w-0 rounded-full"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
