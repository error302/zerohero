import "./globals.css";

export const metadata = {
  title: "KCSE Mastery Academy",
  description: "Distraction-free, academic-focused LMS to help you score an A in KCSE.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-text antialiased min-h-screen flex flex-col">
        <header className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">
                K
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">KCSE Mastery</h1>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Zero to Hero</p>
              </div>
            </div>
            <nav className="flex items-center gap-6">
              <a href="/" className="text-sm font-medium hover:text-white transition-colors">Dashboard</a>
              <a href="/timetable" className="text-sm font-medium hover:text-white transition-colors">Timetable</a>
              <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center border border-border">
                <span className="text-sm font-bold">S</span>
              </div>
            </nav>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
