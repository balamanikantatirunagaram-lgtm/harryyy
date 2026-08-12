import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePlayerStore } from '../store/playerStore';
import { motion, AnimatePresence } from 'framer-motion';

type AuthMode = 'login' | 'signup' | 'reset';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  
  // Reset password states
  const [resetStep, setResetStep] = useState<1 | 2>(1);
  const [newPassword, setNewPassword] = useState('');

  const { login, register, verifySecurityAnswer, changePassword } = useAuthStore();
  const { setName } = usePlayerStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (success) {
      setName(username);
      navigate('/');
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (username.length < 3 || password.length < 3 || nickname.length < 1) {
      setError('Please fill out all fields.');
      return;
    }
    
    const success = await register(username, password, nickname);
    if (success) {
      setName(username);
      navigate('/');
    } else {
      setError('Username already exists.');
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (resetStep === 1) {
      const isValid = await verifySecurityAnswer(username, nickname);
      if (isValid) {
        setResetStep(2);
      } else {
        setError('Incorrect nickname for this username.');
      }
    } else {
      if (newPassword.length < 3) {
        setError('Password must be at least 3 characters.');
        return;
      }
      await changePassword(username, newPassword);
      setMode('login');
      setResetStep(1);
      setPassword('');
      setNewPassword('');
      setError('');
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setResetStep(1);
    setPassword('');
    setNickname('');
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center p-8 bg-midnight bg-midnight-texture">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full panel-parchment p-8 rounded-lg relative overflow-hidden"
      >
        <h2 className="text-3xl font-fantasy text-burgundy-dark mb-6 text-center">
          {mode === 'login' && 'Enter the Academy'}
          {mode === 'signup' && 'Enrollment'}
          {mode === 'reset' && 'Recover Magic'}
        </h2>

        {error && (
          <div className="bg-red-900/10 border border-red-900 text-red-800 p-2 rounded text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {mode === 'login' && (
            <motion.form 
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleLogin} 
              className="flex flex-col space-y-4"
            >
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="bg-parchment-light border border-gold-dark/30 p-2 rounded font-sans text-midnight outline-none focus:border-burgundy"
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-parchment-light border border-gold-dark/30 p-2 rounded font-sans text-midnight outline-none focus:border-burgundy"
                required
              />
              <button type="submit" className="btn-primary mt-2">Login</button>
              
              <div className="flex justify-between text-sm text-midnight-light mt-4 pt-4 border-t border-gold-dark/20">
                <button type="button" onClick={() => switchMode('signup')} className="hover:text-burgundy transition-colors">New student? Enroll here.</button>
                <button type="button" onClick={() => switchMode('reset')} className="hover:text-burgundy transition-colors">Forgot spell (password)?</button>
              </div>
            </motion.form>
          )}

          {mode === 'signup' && (
            <motion.form 
              key="signup"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSignup} 
              className="flex flex-col space-y-4"
            >
              <input 
                type="text" 
                placeholder="Choose a Username" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="bg-parchment-light border border-gold-dark/30 p-2 rounded font-sans text-midnight outline-none focus:border-burgundy"
                required
              />
              <input 
                type="password" 
                placeholder="Choose a Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-parchment-light border border-gold-dark/30 p-2 rounded font-sans text-midnight outline-none focus:border-burgundy"
                required
              />
              <div className="pt-2">
                <label className="text-xs font-bold text-burgundy-dark uppercase tracking-wider mb-1 block">Security Question</label>
                <input 
                  type="text" 
                  placeholder="What is your nickname?" 
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  className="bg-parchment-light border border-gold-dark/30 p-2 rounded font-sans text-midnight outline-none focus:border-burgundy w-full"
                  required
                />
              </div>
              <button type="submit" className="btn-primary mt-2">Sign Up</button>
              
              <div className="text-center text-sm text-midnight-light mt-4 pt-4 border-t border-gold-dark/20">
                <button type="button" onClick={() => switchMode('login')} className="hover:text-burgundy transition-colors">Already enrolled? Login.</button>
              </div>
            </motion.form>
          )}

          {mode === 'reset' && (
            <motion.form 
              key="reset"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleReset} 
              className="flex flex-col space-y-4"
            >
              {resetStep === 1 ? (
                <>
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="bg-parchment-light border border-gold-dark/30 p-2 rounded font-sans text-midnight outline-none focus:border-burgundy"
                    required
                  />
                  <div className="pt-2">
                    <label className="text-xs font-bold text-burgundy-dark uppercase tracking-wider mb-1 block">Security Question</label>
                    <input 
                      type="text" 
                      placeholder="What is your nickname?" 
                      value={nickname}
                      onChange={e => setNickname(e.target.value)}
                      className="bg-parchment-light border border-gold-dark/30 p-2 rounded font-sans text-midnight outline-none focus:border-burgundy w-full"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary mt-2">Verify</button>
                </>
              ) : (
                <>
                  <p className="text-sm text-emerald-800 text-center font-bold">Identity verified!</p>
                  <input 
                    type="password" 
                    placeholder="Enter new password" 
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="bg-parchment-light border border-gold-dark/30 p-2 rounded font-sans text-midnight outline-none focus:border-burgundy"
                    required
                  />
                  <button type="submit" className="btn-primary mt-2">Change Password</button>
                </>
              )}
              
              <div className="text-center text-sm text-midnight-light mt-4 pt-4 border-t border-gold-dark/20">
                <button type="button" onClick={() => switchMode('login')} className="hover:text-burgundy transition-colors">Back to Login</button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Auth;
