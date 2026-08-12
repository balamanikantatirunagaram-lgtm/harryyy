import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Loader2 } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { callAI } from '../lib/ai';

type Message = { role: 'user' | 'assistant', content: string };

export const HedwigChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hoot! I am Hedwig. How can I assist you with your magical coding journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { level, xp, currentChapter, currentLesson } = usePlayerStore();

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const systemPrompt = `You are Hedwig, the highly intelligent and helpful snowy owl chatbot for the Arcane Academy of Code.
You are helping the student on the website. You have full context about them:
- They are a Level ${level} Wizard.
- They have ${xp} XP.
- They are currently on Chapter ${currentChapter}, Lesson ${currentLesson}.

Be helpful, friendly, and speak with slight owl-like characteristics (e.g. occasional 'Hoot', mention feathers/flying, magical context).
Keep answers concise but informative. You can help with Python coding questions, navigating the site, or general encouragement.`;

    const apiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages,
      userMessage
    ];

    try {
      const responseContent = await callAI(apiMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Hoot... something went wrong. I couldn't reach the magical network." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-indigo-900 border-2 border-indigo-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <span className="text-3xl drop-shadow-md -mt-1" role="img" aria-label="owl">🦉</span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 md:w-96 bg-[#0a0a0c] border border-indigo-900/50 shadow-2xl rounded-xl z-50 overflow-hidden flex flex-col font-sans"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-indigo-950/80 border-b border-indigo-900 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="text-2xl" role="img" aria-label="owl">🦉</span>
                <div>
                  <h3 className="font-bold text-indigo-200">Hedwig</h3>
                  <p className="text-xs text-indigo-400">Arcane Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-indigo-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0a0a0c] to-indigo-950/20">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-indigo-800 text-indigo-100 rounded-br-none' 
                        : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-3 rounded-bl-none border border-gray-700 flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                    <span className="text-xs text-gray-400">Hedwig is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-gray-900 border-t border-gray-800 flex items-center space-x-2">
              <input 
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask Hedwig a question..."
                className="flex-1 bg-gray-950 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-indigo-700 hover:bg-indigo-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-md transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
