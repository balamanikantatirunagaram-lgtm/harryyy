import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { usePlayerStore } from '../../store/playerStore';
import { LogOut, Map, User, Scroll } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const AppLayout: React.FC = () => {
  const { name, level, xp } = usePlayerStore();
  const { logout } = useAuthStore();

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      {/* Header / Nav */}
      <header className="panel-dark flex items-center justify-between px-8 py-4 sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <Scroll className="w-8 h-8 text-gold" />
          <h1 className="text-xl font-fantasy text-gold-light uppercase tracking-widest">Arcane Academy of Code</h1>
        </div>
        
        <nav className="flex space-x-8">
          <Link to="/academy" className="flex items-center space-x-2 text-parchment-dark hover:text-gold transition-colors">
            <Map size={18} /> <span>Academy Map</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-6 text-sm">
          <div className="flex flex-col items-end">
            <span className="font-bold text-parchment">{name || 'Student'}</span>
            <span className="text-gold-dark text-xs">Level {level} • {xp} XP</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-gold-dark flex items-center justify-center bg-midnight overflow-hidden">
            <User className="text-parchment/50" />
          </div>
          <button onClick={logout} className="text-burgundy hover:text-red-500 transition-colors ml-4" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
