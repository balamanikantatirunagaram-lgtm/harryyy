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

  return (
    // Parchment background with dark ink text
    <div className="min-h-full p-8 relative overflow-hidden" style={{ backgroundColor: '#E8D8B0', color: '#2C1810' }}>
      
      {/* Edge vignette effect to make it look like an old map */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 100px rgba(44, 24, 16, 0.4)' }} />

      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <h2 className="text-5xl font-fantasy mb-4 tracking-widest drop-shadow-sm" style={{ color: '#4A0404' }}>The Marauder's Path</h2>
        <p className="opacity-80 text-xl font-sans italic">"I solemnly swear that I am up to no good."</p>
      </div>

      <div className="flex flex-col items-center py-10 space-y-12 pb-32 relative z-10">
        {lessons.map((lesson, index) => {
                    const isActive = lesson.id === currentLesson;
          const isLocked = lesson.id > currentLesson;

          // Create a serpentine winding path
          const pattern = [0, 50, 90, 50, 0, -50, -90, -50];
          const xOffset = pattern[index % pattern.length];
          const nextOffset = pattern[(index + 1) % pattern.length];
          
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative flex flex-col items-center group"
              style={{ transform: `translateX(${xOffset}px)` }}
            >
              {/* Connection Line to next node (except last) */}
              {index < lessons.length - 1 && (
                <div 
                  className={`absolute w-1 h-20 -bottom-16 -z-10 ${isLocked ? 'border-dashed border-l-4 opacity-30' : 'border-solid border-l-4'}`}
                  style={{
                    borderColor: '#2C1810',
                    transform: `rotate(${nextOffset > xOffset ? '-25deg' : nextOffset < xOffset ? '25deg' : '0deg'})`,
                    transformOrigin: 'top center'
                  }}
                />
              )}

              {/* Lesson Node */}
              <div 
                onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
                className={`w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-xl transition-all duration-300 ${
                  isLocked 
                    ? 'bg-[#D4C39B] border-[#2C1810]/40 cursor-not-allowed opacity-60' 
                    : isActive
                      ? 'bg-[#4A0404] border-[#2C1810] cursor-pointer scale-125 hover:scale-110 shadow-black/30'
                      : 'bg-[#2C1810] border-[#2C1810] cursor-pointer hover:scale-110 shadow-black/20'
                }`}
              >
                {isLocked ? (
                  <Lock className="w-6 h-6 text-[#2C1810]/50" />
                ) : isActive ? (
                  lesson.isBoss ? <Skull className="w-8 h-8 text-[#E8D8B0] animate-pulse" /> : <Flame className="w-8 h-8 text-[#E8D8B0] animate-pulse" />
                ) : (
                  lesson.isBoss ? <Skull className="w-6 h-6 text-[#E8D8B0]" /> : <Footprints className="w-7 h-7 text-[#E8D8B0]" />
                )}
              </div>

              {/* Tooltip / Label */}
              <div className={`absolute top-1/2 -translate-y-1/2 ${xOffset >= 0 ? 'right-full mr-6 text-right' : 'left-full ml-6 text-left'} w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${isLocked ? 'opacity-50' : 'opacity-100'}`} style={{ color: isActive ? '#4A0404' : '#2C1810' }}>
                  Chapter {lesson.chapterNumber} • Lesson {lesson.id}
                </div>
                <div className={`text-sm font-sans ${isLocked ? 'opacity-40' : 'opacity-90 font-bold'}`}>
                  {lesson.title}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AcademyMap;
