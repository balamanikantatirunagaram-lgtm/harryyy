import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Lock, Skull, Play } from 'lucide-react';
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
    <div className="min-h-full p-8 relative overflow-hidden bg-midnight">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-fantasy text-gold mb-4 tracking-widest drop-shadow-lg">The Marauder's Path</h2>
        <p className="text-parchment/80 text-xl font-sans">Trace your steps through the magical curriculum.</p>
      </div>

      <div className="flex flex-col items-center py-10 space-y-12 pb-32">
        {lessons.map((lesson, index) => {
          const isCompleted = lesson.id < currentLesson;
          const isActive = lesson.id === currentLesson;
          const isLocked = lesson.id > currentLesson;

          // Create a serpentine winding path
          const pattern = [0, 40, 80, 40, 0, -40, -80, -40];
          const xOffset = pattern[index % pattern.length];
          
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative flex flex-col items-center group z-10"
              style={{ transform: `translateX(${xOffset}px)` }}
            >
              {/* Connection Line to next node (except last) */}
              {index < lessons.length - 1 && (
                <div 
                  className={`absolute w-2 h-20 -bottom-16 -z-10 ${isCompleted ? 'bg-gold' : 'bg-midnight-light'}`}
                  style={{
                    transform: `rotate(${pattern[(index + 1) % pattern.length] > xOffset ? '-20deg' : pattern[(index + 1) % pattern.length] < xOffset ? '20deg' : '0deg'})`,
                    transformOrigin: 'top center'
                  }}
                />
              )}

              {/* Lesson Node */}
              <div 
                onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
                className={`w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-2xl transition-all duration-300 ${
                  isLocked 
                    ? 'bg-midnight-dark border-midnight-light cursor-not-allowed opacity-60' 
                    : isActive
                      ? 'bg-burgundy border-gold cursor-pointer scale-125 hover:scale-110 shadow-gold/50'
                      : 'bg-emerald-900 border-emerald-400 cursor-pointer hover:scale-110 hover:border-white shadow-emerald-900/50'
                }`}
              >
                {isLocked ? (
                  <Lock className="w-8 h-8 text-parchment/30" />
                ) : isActive ? (
                  lesson.isBoss ? <Skull className="w-10 h-10 text-gold animate-pulse" /> : <Play className="w-10 h-10 text-gold ml-1" />
                ) : (
                  lesson.isBoss ? <Skull className="w-8 h-8 text-emerald-400" /> : <Check className="w-10 h-10 text-emerald-400" />
                )}
              </div>

              {/* Tooltip / Label */}
              <div className={`absolute top-1/2 -translate-y-1/2 ${xOffset >= 0 ? 'right-full mr-6 text-right' : 'left-full ml-6 text-left'} w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${isLocked ? 'text-parchment/50' : 'text-gold'}`}>
                  Lesson {lesson.id}
                </div>
                <div className={`text-sm font-sans ${isLocked ? 'text-parchment/30' : 'text-parchment'}`}>
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
