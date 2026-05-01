import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TimetablePage() {
  // Fetch subjects to populate the timetable recommendations
  const subjects = await prisma.subject.findMany({
    orderBy: { name: "asc" },
  });

  // Mock an upcoming review count (in a real app, query UserProgress where nextReviewDate <= now)
  const pendingReviews = 14; 

  const weekDays = [
    { name: "Monday", morning: "Mathematics", evening: "Chemistry", focus: "Problem Solving" },
    { name: "Tuesday", morning: "Biology", evening: "Physics", focus: "Concept Mastery" },
    { name: "Wednesday", morning: "Mathematics", evening: "Spaced Repetition", focus: "Active Recall" },
    { name: "Thursday", morning: "Chemistry", evening: "Biology", focus: "Diagrams & Formulas" },
    { name: "Friday", morning: "Physics", evening: "Mathematics", focus: "Past Papers" },
    { name: "Saturday", morning: "Spaced Repetition", evening: "Mock Exam (Paper 1)", focus: "Exam Technique" },
    { name: "Sunday", morning: "Rest / Light Reading", evening: "Planning & Review", focus: "Recovery" },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Study Timetable</h1>
          <p className="text-text-muted text-lg">Your blueprint for achieving an 'A' grade. Stick to the routine.</p>
        </div>
        
        <Link 
          href="/"
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2"
        >
          <span className="text-xl">🧠</span>
          Start {pendingReviews} Due Reviews
        </Link>
      </div>

      {/* Routine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-8 border-t-4 border-t-blue-500 bg-gradient-to-b from-blue-900/10 to-transparent">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h2 className="text-xl font-bold text-white">Morning Session (5:00 AM - 6:30 AM)</h2>
          </div>
          <p className="text-text-muted mb-4">
            The brain is most alert in the morning. Use this time for heavy cognitive tasks like Mathematics and Physics calculations.
          </p>
          <ul className="space-y-2 text-sm text-text-muted">
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> 90 minutes of deep, uninterrupted focus</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Tackle new or difficult concepts</li>
            <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Solve at least 3 KCSE standard questions</li>
          </ul>
        </div>

        <div className="glass-panel p-8 border-t-4 border-t-purple-500 bg-gradient-to-b from-purple-900/10 to-transparent">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </div>
            <h2 className="text-xl font-bold text-white">Evening Session (8:00 PM - 10:00 PM)</h2>
          </div>
          <p className="text-text-muted mb-4">
            Consolidate memory before sleep. Use this block for Active Recall quizzes and Spaced Repetition reviews.
          </p>
          <ul className="space-y-2 text-sm text-text-muted">
            <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> 120 minutes of review and active recall</li>
            <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Complete all due SM-2 flashcards</li>
            <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Read "Made Familiar" PDFs for weak topics</li>
          </ul>
        </div>
      </div>

      {/* Weekly Schedule Table */}
      <div className="glass-panel overflow-hidden">
        <div className="p-6 border-b border-border bg-surface-hover/50">
          <h2 className="text-xl font-bold text-white">Weekly Master Schedule</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface">
                <th className="p-4 font-semibold text-text-muted uppercase tracking-wider text-xs border-b border-border">Day</th>
                <th className="p-4 font-semibold text-text-muted uppercase tracking-wider text-xs border-b border-border">Morning (Deep Work)</th>
                <th className="p-4 font-semibold text-text-muted uppercase tracking-wider text-xs border-b border-border">Evening (Active Recall)</th>
                <th className="p-4 font-semibold text-text-muted uppercase tracking-wider text-xs border-b border-border">Daily Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {weekDays.map((day, idx) => (
                <tr key={idx} className="hover:bg-surface/50 transition-colors">
                  <td className="p-4 font-bold text-white">{day.name}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      day.morning === 'Mathematics' ? 'bg-blue-500/20 text-blue-400' :
                      day.morning === 'Physics' ? 'bg-yellow-500/20 text-yellow-400' :
                      day.morning === 'Biology' ? 'bg-green-500/20 text-green-400' :
                      day.morning === 'Chemistry' ? 'bg-red-500/20 text-red-400' :
                      'bg-surface-hover text-text'
                    }`}>
                      {day.morning}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      day.evening.includes('Spaced Repetition') ? 'bg-indigo-500/20 text-indigo-400' :
                      day.evening === 'Mathematics' ? 'bg-blue-500/20 text-blue-400' :
                      day.evening === 'Physics' ? 'bg-yellow-500/20 text-yellow-400' :
                      day.evening === 'Biology' ? 'bg-green-500/20 text-green-400' :
                      day.evening === 'Chemistry' ? 'bg-red-500/20 text-red-400' :
                      'bg-surface-hover text-text'
                    }`}>
                      {day.evening}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-text-muted font-medium">{day.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
