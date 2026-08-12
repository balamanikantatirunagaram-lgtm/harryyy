import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { runPythonCode, initPyodide } from '../services/pythonRunner';
import { usePlayerStore } from '../store/playerStore';
import { generateLesson, type GeneratedLesson } from '../services/aiTutor';
import { Play, RotateCcw, ShieldAlert, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LessonView: React.FC = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [lessonData, setLessonData] = useState<GeneratedLesson | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const { level, currentChapter, currentLesson, previousTopics, prefetchedLesson, addXP, completeLesson, setPrefetchedLesson } = usePlayerStore();

  useEffect(() => {
    initPyodide().then(() => setIsPyodideReady(true));
  }, []);

  useEffect(() => {
    const fetchLesson = async () => {
      // Reset view state for new lesson
      setOutput('');
      setError(null);
      setIsSuccess(false);

      // 1. If we already have the lesson prefetched for this chapter/state, use it!
      if (prefetchedLesson && prefetchedLesson.chapterNumber === currentChapter && previousTopics.length > 0 && previousTopics[previousTopics.length - 1] !== prefetchedLesson.title) {
        // Wait, prefetch condition is tricky. It's better to just trust it if it exists.
        setLessonData(prefetchedLesson);
        setCode(prefetchedLesson.starterCode || '# Write your incantation here\n');
        setIsGenerating(false);
        
        // 2. Immediately start prefetching the NEXT lesson in the background
        const nextTopics = [...previousTopics, prefetchedLesson.title];
        try {
          const nextLesson = await generateLesson(level, currentChapter, nextTopics, currentLesson + 1);
          setPrefetchedLesson(nextLesson);
        } catch (e) {
          console.warn("Background prefetch failed:", e);
        }
        return;
      }

      // 3. Otherwise, we have to generate it now (blocking the user)
      setIsGenerating(true);
      try {
        const data = await generateLesson(level, currentChapter, previousTopics, currentLesson);
        setLessonData(data);
        setCode(data.starterCode || '# Write your incantation here\n');
        
        // 4. Start prefetching the NEXT lesson in the background
        const nextTopics = [...previousTopics, data.title];
        generateLesson(level, currentChapter, nextTopics, currentLesson + 1)
          .then(nextLesson => setPrefetchedLesson(nextLesson))
          .catch(e => console.warn("Background prefetch failed:", e));

      } catch (err) {
        console.error(err);
        // Fallback or handle error
      } finally {
        setIsGenerating(false);
      }
    };
    
    // Only run if we don't have active lessonData yet or if we just moved to a new lesson
    fetchLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, currentChapter, currentLesson, previousTopics]);

  const handleCastSpell = async () => {
    if (!isPyodideReady || !lessonData) return;
    setIsRunning(true);
    setOutput('');
    setError(null);
    setIsSuccess(false);

    const result = await runPythonCode(code);
    setOutput(result.output);
    setError(result.error);
    setIsRunning(false);

    if (!result.error && result.output.includes(lessonData.expectedOutputSnippet)) {
      setIsSuccess(true);
      addXP(lessonData.xpReward);
    }
  };

  const handleNextLesson = () => {
    if (lessonData) {
      completeLesson(lessonData.title);
      setIsSuccess(false);
      setOutput('');
      setCode('');
    }
  };

  if (isGenerating) {
    return (
      <div className="flex h-full items-center justify-center bg-midnight text-parchment flex-col space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-gold" />
        <h2 className="text-2xl font-fantasy tracking-widest text-gold-light">The Arcane Tutor is scribing your next lesson...</h2>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="flex h-full items-center justify-center bg-midnight text-red-400">
        <ShieldAlert className="w-8 h-8 mr-4" />
        <p>Failed to generate lesson. Please check your API key and connection.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Narrative Panel */}
      <div className="w-1/3 p-8 overflow-y-auto panel-parchment border-r border-gold-dark/30">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-fantasy text-burgundy-dark">Chapter {lessonData.chapterNumber}</h2>
            <button 
              onClick={() => setIsSuccess(true)}
              className="text-xs text-gold-dark/50 hover:text-gold-dark px-2 py-1 border border-gold-dark/20 rounded cursor-pointer transition-colors"
              title="Force Complete (Dev Tool)"
            >
              Skip
            </button>
          </div>
          {lessonData.isBoss && (
            <span className="bg-red-900 text-red-200 text-xs px-2 py-1 rounded uppercase tracking-widest border border-red-500">Boss Battle</span>
          )}
        </div>
        <h3 className="text-xl font-fantasy text-midnight mb-6 border-b border-gold-dark/30 pb-2">{lessonData.title}</h3>
        
        <div className="font-sans text-midnight-dark space-y-4 mb-8 leading-relaxed whitespace-pre-wrap">
          {lessonData.story}
        </div>

        <div className="bg-midnight-light/10 p-4 rounded border-l-4 border-gold-dark mb-8">
          <h4 className="font-bold text-burgundy-dark mb-2">Instruction</h4>
          <p className="text-sm leading-relaxed">{lessonData.instruction}</p>
        </div>

        <div className="bg-midnight-dark text-parchment-light p-4 rounded border border-gold-dark/50 mb-8 shadow-inner">
          <h4 className="font-bold text-gold mb-2 uppercase tracking-widest text-xs">Current Quest</h4>
          <p className="text-sm mb-3">{lessonData.questDescription}</p>
          
          {(lessonData.exampleInput || lessonData.exampleOutput) && (
            <div className="bg-black/50 p-3 rounded text-xs font-mono space-y-2 mt-4 border border-parchment/10">
              {lessonData.exampleInput && lessonData.exampleInput !== "None" && (
                <div>
                  <span className="text-gold-dark">Input: </span>
                  <span className="text-parchment/70">{lessonData.exampleInput}</span>
                </div>
              )}
              {lessonData.exampleOutput && (
                <div>
                  <span className="text-gold-dark">Expected Output: </span>
                  <span className="text-emerald-400">{lessonData.exampleOutput}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Code Editor Panel */}
      <div className="w-2/3 flex flex-col bg-midnight">
        <div className="p-4 border-b border-parchment/10 text-parchment flex justify-between items-center bg-midnight-dark">
          <span className="font-mono text-sm text-gold-dark">spellbook.py</span>
          <div className="flex space-x-4">
            <button 
              className="btn-secondary flex items-center space-x-2"
              onClick={() => setCode(lessonData.starterCode || '')}
            >
              <RotateCcw size={14} /> <span>Reset</span>
            </button>
            <button 
              className={`btn-primary flex items-center space-x-2 ${(!isPyodideReady || isSuccess) ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleCastSpell}
              disabled={!isPyodideReady || isRunning || isSuccess}
            >
              <Play size={14} /> 
              <span>{isRunning ? 'Casting...' : (isPyodideReady ? 'Cast Spell' : 'Gathering Magic...')}</span>
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{ 
              minimap: { enabled: false }, 
              fontSize: 16, 
              fontFamily: 'Fira Code',
              padding: { top: 20 },
              scrollBeyondLastLine: false,
              renderLineHighlight: 'none',
              readOnly: isSuccess
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="h-64 border-t border-parchment/10 bg-black p-4 font-mono text-sm overflow-y-auto flex flex-col relative">
          <div className="text-parchment/50 mb-2 border-b border-parchment/10 pb-1 uppercase text-xs tracking-widest">
            Arcane Terminal
          </div>
          <div className="flex-1">
            {output && <div className="text-green-400 whitespace-pre-wrap">{output}</div>}
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400 mt-2 p-3 bg-red-900/20 border border-red-900/50 rounded flex items-start space-x-3"
              >
                <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="whitespace-pre-wrap">{error}</div>
              </motion.div>
            )}
            {!output && !error && (
              <div className="text-parchment/30 italic">Awaiting incantation...</div>
            )}
          </div>
          
          {isSuccess && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 p-4 bg-emerald-900/30 border border-emerald-600/50 rounded text-emerald-400 flex justify-between items-center"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6" />
                <div>
                  <div className="font-bold text-emerald-300">Spell successful!</div>
                  <div className="text-xs opacity-80">+{lessonData.xpReward} XP Earned</div>
                </div>
              </div>
              <button onClick={handleNextLesson} className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded font-bold flex items-center space-x-2 transition-colors">
                <span>Next Lesson</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonView;
