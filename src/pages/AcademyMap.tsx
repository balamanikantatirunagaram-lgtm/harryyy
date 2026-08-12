import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Skull, Footprints, Flame } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { CURRICULUM } from '../data/curriculum';

const AcademyMap: React.FC = () => {
  const navigate = useNavigate();
  const { currentLesson } = usePlayerStore();

  const lessons = Object.entries(CURRICULUM).map(([key, val]) => ({
    id: Number(key),
    ...val
  })).sort((a, b) => a.id - b.id);

  const ySpacing = 180;
  const startY = 300;
  
  // A pattern of wide X offsets to cover the screen like an adventurous map
  const pattern = [
    0, 200, 350, 220, -50, -250, -400, -220, 
    80, 300, 420, 150, -120, -320, -420, -150, 
    100, 320, 450, 200, -100, -300, -450, -200,
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

  return (
    // Parchment background with dark ink text
    <div className="min-h-full relative overflow-y-auto overflow-x-hidden" style={{ backgroundColor: '#E8D8B0', color: '#2C1810' }}>
      
      {/* Edge vignette effect to make it look like an old map */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ boxShadow: 'inset 0 0 150px rgba(44, 24, 16, 0.5)' }} />

      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-20 w-full max-w-4xl">
        <h2 className="text-6xl font-fantasy mb-4 tracking-widest drop-shadow-sm" style={{ color: '#4A0404' }}>The Marauder's Path</h2>
        <p className="opacity-80 text-2xl font-sans italic">"I solemnly swear that I am up to no good."</p>
      </div>

      <div className="relative w-full z-10" style={{ height: totalHeight }}>
        
        {/* SVG Path connecting all nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: 0, left: 0 }}>
          <path 
            d={`M ${nodePositions.map(p => `calc(50% + ${p.xOffset}px) ${p.y}`).join(' L ')}`} 
            fill="none" 
            stroke="#4A0404" 
            strokeWidth="3"
            strokeDasharray="12 12" 
            className="opacity-40"
          />
        </svg>

        {nodePositions.map((node, index) => {
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
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
                className={`w-20 h-20 rounded-full flex items-center justify-center border-[5px] shadow-2xl transition-all duration-300 ${
                  node.isLocked 
                    ? 'bg-[#D4C39B] border-[#2C1810]/40 cursor-not-allowed opacity-60' 
                    : node.isActive
                      ? 'bg-[#4A0404] border-[#2C1810] cursor-pointer scale-125 hover:scale-110 shadow-black/40'
                      : 'bg-[#2C1810] border-[#2C1810] cursor-pointer hover:scale-110 shadow-black/30'
                }`}
              >
                {node.isLocked ? (
                  <Lock className="w-8 h-8 text-[#2C1810]/50" />
                ) : node.isActive ? (
                  node.isBoss ? <Skull className="w-10 h-10 text-[#E8D8B0] animate-pulse" /> : <Flame className="w-10 h-10 text-[#E8D8B0] animate-pulse" />
                ) : (
                  node.isBoss ? <Skull className="w-8 h-8 text-[#E8D8B0]" /> : <Footprints className="w-9 h-9 text-[#E8D8B0]" />
                )}
              </div>

              {/* Tooltip / Label directly next to the node */}
              <div className={`absolute top-1/2 -translate-y-1/2 ${node.xOffset >= 0 ? 'right-full mr-8 text-right' : 'left-full ml-8 text-left'} w-56 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#E8D8B0]/90 p-2 rounded border border-[#2C1810]/20 shadow-lg backdrop-blur-sm`}>
                <div className={`text-sm font-bold uppercase tracking-widest mb-1 ${node.isLocked ? 'opacity-50' : 'opacity-100'}`} style={{ color: node.isActive ? '#4A0404' : '#2C1810' }}>
                  Chapter {node.chapterNumber} • Lesson {node.id}
                </div>
                <div className={`text-base font-sans leading-tight ${node.isLocked ? 'opacity-50' : 'opacity-90 font-bold'}`}>
                  {node.title}
                </div>
              </div>
              
              {/* Optional: Always visible chapter label if it's the first lesson of a chapter */}
              {node.id % 6 === 1 && (
                 <div className={`absolute -top-12 whitespace-nowrap text-xl font-fantasy opacity-80`} style={{ color: '#4A0404' }}>
                   Chapter {node.chapterNumber}
                 </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AcademyMap;
