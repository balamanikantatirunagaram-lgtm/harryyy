import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GeneratedLesson } from '../services/aiTutor';
import { supabase } from '../lib/supabase';

export type House = 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff' | 'Unsorted';

interface PlayerState {
  name: string;
  house: House;
  level: number;
  xp: number;
  currentChapter: number;
  currentLesson: number;
  unlockedSpells: string[];
  previousTopics: string[];
  prefetchedLesson: GeneratedLesson | null;
  setName: (name: string) => void;
  setHouse: (house: House) => void;
  addXP: (amount: number) => void;
  completeLesson: (topic: string, playedLessonNumber: number) => void;
  setPrefetchedLesson: (lesson: GeneratedLesson | null) => void;
  loadProfile: (username: string, data: any) => void;
  clearProfile: () => void;
}

const syncToCloud = async (username: string, updates: any) => {
  if (!username) return;
  try {
    await supabase.from('game_users').update(updates).eq('username', username);
  } catch (e) {
    console.warn("Failed to sync progress to cloud:", e);
  }
};

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      name: '',
      house: 'Unsorted',
      level: 1,
      xp: 0,
      currentChapter: 1,
      currentLesson: 1,
      unlockedSpells: [],
      previousTopics: [],
      prefetchedLesson: null,
      
      loadProfile: (username, data) => set({
        name: username,
        level: data.level || 1,
        xp: data.xp || 0,
        currentChapter: data.current_chapter || 1,
        currentLesson: data.current_lesson || 1,
        previousTopics: data.previous_topics || [],
        prefetchedLesson: null
      }),

      clearProfile: () => set({
        name: '', level: 1, xp: 0, currentChapter: 1, currentLesson: 1, previousTopics: [], prefetchedLesson: null
      }),

      setName: (name) => set({ name }),
      setHouse: (house) => set({ house }),
      
      addXP: (amount) => {
        const state = get();
        const newXP = state.xp + amount;
        const newLevel = Math.floor(newXP / 100) + 1;
        set({ xp: newXP, level: newLevel });
        syncToCloud(state.name, { xp: newXP, level: newLevel });
      },
      
      completeLesson: (topic, playedLessonNumber) => {
        const state = get();
        if (playedLessonNumber !== state.currentLesson) {
          return; // They are replaying an old level, don't advance the highest unlocked
        }
        
        const nextLesson = state.currentLesson + 1;
        const nextChapter = Math.floor((nextLesson - 1) / 6) + 1; 
        const newTopics = [...state.previousTopics, topic];
        
        set({
          currentLesson: nextLesson,
          currentChapter: nextChapter,
          previousTopics: newTopics,
          prefetchedLesson: null 
        });

        syncToCloud(state.name, {
          current_lesson: nextLesson,
          current_chapter: nextChapter,
          previous_topics: newTopics
        });
      },
      
      setPrefetchedLesson: (lesson) => set({ prefetchedLesson: lesson })
    }),
    {
      name: 'wizarding-academy-save',
    }
  )
);
