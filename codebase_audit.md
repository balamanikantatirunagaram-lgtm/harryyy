# Codebase Audit Report

After scanning the codebase, I've identified several bugs, security vulnerabilities, and logic issues.

## 1. Security Vulnerabilities

### 1.1 Insecure Row Level Security (RLS) (`supabase_schema.sql`)
**Issue:** The RLS policy for updating user profiles is completely open:
```sql
CREATE POLICY "Allow update to game_users" ON public.game_users FOR UPDATE USING (true) WITH CHECK (true);
```
**Impact:** Any user can update any other player's profile data (level, XP, house points, saved code) just by knowing their username.
**Fix:** Restrict updates so users can only modify their own data. If Supabase Auth isn't being used, this requires a custom mechanism, but leaving it `true` for production is highly dangerous.

### 1.2 Plain-text Passwords (`src/store/authStore.ts` & `supabase_schema.sql`)
**Issue:** The application saves user passwords in plain text directly to the `password_hash` column.
**Impact:** Anyone with database read access can see all user passwords.
**Fix:** Implement password hashing on the client/server before storing, or switch to Supabase's native authentication system (`supabase.auth`).

---

## 2. Logic Bugs & Errors

### 2.1 Unhandled Supabase API Errors (`src/store/authStore.ts` & `src/store/playerStore.ts`)
**Issue:** The Supabase JavaScript client does not throw exceptions when database operations fail (e.g., constraints violated, RLS blocked). It returns `{ data, error }`. The current `try/catch` blocks only catch network errors.
**Impact:** The application silently ignores database failures. The `catch (e)` blocks also trigger ESLint warnings because the error variable is never used.
**Fix:** Explicitly check the `error` object inside the `try` block:
```typescript
const { error, data } = await supabase.from('...').insert(...);
if (error) {
  console.error(error.message);
  return false;
}
```

### 2.2 Naive Quest Verification (`src/pages/LessonView.tsx`)
**Issue:** The lesson completion check relies purely on matching a substring in the terminal output:
```typescript
if (!result.error && result.output.includes(lessonData.expectedOutputSnippet))
```
**Impact:** A player can easily cheat or bypass the intended logic of a quest (like writing a `for` loop) by simply printing the expected output directly (e.g., `print("Found it!")`).
**Fix:** Validate the structure of the student's code using Abstract Syntax Tree (AST) parsing, or execute specific assertions in Python alongside their code.

### 2.3 Stale React Hook Dependencies (`src/pages/LessonView.tsx`)
**Issue:** ESLint reports that `savedCode` is missing from the dependency array of the `useEffect` that fetches lessons (Line 53).
**Impact:** This can lead to stale closures where React uses an outdated version of `savedCode` when fetching the initial code.
**Fix:** Include `savedCode` in the dependency array, or use a `useRef` to store the latest value without triggering re-renders.

---

## 3. Architecture & Performance Issues

### 3.1 Abandoned AI Integration (`src/services/aiTutor.ts`)
**Issue:** The `brain.ts` script runs asynchronously to generate lessons and push them to Supabase, but the frontend has hardcoded the curriculum locally (`src/data/curriculum.ts`). The `generateLesson` function bypasses the database entirely.
**Impact:** Dead code and wasted API calls. The `brain.ts` script is essentially disconnected from the actual gameplay loop.

### 3.2 Large Vite Build Chunks
**Issue:** Running `npm run build` throws a warning: `Some chunks are larger than 500 kB after minification.`
**Impact:** Initial page load times will be slow for users on slower connections because the entire application bundle is loaded at once.
**Fix:** Configure Rollup to split chunks in `vite.config.ts`, and dynamically import large libraries like `@monaco-editor/react` or `pyodide`.

### 3.3 Unused Imports (`scripts/brain.ts`)
**Issue:** The `fs` module is imported but never used.
**Fix:** Remove `import * as fs from 'fs';` to keep the code clean.
