import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import { usePlayerStore } from './playerStore';

export interface UserAccount {
  username: string;
  passwordHash: string; // Storing plain text for prototype, usually hashed
  securityAnswer: string; // Nickname
}

interface AuthState {
  users: UserAccount[];
  currentUser: string | null;
  register: (username: string, passwordHash: string, securityAnswer: string) => Promise<boolean>;
  login: (username: string, passwordHash: string) => Promise<boolean>;
  logout: () => void;
  verifySecurityAnswer: (username: string, answer: string) => Promise<boolean>;
  changePassword: (username: string, newPasswordHash: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      
      register: async (username, passwordHash, securityAnswer) => {
        try {
          const { error, data } = await supabase.from('game_users').insert([{
            username,
            password_hash: passwordHash,
            security_answer: securityAnswer
          }]).select().single();
          
          if (error && error.code === '23505') return false; // Unique violation
          if (!error && data) {
            set({ currentUser: username });
            usePlayerStore.getState().loadProfile(username, data);
            return true;
          }
        } catch (e) { console.warn("Supabase auth failed, falling back to local."); }

        // Fallback Local
        const { users } = get();
        if (users.find(u => u.username === username)) return false;
        set({ users: [...users, { username, passwordHash, securityAnswer }], currentUser: username });
        usePlayerStore.getState().loadProfile(username, {});
        return true;
      },
      
      login: async (username, passwordHash) => {
        try {
          const { data } = await supabase
            .from('game_users')
            .select('*')
            .eq('username', username)
            .eq('password_hash', passwordHash)
            .single();
          
          if (data) {
            set({ currentUser: username });
            usePlayerStore.getState().loadProfile(username, data);
            return true;
          }
        } catch (e) { console.warn("Supabase auth failed, falling back to local."); }

        // Fallback Local
        const { users } = get();
        const user = users.find(u => u.username === username && u.passwordHash === passwordHash);
        if (user) {
          set({ currentUser: username });
          usePlayerStore.getState().loadProfile(username, {});
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ currentUser: null });
        usePlayerStore.getState().clearProfile();
      },
      
      verifySecurityAnswer: async (username, answer) => {
        try {
          const { data } = await supabase
            .from('game_users')
            .select('security_answer')
            .eq('username', username)
            .single();
          if (data) return data.security_answer.toLowerCase() === answer.toLowerCase();
        } catch (e) { console.warn("Supabase auth failed, falling back to local."); }
        
        // Fallback
        const { users } = get();
        const user = users.find(u => u.username === username);
        return user?.securityAnswer.toLowerCase() === answer.toLowerCase();
      },
      
      changePassword: async (username, newPasswordHash) => {
        try {
          await supabase
            .from('game_users')
            .update({ password_hash: newPasswordHash })
            .eq('username', username);
        } catch (e) { console.warn("Supabase auth failed, falling back to local."); }

        // Fallback
        set((state) => ({
          users: state.users.map(u => 
            u.username === username ? { ...u, passwordHash: newPasswordHash } : u
          )
        }));
      }
    }),
    {
      name: 'wizarding-academy-auth',
    }
  )
);
