# Codebase Audit Report

## 1. Bugs & Errors

### 1.1. Chapter Progression Math Bug (`playerStore.ts`)
**Issue:** The formula for advancing the player's chapter upon completing a lesson is incorrect:
```typescript
currentChapter: Math.floor(state.currentLesson / 6) + 1
```
When a user completes Lesson 5, `currentLesson` becomes 6. The formula calculates `Math.floor(6 / 6) + 1 = 2`, meaning the player is prematurely moved to Chapter 2 before they even fight the Chapter 1 Boss (Lesson 6).
**Fix:** The logic should be adjusted to:
```typescript
currentChapter: Math.floor((state.currentLesson) / 6) + 1
```
Wait, if `currentLesson` is the *next* lesson they are about to play, when they finish 5, it becomes 6. We want 6 to still be Chapter 1.
So: `Math.floor((state.currentLesson - 1) / 6) + 1`.
When next is 6: `(6 - 1) / 6 = 0 + 1 = 1`.
When next is 7: `(7 - 1) / 6 = 1 + 1 = 2`.

### 1.2. Stale Closure / Missing React Hook Dependencies (`LessonView.tsx`)
**Issue:** The `eslint` linter correctly identifies that the `useEffect` responsible for prefetching lessons is missing `prefetchedLesson` and `setPrefetchedLesson` from its dependency array. Because `useEffect` captures variables via closures, it can sometimes access a stale version of `prefetchedLesson`.
**Fix:** Refactor the prefetching logic to use a `useRef` to track active prefetches to prevent infinite loops when adding it to the dependency array.

### 1.3. Unused Error Variable (`pythonRunner.ts`)
**Issue:** The Pyodide try/catch block silently catches an error when attempting to fetch `sys.stdout` after a crash. `catch(e) {}` leaves `e` unused, which triggers linting warnings.
**Fix:** Replace `catch(e)` with `catch(_)` or explicitly handle the logging fallback.

---

## 2. Architecture Improvements

### 2.1. Centralized Database (Supabase)
Currently, the application relies entirely on Zustand's `persist` middleware, which saves all player progression (XP, levels, unlocked spells, and completed lessons) strictly to the browser's `localStorage`.
**Why this is an issue:** If a user logs out and logs in on their phone, they will have 0 XP and be back at Lesson 1.
**Recommendation:** 
Since `SUPABASE_URL` is already in the `.env` file, we should integrate the `@supabase/supabase-js` client. We can build a `syncWithCloud()` function in the `playerStore` that automatically pushes the Zustand state to a PostgreSQL `profiles` table every time a lesson is completed.

### 2.2. Robust AI JSON Parsing
Currently, we assume the AI will always return perfectly formatted JSON because of the `response_format` flag. However, network blips or edge cases can result in truncated responses.
**Recommendation:** Implement `zod` for strict runtime schema validation before updating the UI, so the app gracefully retries the API instead of crashing.

### 2.3. Dynamic Curriculum Mapping
Right now, `DYNAMIC_PLAN` in `aiTutor.ts` maps directly via an array index. If the AI hallucinates or the user needs extra help, the array index logic breaks down.
**Recommendation:** Switch to a graph-based progression model or prompt the AI with the user's *actual code history* to generate hyper-personalized remediation lessons rather than moving strictly forward on a rail.
