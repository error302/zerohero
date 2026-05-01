import { loginAsStudent } from "@/app/actions/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="glass-panel p-10 max-w-md w-full text-center space-y-8 relative overflow-hidden border-blue-500/20">
        <div className="absolute top-0 right-0 p-6 opacity-5 text-9xl leading-none font-bold select-none">
          K
        </div>
        
        <div className="relative z-10 space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg text-2xl mb-6">
            K
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">KCSE Mastery</h1>
          <p className="text-text-muted">Welcome back. Let's secure that A.</p>
        </div>

        <form action={loginAsStudent} className="relative z-10 space-y-6 pt-4">
          <div className="space-y-2 text-left">
            <label htmlFor="name" className="text-sm font-bold text-text-muted uppercase tracking-wider">
              Student Name
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="E.g., Sarah"
              required
              className="w-full bg-surface border border-border p-4 rounded-xl text-white focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold transition-all shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
          >
            Start Studying
          </button>
        </form>
      </div>
    </div>
  );
}
