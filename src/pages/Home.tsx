import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../store/playerStore';
import { motion, AnimatePresence } from 'framer-motion';

const Home: React.FC = () => {
  const { name, setName } = usePlayerStore();
  const navigate = useNavigate();
  const [inputName, setInputName] = useState(name);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setName(inputName.trim());
      navigate('/academy');
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8">
      <AnimatePresence>
        {!name && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full panel-parchment p-12 rounded-lg text-center"
          >
            <h1 className="text-4xl font-fantasy text-burgundy-dark mb-6">The Enchanted Letter</h1>
            <div className="font-sans text-lg text-midnight-light space-y-4 mb-10 leading-relaxed italic border-y border-gold-dark/30 py-6">
              <p>We are pleased to inform you that you have been accepted at the Arcane Academy of Code.</p>
              <p>Please provide your signature below to accept this invitation.</p>
            </div>
            
            <form onSubmit={handleStart} className="flex flex-col items-center space-y-6">
              <input 
                type="text" 
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Sign your name..."
                className="bg-transparent border-b-2 border-gold-dark text-xl text-center text-midnight font-fantasy outline-none focus:border-burgundy transition-colors w-64 pb-2"
                required
              />
              <button type="submit" className="btn-primary mt-4">
                Enter the Academy
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
