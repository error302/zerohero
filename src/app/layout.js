import "./globals.css";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { logout } from "@/app/actions/auth";

export const metadata = {
  title: "KCSE Mastery Academy",
  description: "Distraction-free, academic-focused LMS to help you score an A in KCSE.",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  
  let user = null;
  if (userId) {
    user = await prisma.user.findUnique({ where: { id: userId } });
  }

  return (
    <html lang="en" className="dark">
      <body className="bg-background text-text antialiased min-h-screen flex flex-col selection:bg-primary/30">
        {user && (
          <header className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shrink-0">
                  K
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">KCSE Mastery</h1>
                  <p className="text-[10px] sm:text-xs text-text-muted font-medium uppercase tracking-wider hidden sm:block">Zero to Hero</p>
                </div>
              </div>
              <nav className="flex items-center gap-4 sm:gap-6">
                <a href="/" className="text-xs sm:text-sm font-medium hover:text-white transition-colors hidden sm:block">Dashboard</a>
                <a href="/timetable" className="text-xs sm:text-sm font-medium hover:text-white transition-colors">Timetable</a>
                
                <form action={logout}>
                  <button type="submit" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center border border-border group-hover:border-red-500/50 transition-colors shrink-0">
                      <span className="text-sm font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                  </button>
                </form>
              </nav>
            </div>
          </header>
        )}
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
