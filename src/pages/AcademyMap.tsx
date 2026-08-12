import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Skull, Check, Sparkles, Feather } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { CURRICULUM } from '../data/curriculum';

const AcademyMap: React.FC = () => {
  const navigate = useNavigate();
  const { currentLesson } = usePlayerStore();

  const lessons = Object.entries(CURRICULUM).map(([key, val]) => ({
    id: Number(key),
    ...val
  })).sort((a, b) => a.id - b.id);

  const ySpacing = 160;
  const startY = 320;
  
  // A sprawling pattern covering the whole screen
  const pattern = [
    0, 220, 380, 200, -80, -280, -420, -220, 
    100, 320, 450, 150, -120, -350, -450, -150, 
    120, 340, 460, 180, -100, -320, -460, -200,
    180, 380, 420, 120, -220, -380
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

  return (
    <div 
      className="min-h-full relative overflow-y-auto overflow-x-hidden font-fantasy" 
      style={{ 
        backgroundColor: '#E8D8B0', 
        color: '#2C1810',
        backgroundImage: `
          radial-gradient(circle at center, transparent 0%, rgba(44,24,16,0.6) 120%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")
        `
      }}
    >
      
      {/* Dynamic Magical Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold/20 blur-sm"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-20 w-full max-w-5xl">
        <div className="flex items-center justify-center space-x-6 mb-2">
          <Feather className="w-10 h-10 opacity-70" style={{ color: '#4A0404' }} />
          <h2 className="text-7xl font-bold tracking-widest drop-shadow-md" style={{ color: '#4A0404' }}>The Marauder's Path</h2>
          <Feather className="w-10 h-10 opacity-70 transform -scale-x-100" style={{ color: '#4A0404' }} />
        </div>
        <p className="opacity-80 text-2xl font-sans italic tracking-wide">"I solemnly swear that I am up to no good."</p>
      </div>

      <div className="relative w-full z-10" style={{ height: totalHeight }}>
        
        {/* SVG Path connecting all nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: 0, left: 0, filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))' }}>
          <path 
            d={`M ${nodePositions.map(p => `calc(50% + ${p.xOffset}px) ${p.y}`).join(' L ')}`} 
            fill="none" 
            stroke="#4A0404" 
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 15" 
            className="opacity-50"
          />
        </svg>

        {nodePositions.map((node, index) => {
          return (
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
              {/* Lesson Node */}
              <div 
                onClick={() => !node.isLocked && navigate(`/lesson/${node.id}`)}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  node.isLocked 
                    ? 'border-[3px] border-[#2C1810]/20 bg-[#E8D8B0] cursor-not-allowed opacity-70 hover:opacity-90' 
                    : node.isActive
                      ? 'border-4 border-gold bg-gradient-to-br from-red-700 to-red-900 cursor-pointer scale-125 shadow-[0_0_30px_rgba(220,38,38,0.5)] z-30'
                      : 'border-2 border-[#3a0a0a] bg-[#6B1B1B] cursor-pointer shadow-[inset_0_-4px_8px_rgba(0,0,0,0.5),0_4px_10px_rgba(0,0,0,0.3)] hover:scale-110' // Wax seal look
                }`}
              >
                {/* Wax seal inner ring for completed levels */}
                {node.isCompleted && (
                  <div className="absolute inset-2 rounded-full border border-[#9A2B2B] opacity-50" />
                )}

                {node.isLocked ? (
                  <div className="w-3 h-3 rounded-full bg-[#2C1810]/20" />
                ) : node.isActive ? (
                  node.isBoss ? <Skull className="w-10 h-10 text-gold animate-pulse drop-shadow-md" /> : <Sparkles className="w-10 h-10 text-gold animate-pulse drop-shadow-md" />
                ) : (
                  node.isBoss ? <Skull className="w-8 h-8 text-gold drop-shadow-md" /> : <Check className="w-10 h-10 text-gold drop-shadow-md" />
                )}
              </div>

              {/* Enhanced Tooltip */}
              <div 
                className={`absolute top-1/2 -translate-y-1/2 ${node.xOffset >= 0 ? 'right-full mr-8 text-right' : 'left-full ml-8 text-left'} w-64 transition-all duration-300 ${node.isActive ? 'opacity-100 translate-x-0' : 'opacity-0 group-hover:opacity-100 translate-x-4 pointer-events-none'}`}
              >
                <div className={`p-4 rounded-lg border-2 shadow-2xl backdrop-blur-sm ${
                  node.isActive ? 'bg-[#2C1810]/95 border-gold text-parchment scale-110' : 'bg-[#E8D8B0]/95 border-[#2C1810]/30 text-[#2C1810]'
                }`}>
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${node.isActive ? 'text-gold' : 'text-[#4A0404]'}`}>
                    Chapter {node.chapterNumber} • Lesson {node.id}
                  </div>
                  <div className={`text-lg leading-tight ${node.isLocked ? 'opacity-50' : 'opacity-100 font-bold'}`}>
                    {node.title}
                  </div>
                  {node.isCompleted && (
                    <div className="text-xs text-green-700/80 mt-2 font-bold uppercase tracking-wider flex items-center justify-end">
                      <Check className="w-3 h-3 mr-1" /> Mastered
                    </div>
                  )}
                </div>
              </div>
              
              {/* Chapter Header spanning across */}
              {node.id % 6 === 1 && (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   className={`absolute -top-24 whitespace-nowrap text-3xl font-fantasy flex items-center space-x-4`} 
                   style={{ color: '#4A0404' }}
                 >
                   <span className="w-12 h-px bg-[#4A0404]/30" />
                   <span className="tracking-widest bg-[#E8D8B0] px-4 py-1 border border-[#4A0404]/20 rounded-full shadow-sm">
                     Chapter {node.chapterNumber}
                   </span>
                   <span className="w-12 h-px bg-[#4A0404]/30" />
                 </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AcademyMap;
