import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Scroll, Lock } from 'lucide-react';

import { usePlayerStore } from '../store/playerStore';
import { generateLesson } from '../services/aiTutor';

const AcademyMap: React.FC = () => {
  const navigate = useNavigate();
  const { level, currentChapter, currentLesson, previousTopics, prefetchedLesson, setPrefetchedLesson } = usePlayerStore();
  const [isPrefetching, setIsPrefetching] = useState(false);

  useEffect(() => {
    // If we don't have a lesson ready for the exact current state, fetch it in the background now!
    if (!prefetchedLesson || prefetchedLesson.chapterNumber !== currentChapter) {
      setIsPrefetching(true);
      generateLesson(level, currentChapter, previousTopics, currentLesson)
        .then(lesson => {
          setPrefetchedLesson(lesson);
          setIsPrefetching(false);
        })
        .catch(err => {
          console.error("Initial prefetch failed:", err);
          setIsPrefetching(false);
        });
    }
  }, [level, currentChapter, currentLesson, previousTopics, prefetchedLesson, setPrefetchedLesson]);

  return (
    <div className="min-h-full p-12 relative">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h2 className="text-4xl font-fantasy text-gold mb-2 tracking-widest">Academy Grounds</h2>
          <p className="text-parchment-dark text-lg">Select a location to continue your studies.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="panel-dark p-8 rounded-lg border-2 border-gold/50 hover:border-gold cursor-pointer transition-colors relative overflow-hidden group"
            onClick={() => navigate(`/lesson/${currentLesson}`)}
          >
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-6">
              <Scroll className="text-gold w-8 h-8" />
              <span className="bg-emerald-900/50 text-emerald-400 text-xs px-2 py-1 rounded border border-emerald-500/30 uppercase tracking-widest">Active</span>
            </div>
            <h3 className="text-2xl font-fantasy text-parchment-light mb-2">Current Study</h3>
            <p className="text-sm text-parchment/70 font-sans mb-4">Chapter {currentChapter} • Lesson {currentLesson}</p>
            
            <p className="text-xs text-gold-dark mt-4 border-t border-parchment/10 pt-4 flex items-center justify-between">
              <span>Resume your arcane training</span>
              {isPrefetching ? (
                <span className="text-blue-400 animate-pulse">Scribing...</span>
              ) : (
                <span className="text-emerald-400">Ready</span>
              )}
            </p>
          </motion.div>

          <motion.div 
            className="panel-dark p-8 rounded-lg border border-parchment/10 opacity-75 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <BookOpen className="text-parchment/30 w-8 h-8" />
              <Lock className="text-parchment/30 w-5 h-5" />
            </div>
            <h3 className="text-2xl font-fantasy text-parchment/50 mb-2">Potions Laboratory</h3>
            <p className="text-sm text-parchment/40 font-sans mb-4">Chapter 2 • Crossing the Threshold</p>
            <p className="text-xs text-parchment/30 mt-4 border-t border-parchment/10 pt-4">Requires Chapter 1 completion</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AcademyMap;
