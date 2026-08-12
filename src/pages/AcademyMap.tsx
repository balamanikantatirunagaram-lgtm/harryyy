import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, BookOpen, Shield, Trophy, Star } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { CURRICULUM } from '../data/curriculum';

const AcademyMap: React.FC = () => {
  const navigate = useNavigate();
  const { currentLesson } = usePlayerStore();

  const lessons = Object.entries(CURRICULUM).map(([key, val]) => ({
    id: Number(key),
    ...val
  })).sort((a, b) => a.id - b.id);

  const ySpacing = 220;
  const startY = 300;
  
  const pattern = [
    0, 250, 100, 300, -100, -250, -100, -300, 
    50, 250, 400, 200, -50, -300, -400, -150, 
    100, 300, 150, 350, -100, -250, -350, -200,
    150, 350, 400, 100, -200, -350
  ];

  const nodePositions = lessons.map((lesson, index) => ({
    ...lesson,
    xOffset: pattern[index % pattern.length],
    y: startY + index * ySpacing,
    isCompleted: lesson.id < currentLesson,
    isActive: lesson.id === currentLesson,
    isLocked: lesson.id > currentLesson
  }));

  const totalHeight = startY + lessons.length * ySpacing + 200;

  const generatePath = () => {
    return nodePositions.map((p, i) => {
      const x = `calc(50% + ${p.xOffset}px)`;
      if (i === 0) return `M ${x} ${p.y}`;
      const prev = nodePositions[i-1];
      const prevX = `calc(50% + ${prev.xOffset}px)`;
      const cpY = prev.y + (p.y - prev.y) / 2;
      return `C ${prevX} ${cpY}, ${x} ${cpY}, ${x} ${p.y}`;
    }).join(' ');
  };

  return (
    <div className="min-h-full relative overflow-y-auto overflow-x-hidden font-fantasy bg-[#0a0a0c]">
      
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{ 
          boxShadow: 'inset 0 0 200px rgba(0, 0, 0, 0.9)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`
        }} 
      />

      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-20 w-full max-w-5xl">
        <h3 className="text-xl text-[#D4AF37] tracking-[0.3em] uppercase mb-2">Year 1</h3>
        <h2 className="text-5xl font-bold tracking-widest text-[#F3E5AB] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          The Coder's Journey
        </h2>
        <div className="mt-4 flex items-center justify-center space-x-4">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <Star className="w-4 h-4 text-[#D4AF37]/80" />
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </div>

      <div className="relative w-full z-10" style={{ height: totalHeight }}>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ top: 0, left: 0 }}>
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path 
            d={generatePath()} 
            fill="none" 
            stroke="#D4AF37" 
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 12" 
            className="opacity-70"
            filter="url(#glow)"
          />
        </svg>

        {nodePositions.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute group z-20 flex flex-col items-center justify-center"
            style={{ 
              top: node.y, 
              left: `calc(50% + ${node.xOffset}px)`,
              transform: 'translate(-50%, -50%)' 
            }}
          >
            <div className={`absolute w-64 h-64 rounded-full pointer-events-none transition-opacity duration-700 ${node.isActive ? 'bg-[#D4AF37]/10 blur-3xl opacity-100' : 'bg-[#D4AF37]/5 blur-2xl opacity-40 group-hover:opacity-100'}`} />

            <div className="mb-4 text-center pointer-events-none w-64 z-10">
              <div className={`text-sm font-bold uppercase tracking-[0.2em] mb-1 ${node.isLocked ? 'text-gray-500' : 'text-[#D4AF37]'}`}>
                Chapter {node.chapterNumber}
              </div>
              <div className={`text-lg font-sans ${node.isLocked ? 'text-gray-600' : 'text-gray-200 drop-shadow-md'}`}>
                {node.title}
              </div>
            </div>

            <div 
              onClick={() => !node.isLocked && navigate(`/lesson/${node.id}`)}
              className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 z-10 p-1 ${
                node.isLocked 
                  ? 'border border-gray-700/50 cursor-not-allowed opacity-60 bg-[#111]' 
                  : node.isActive
                    ? 'border border-[#D4AF37] cursor-pointer scale-110 shadow-[0_0_30px_rgba(212,175,55,0.4)] bg-[#1a1505]'
                    : 'border border-[#D4AF37]/50 cursor-pointer hover:scale-110 bg-[#111] hover:border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]'
              }`}
            >
              <div className={`w-full h-full rounded-full border flex items-center justify-center flex-col ${
                node.isLocked ? 'border-gray-800' : 'border-[#D4AF37]/80'
              }`}>
                {node.isLocked ? (
                  <Lock className="w-6 h-6 text-gray-700" />
                ) : (
                  <span className={`text-3xl ${node.isActive ? 'text-[#F3E5AB] drop-shadow-[0_0_8px_rgba(243,229,171,0.8)]' : 'text-[#D4AF37]'}`}>
                    {node.id}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-3 pointer-events-none z-10">
              {node.isLocked ? (
                  <div className="w-1 h-1 rounded-full bg-gray-700" />
              ) : node.isBoss ? (
                  <Trophy className="w-5 h-5 text-[#D4AF37] drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
              ) : node.isCompleted ? (
                  <Shield className="w-5 h-5 text-emerald-500/80" />
              ) : (
                  <BookOpen className="w-5 h-5 text-[#D4AF37]/70" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AcademyMap;
