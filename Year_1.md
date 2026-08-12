# YEAR 1 — WIZARDING PYTHON ACADEMY
## Complete Educational RPG Design Document

*Prototype design using a wizard-school setting as placeholder IP. See Section R for the commercial conversion plan.*

---

## SECTION A — YEAR 1 VISION

The player is not "taking a Python course." They are a first-year student at a magical academy who discovers, almost by accident, that the school's oldest magic **is** code — that spells are precise, testable, debuggable instructions, and that every professor, ghost, and creature in the castle needs someone who can write correct incantations to keep the world running.

Three design commitments hold this together:

1. **Story causes learning, learning causes story.** No lesson exists because "it's next in the syllabus." Every concept is unlocked because something in the plot is broken, locked, hidden, or dangerous, and Python is the only tool that opens it.
2. **The code is always real.** Magic is vocabulary and visual skin. Underneath, every challenge compiles and runs as genuine Python 3. A player who finishes Year 1 can open a plain `.py` file with no magic theme and still write working code.
3. **Difficulty is a curve, not a cliff.** Every new concept appears first in the safest possible form (guided, low-stakes, reversible) and only later appears inside a boss fight, exam, or debugging crisis.

The emotional arc the platform is built to produce: **Curiosity → Discovery → Confusion → Practice → Failure → Understanding → Mastery → Confidence → Achievement.** Every system below (hints, pacing, rewards, house points) is tuned to protect that arc — especially to make "Failure" feel like data, not shame.

---

## SECTION B — YEAR 1 STORY ARC

**Beginning — The Enchanted Letter.** The player receives a message that shouldn't be able to exist — its words rearrange themselves. On arrival at the academy, they learn the school runs on an ancient logical language: written correctly, it obeys; written carelessly, it misfires. The Sorting Ceremony doesn't just assign a house — it runs the player's very first program.

**Rising conflict — Small breakages, growing pattern.** Term 1's problems look isolated: a stuck door, a mislabeled potion, a clock stuck repeating an hour. As the player learns variables, operators, and conditionals to fix them, a groundskeeper character notices these "coincidences" aren't random — something is quietly corrupting the castle's oldest scripts.

**Major discoveries — The castle has been running on code for centuries.** In Term 2, the player learns loops and data structures to manage larger systems (the Great Hall's headcount, the creature registry, the library catalogue) and discovers a **partial, corrupted logbook** — evidence that a former student, generations ago, tried to hide something inside the school's spellwork and never finished the job.

**Midpoint — The Enchanted Library Crisis (boss).** The library's cataloguing enchantment collapses under the weight of the corruption. The player must use dictionaries under pressure to stop the collapse. This is the first time failure has a visible, dramatic cost (books scattering, records lost) — and the first time the player *fully* recovers from failure, proving the game's safety net works.

**Escalation — The Forbidden Forest.** Term 3 opens with functions (letting the player finally write *reusable* magic instead of one-off fixes) and then error-handling, because the closer the player gets to the source of the corruption, the more of its broken, malicious code they must read, diagnose, and neutralize without accidentally spreading it. The Forbidden Forest Guardian boss requires combining loops, data structures, and functions the player has been building all year.

**Final conflict — The Final Castle Defense.** The corrupted logbook turns out to be an old, well-intentioned but reckless attempt to automate the castle's protections — a program with a bug so old it became a legend. The final boss is not "defeat a villain" but "find and fix the bug" — reframing the entire climax as a debugging challenge, which is the thesis of the whole year.

**Resolution — Graduation.** The player is asked to build the **Magical Academy Management System**, folding the fixed logbook's surviving ideas into something stable, readable, and theirs. The last scene is the player's own working program being adopted by the school itself.

**Graduation.** A Founder's Feast where each house is recognized not by who scored highest, but by what obstacles they overcame — reinforcing the non-punitive house philosophy in Section E.

---

## SECTION C — WORLD MAP

| Location | Educational Purpose | Typical Activities |
|---|---|---|
| Great Hall | Onboarding, ceremonies, house standings | Sorting Ceremony (first program), daily headcount challenges (loops) |
| Owlery & Archives | Files, modules, imports | Reading/writing "letters" (files), importing "spellbooks" (modules) |
| The Library (incl. Restricted Section) | Dictionaries, search/lookup logic | Enchanted Library Crisis boss, catalogue challenges |
| Potions Laboratory | Arithmetic, ratios, conditionals | Potion Brewing challenges, ingredient calculators |
| Charms Classroom | Variables, strings, functions | Spell-message generator, function-writing labs |
| Dueling Arena | Timed problem solving, review | Wizard Duel challenge type, weekly practice arena |
| Courtyard & Greenhouses | Lists, iteration over collections | Creature/plant tracking challenges |
| Clocktower | While loops, infinite-loop concepts | Time-Turner malfunction arc, Infinite Loop boss |
| House Common Rooms | Social/reward hub, no new mechanics | House leaderboard, cosmetics, side-quest board |
| Forbidden Forest | Data structures + error handling combined | Forbidden Forest Guardian boss, debugging investigations |
| Headmaster's Tower | Story checkpoints, exam access | Mid-Year and Final Examinations |
| Vaults (beneath the castle) | Tuples, sets, immutability concepts | Gringotts-style puzzle challenges |
| The Corrupted Wing (unlocks late Term 3) | Capstone integration | Final Castle Defense boss, Final Project build site |

---

## SECTION D — CHARACTER BIBLE

| Character | Role | Personality | Relationship to Player | Teaching Purpose | Python Topics |
|---|---|---|---|---|---|
| **Headmistress Ravensworth** | Headmaster figure | Warm but exacting; speaks in precise, almost syntactic sentences | Distant authority who becomes a mentor by Term 3 | Frames the "why" of each Term; delivers exam ceremonies | Big-picture framing, exam gatekeeping |
| **Professor Thistlewood** | Strict professor (Potions) | Blunt, impatient with sloppiness, secretly proud of persistence | Pushes player hardest; grudging respect grows | Teaches precision — exact syntax, exact values | Variables, types, arithmetic, conditionals |
| **Mira Alderglass** | Friendly mentor (senior student, library aide) | Patient, curious, explains by asking questions rather than lecturing | Player's go-to for "I'm stuck" moments outside formal hints | Models good debugging habits and growth mindset | Debugging, dictionaries, functions |
| **Corvin Ashe** | Brilliant classmate / friendly rival | Competitive but not cruel; wants the player to keep up, not fail | Rival in duels, ally in crises | Demonstrates advanced approaches to same problems (interleaving) | Loops, data structures, wizard duels |
| **Groundskeeper Hollis** | Groundskeeper | Gruff, observant, first to notice "the coincidences" | Early plot guide; comic relief | Introduces real-world/physical framing for abstract concepts | Loops (tending grounds on schedules), files (logbooks) |
| **Madame Quill** | Librarian | Meticulous, protective of the archive, secretly worried about the corruption | Grants access to Library systems | Ties dictionaries/search to "trustworthy records" | Dictionaries, modules, imports |
| **The Unnamed Author** (antagonist, revealed late) | Author of the corrupted logbook — a former student, not a villain in the cartoon sense | Well-intentioned, reckless, isolated; wrote powerful code with no one to review it | Never met directly; known only through broken code and journal fragments | Embodies "what happens without error handling and review" | Error handling, code review as a value |

Dialogue style guidance: characters speak in original voice (no reproduced published dialogue). Thistlewood is clipped and precise ("Say what you mean. The vault does not guess."). Mira asks Socratic questions ("What did Python actually do, versus what did you expect it to do?"). Corvin is quippy and competitive but always sporting.

---

## SECTION E — HOUSE SYSTEM

Four houses, each representing a *learning disposition* rather than a fixed personality type, so any player can see themselves in any house.

| House | Core Value | Colors | Mascot | Common Room Location | How Points Are Earned |
|---|---|---|---|---|---|
| **Emberwing** | Courage — attempting hard problems | Crimson & gold | Phoenix-hawk | High tower, warm firelight | Attempting boss fights and hard-difficulty challenges, even on failure |
| **Deepcurrent** | Wisdom — understanding *why* | Sapphire & silver | River-serpent | Beneath the Library | Explaining a concept correctly, using hints sparingly, acing predict-the-output questions |
| **Ironroot** | Diligence — consistency | Forest green & bronze | Great stag | Greenhouse-adjacent burrow | Daily streaks, completing side quests, finishing remediation practice |
| **Wrenlight** | Kindness — collaboration | Amber & violet | Silver fox | Airy loft above Great Hall | Helping other students' code (peer-review-style side quests), constructive bug reports |

**Design rule (per Section 14):** points can *never only* be earned by being first or fastest. Every house's core mechanic rewards a behavior a slower or more anxious learner can still perform every day (showing up, trying, explaining, helping). A leaderboard exists but is framed around **weekly house totals**, not individual rank, so no single player is ever publicly "worst."

---

## SECTION F — COMPLETE CURRICULUM

### F.1 — Pacing rationale

Fourteen chapters across three terms, 65 lesson-equivalents (lessons + boss battles + exams), each lesson designed for 20–40 minutes. This sits inside the requested 12–16 chapter / 50–80 lesson range because:

- **Term 1 (5 chapters, 22 lessons)** covers the absolute foundation (print → variables → operators → conditionals) in the smallest possible steps, since this is where beginners most often quit. Lessons here are shorter and denser in guided practice.
- **Term 2 (5 chapters, 24 lessons)** covers loops and every core data structure — the largest conceptual load of the year — so it gets the most lessons and the midpoint boss/exam to consolidate learning before it compounds.
- **Term 3 (4 chapters, 19 lessons)** covers functions, error handling, files/modules, and the capstone. Fewer *new* concepts, but each lesson is longer because it integrates everything before it — matching the "interleaving" principle in Section N.

### F.2 — Full Chapter Map

| Ch | Story Event | Python Concept(s) | Quest | Signature Challenge | Reward | Difficulty |
|---|---|---|---|---|---|---|
| 1 | The Enchanted Letter | print(), comments | Read and answer the invitation | Spell-message generator | XP, Lumos (Basics) unlocked | 1 |
| 2 | Crossing the Threshold | Dev environment, reading errors | Set up your wand (editor) | First error scavenger hunt | XP, editor customization | 1 |
| 3 | The Sorting Ceremony | Variables, strings, numbers, booleans, type(), input() | Answer the Sorting Hat's questions | Build your character sheet | XP, House assignment, Coins | 2 |
| 4 | The Language of Spells | Operators (arithmetic, comparison, logical) | Balance the Potion Ratio | Potion Ratio Calculator | XP, Alohomora unlocked | 2 |
| 5 | The Locked Doors | if / elif / else, nested conditionals | Open the Chamber Lock | Chamber Lock puzzle | XP, House Points, Coins | 3 |
| 6 | The Time-Turner's Curse | while, break, continue | Free the Clocktower | **BOSS: The Infinite Loop** | XP, Reparo (partial) | 3–4 |
| 7 | The Great Hall Census | for, range() | Count the Feast | Feast Counting Challenge | XP, Coins | 3 |
| 8 | The Vault of Lists | Lists, indexing, slicing, list methods | Organize the Trunk | Creature Tracking Challenge | XP, Accio (partial) | 3 |
| — | Mid-Year Examinations | Cumulative (Ch1–8) | — | Written + coding exam | Title: "First-Term Scholar" | 3 |
| 9 | Twin Vaults | Tuples, sets | Sort Gringotts' Vaults | Gringotts Puzzle | XP, Coins | 3 |
| 10 | The Restricted Section | Dictionaries, nested dicts | Repair the Catalogue | **BOSS: The Enchanted Library Crisis** | XP, Protego (partial) | 4 |
| 11 | The Chamber of Reusable Charms | Functions, parameters, return, scope | Compile the Spell Compendium | Spell Compendium Challenge | XP, Accio unlocked | 4 |
| 12 | The Forbidden Forest | Errors, try/except, debugging | Investigate the anomalies | **BOSS: The Forbidden Forest Guardian** | XP, Protego unlocked | 4–5 |
| 13 | The Owlery Archives | Files, import, standard library modules | Restore the Archive | Archive Restoration Challenge | XP, Coins, Titles | 4 |
| 14 | Graduation: The Final Trial | Full-year integration | Fix the Corrupted Logbook | **BOSS: Final Castle Defense** + Final Exam + Final Project | Expecto Patronum, Diploma, Legendary title | 5 |

### F.3 — Full Lesson Roster (all 65 entries, summary level)

*Every row below is a full lesson in the live product; each has the seven full fields from Section 9. To keep this document usable, ten representative lessons across the difficulty curve are expanded in full template (F.4) — every other lesson follows the identical template and can be expanded on request per chapter.*

| ID | Title | Chapter | Concept | Difficulty | XP |
|---|---|---|---|---|---|
| L1 | What Is Magic? | 1 | Programming as instructions | 1 | 10 |
| L2 | Your First Incantation | 1 | print() | 1 | 10 |
| L3 | Notes in the Margins | 1 | comments | 1 | 10 |
| L4 | The Invitation Puzzle | 1 | print + comments (mini-project) | 1 | 20 |
| L5 | The Wandshop | 2 | Editor/IDE basics | 1 | 10 |
| L6 | Reading the Omens | 2 | Reading simple errors | 2 | 15 |
| L7 | Vessels for Magic | 3 | Variables | 1 | 15 |
| L8 | Naming Your Familiar | 3 | Naming rules/conventions | 1 | 10 |
| L9 | Words of Power | 3 | Strings | 2 | 15 |
| L10 | Numbers of the Ancients | 3 | int / float | 2 | 15 |
| L11 | True or False Runes | 3 | booleans | 2 | 15 |
| L12 | The Sorting Hat's Question | 3 | type(), conversion, input() | 2 | 25 |
| L13 | Arithmetic Runes | 4 | + − * / // % ** | 2 | 15 |
| L14 | Weighing the Scales | 4 | comparison operators | 2 | 15 |
| L15 | The Threefold Choice | 4 | and / or / not | 3 | 20 |
| L16 | Combining Incantations | 4 | operator precedence | 3 | 20 |
| L17 | The Potion Ratio Challenge | 4 | operators (mini-project) | 3 | 30 |
| L18 | If the Door Answers | 5 | if | 2 | 15 |
| L19 | Or Else the Path Diverges | 5 | else | 2 | 15 |
| L20 | The Many Branching Halls | 5 | elif | 3 | 20 |
| L21 | Doors Within Doors | 5 | nested conditionals | 3 | 20 |
| L22 | The Chamber Lock Challenge | 5 | conditionals (mini-project) | 3 | 30 |
| L23 | The Loop Begins | 6 | while | 3 | 20 |
| L24 | Breaking the Curse | 6 | break | 3 | 20 |
| L25 | Skipping the Trap | 6 | continue | 3 | 20 |
| L26 | Infinite Loop Boss Prep | 6 | while review | 3 | 20 |
| L27 | **BOSS: The Infinite Loop** | 6 | while / break / continue | 4 | 60 |
| L28 | Marching in Order | 7 | for loops | 3 | 20 |
| L29 | Counting Spells | 7 | range() | 3 | 20 |
| L30 | Loop Within a Loop | 7 | nested for-loops (intro) | 3 | 25 |
| L31 | The Feast Counting Challenge | 7 | for/range (mini-project) | 3 | 30 |
| L32 | The Enchanted Trunk | 8 | lists (create/index) | 3 | 20 |
| L33 | Rearranging the Trunk | 8 | slicing, list methods | 3 | 25 |
| L34 | The Inventory Spell | 8 | looping over lists | 3 | 25 |
| L35 | Nested Trunks | 8 | lists of lists (intro) | 4 | 25 |
| L36 | The Creature Tracking Challenge | 8 | lists (mini-project) | 3 | 30 |
| L37 | **Mid-Year Examinations** | — | cumulative Ch1–8 | 3 | 80 |
| L38 | The Unchangeable Vault | 9 | tuples | 3 | 20 |
| L39 | The Vault of No Duplicates | 9 | sets | 3 | 20 |
| L40 | Choosing the Right Vault | 9 | list vs tuple vs set | 3 | 20 |
| L41 | The Gringotts Puzzle Challenge | 9 | tuples/sets (mini-project) | 3 | 30 |
| L42 | Keys and Their Secrets | 10 | dict basics | 3 | 20 |
| L43 | Looking Up the Grimoire | 10 | access/update dict | 3 | 20 |
| L44 | Looping Through the Catalogue | 10 | looping over dicts | 3 | 25 |
| L45 | Nested Grimoires | 10 | nested dicts (intro) | 4 | 25 |
| L46 | **BOSS: The Enchanted Library Crisis** | 10 | dictionaries | 4 | 60 |
| L47 | Casting Without Repetition | 11 | def, functions | 3 | 20 |
| L48 | Ingredients for a Spell | 11 | parameters/arguments | 3 | 20 |
| L49 | What the Spell Returns | 11 | return | 3 | 25 |
| L50 | The Boundaries of Magic | 11 | scope | 4 | 25 |
| L51 | Default Enchantments | 11 | default parameters | 3 | 20 |
| L52 | **BOSS: The Corrupted Spellbook** | 11 | functions (mini-boss) | 4 | 50 |
| L53 | Reading the Omens, Deeper | 12 | tracebacks | 3 | 20 |
| L54 | The Five Curses | 12 | error types | 3 | 25 |
| L55 | Try and Except | 12 | try/except | 4 | 25 |
| L56 | The Broken Potion Calculator | 12 | debugging (mini-project) | 4 | 30 |
| L57 | **BOSS: The Forbidden Forest Guardian** | 12 | errors + data structures + loops | 5 | 70 |
| L58 | The Investigator's Badge | 12 | debugging review | 4 | 25 |
| L59 | Sending a Letter | 13 | writing files | 3 | 20 |
| L60 | Receiving a Letter | 13 | reading files | 3 | 20 |
| L61 | The Great Library Catalogue | 13 | import, stdlib | 3 | 20 |
| L62 | Useful Modules of the Realm | 13 | random / datetime / math | 3 | 25 |
| L63 | The Archive Challenge | 13 | files + modules (mini-project) | 4 | 30 |
| L64 | **Final Examinations** | 14 | full-year cumulative | 4 | 100 |
| L65 | **Graduation Project: Academy Management System** | 14 | full-year integration | 5 | 200 |

### F.4 — Fully Expanded Representative Lessons

**L1 — What Is Magic? (Chapter 1, Difficulty 1)**
- *Story Context:* The player's letter rearranges its own words on the page before their eyes.
- *Learning Objective:* Understand that programming means giving a computer precise, ordered instructions, and that "magic" in this world is really code.
- *Python Concepts:* No syntax yet — conceptual grounding only.
- *Story Integration:* Establishes the entire year's metaphor before a single line of code is written, so every later lesson has a "why."
- *Teaching Explanation:* Compare a spell to a recipe: both are ordered steps that must be followed exactly, in order, or the result is wrong or nothing happens. No jargon yet.
- *Interactive Demonstration:* The letter "runs" step by step on screen, each word appearing as a line executes, showing cause → effect.
- *Guided Coding:* None — this lesson is narrative + a short "predict what happens next" interaction.
- *Independent Challenge:* Player reorders three scrambled "instruction cards" into the sequence that produces the intended letter.
- *Story Consequence:* The letter resolves into a proper invitation; the player is invited to the academy.
- *Rewards:* 10 XP, Lumos (Basics) partially unlocked.
- *Difficulty:* 1.

**L7 — Vessels for Magic (Chapter 3, Difficulty 1–2)**
- *Story Context:* The Sorting Hat needs somewhere to store the player's answers before it can decide.
- *Learning Objective:* Create and use variables to store values.
- *Python Concepts:* variable assignment (`=`), reassignment.
- *Story Integration:* Without a "vessel," the Hat's questions and the player's answers vanish instantly — variables are framed as literally what lets anything be remembered.
- *Teaching Explanation:* A variable is a labeled container. `name = "Bala"` puts a value in a box labeled `name`. Reassignment replaces the contents, doesn't create a new box.
- *Interactive Demonstration:* Visual boxes appear and their contents change live as code runs, e.g. `house_guess = "Emberwing"` then `house_guess = "Deepcurrent"`.
- *Guided Coding:* Player fills in a blank: `wand_wood = ____` then prints it.
- *Independent Challenge:* Store three answers (name, favorite subject, a number) in three variables and print all three without hard-coding the values into the print statements.
- *Story Consequence:* The Hat can now "remember" the player's answers to reason about them in L12.
- *Rewards:* 15 XP.
- *Difficulty:* 1–2.

**L15 — The Threefold Choice (Chapter 4, Difficulty 3)**
- *Story Context:* A door requires two conditions to be true at once ("holds a wand AND knows the password") to open.
- *Learning Objective:* Combine boolean expressions with `and`, `or`, `not`.
- *Python Concepts:* logical operators, short-circuit intuition (informal, not by name).
- *Story Integration:* Single comparisons (from L14) aren't enough for a door with compound rules — motivates combining conditions.
- *Teaching Explanation:* `and` requires both sides true; `or` requires at least one; `not` flips a boolean. Use a truth-table shown as "door logic," not abstract math first.
- *Interactive Demonstration:* Player toggles two switches (has_wand, knows_password) and watches the door open/stay shut live as the boolean expression is evaluated.
- *Guided Coding:* Complete `door_opens = has_wand ____ knows_password`.
- *Independent Challenge:* Write an expression for a door that opens if the player has a wand OR is accompanied by a professor, but never if it's after curfew.
- *Story Consequence:* Player proceeds into the corridor leading toward Chapter 5's locked doors arc.
- *Rewards:* 20 XP.
- *Difficulty:* 3.

**L23 — The Loop Begins (Chapter 6, Difficulty 3)**
- *Story Context:* The Clocktower is stuck repeating "5 o'clock" forever.
- *Learning Objective:* Write a `while` loop with a condition that changes over iterations.
- *Python Concepts:* while, loop condition, incrementing a counter.
- *Story Integration:* The clock's curse *is* a while loop whose condition never becomes false — the bug is shown as the lesson, not just described.
- *Teaching Explanation:* A `while` loop repeats as long as its condition is true; the player must change something inside the loop or it never stops — directly foreshadowing the infinite-loop danger.
- *Interactive Demonstration:* Broken code runs and visibly hangs (with a safe simulated stop), showing the clock stuck at "5" forever; fixed code shows the hour advancing.
- *Guided Coding:* Fix the missing `hour += 1` inside a given while loop.
- *Independent Challenge:* Write a while loop from scratch that counts down from 10 to 1 and then prints "Unlocked!"
- *Story Consequence:* The Clocktower's hour hand begins moving again for the first time in the story.
- *Rewards:* 20 XP.
- *Difficulty:* 3.

**L27 — BOSS: The Infinite Loop (Chapter 6, Difficulty 4)** — see full boss template in Section I.

**L34 — The Inventory Spell (Chapter 8, Difficulty 3)**
- *Story Context:* The Trunk's contents need to be checked and displayed one item at a time before an inspection.
- *Learning Objective:* Iterate over a list with a for loop and act on each element.
- *Python Concepts:* `for item in list`, combining loops with conditionals.
- *Story Integration:* Manually printing each index would be tedious and error-prone with a growing inventory — for-loops are motivated by scale.
- *Teaching Explanation:* `for item in trunk:` reads naturally as "for each thing in the trunk" — reinforce the plain-English mapping before the syntax.
- *Interactive Demonstration:* Trunk items highlight one at a time as the loop visits each.
- *Guided Coding:* Loop over a given list and print each item with a prefix ("Item: ...").
- *Independent Challenge:* Loop over the inventory and print only the items that are potions (combine with an `if`).
- *Story Consequence:* Inspection passes; a hidden note is found among the potions, seeding the Term 2 mystery.
- *Rewards:* 25 XP.
- *Difficulty:* 3.

**L42 — Keys and Their Secrets (Chapter 10, Difficulty 3)**
- *Story Context:* The Restricted Section's catalogue links book titles to their locations, but "location" isn't a list position — it's a name.
- *Learning Objective:* Create and access a dictionary by key.
- *Python Concepts:* dict creation `{}`, key/value access.
- *Story Integration:* A list of shelf numbers alone can't answer "where is *this specific book*?" — motivates key-based lookup over position-based lookup.
- *Teaching Explanation:* A dictionary is like a real card catalogue: you look things up by name (key), not by position.
- *Interactive Demonstration:* Typing a book title into a search box shows a dict lookup resolving to a shelf location instantly, versus a slow list scan shown side-by-side.
- *Guided Coding:* Create `catalogue = {"Advanced Potions": "Shelf 4B"}` and look up a value.
- *Independent Challenge:* Build a small catalogue of 4 books and write a lookup that handles a missing title gracefully (foreshadows L55's error handling).
- *Story Consequence:* Player earns provisional access to the Restricted Section.
- *Rewards:* 20 XP.
- *Difficulty:* 3.

**L47 — Casting Without Repetition (Chapter 11, Difficulty 3)**
- *Story Context:* The player has been rewriting near-identical spell code all year; Mira shows them a better way.
- *Learning Objective:* Define and call a function.
- *Python Concepts:* `def`, function call, indentation block.
- *Story Integration:* Directly references earlier lessons' repeated code (e.g., the potion ratio calculator from L17) as the motivating pain point — "you've basically already written a function five times without a name for it."
- *Teaching Explanation:* A function is a reusable spell you define once and cast (call) as many times as needed.
- *Interactive Demonstration:* Side-by-side: repeated inline code from Term 1 vs. the same logic wrapped in one function called three times.
- *Guided Coding:* Wrap given repeated print statements into a function `cast_greeting()`.
- *Independent Challenge:* Turn the Term 1 potion ratio code into a function that can be called with different ingredient amounts.
- *Story Consequence:* Unlocks the "Spell Compendium" — the player's personal library of reusable functions, used for the rest of the year.
- *Rewards:* 20 XP.
- *Difficulty:* 3.

**L55 — Try and Except (Chapter 12, Difficulty 4)**
- *Story Context:* Reading corrupted forest logs sometimes crashes the reading spell entirely instead of just showing a bad entry.
- *Learning Objective:* Catch and handle exceptions without crashing the program.
- *Python Concepts:* try/except, catching a specific exception type.
- *Story Integration:* Ties directly to L54's "Five Curses" — try/except is framed as "protective magic" against the errors just catalogued.
- *Teaching Explanation:* Wrapping risky code in `try:` lets the program respond gracefully instead of stopping dead; `except:` defines what to do when it fails.
- *Interactive Demonstration:* Same code runs twice on the same corrupted log entry — once crashing (no try/except), once recovering gracefully (with it).
- *Guided Coding:* Add a try/except around a given division that sometimes divides by zero.
- *Independent Challenge:* Write a log reader that keeps processing all entries even when individual entries are malformed, reporting which ones failed.
- *Story Consequence:* Player can now read the full corrupted logbook without it "fighting back," setting up Chapter 14's climax.
- *Rewards:* 25 XP.
- *Difficulty:* 4.

**L65 — Graduation Project (Chapter 14, Difficulty 5)** — see full spec in Section K.

*(Every other lesson in the F.3 table follows this exact seven-field template at matching depth in the live product; ask for any specific chapter's full lesson set to expand it.)*

---

## SECTION G — QUEST DATABASE

### Main Quests (one per chapter — 14 total)
1. Answer the Enchanted Letter (Ch1)
2. Prepare Your Wand and Workspace (Ch2)
3. Survive the Sorting Ceremony (Ch3)
4. Balance the Potion Ratio (Ch4)
5. Open the Chamber Lock (Ch5)
6. Free the Clocktower from the Time-Turner Curse (Ch6)
7. Take the Great Hall Census (Ch7)
8. Organize the Vault of Lists (Ch8)
9. Sort the Twin Vaults of Gringotts (Ch9)
10. Repair the Restricted Section Catalogue (Ch10)
11. Compile the Spell Compendium (Ch11)
12. Investigate the Forbidden Forest Anomalies (Ch12)
13. Restore the Owlery Archives (Ch13)
14. Fix the Corrupted Logbook and Defend the Castle (Ch14)

### Side Quests (optional, reinforce concepts — sample of 18)
| Side Quest | Reinforces | Type |
|---|---|---|
| Help Corvin Debug His Duel Script | Debugging, empathy | Peer-review |
| Decode the Groundskeeper's Shorthand Notes | Strings, string methods | Puzzle |
| Organize the Overflowing Returns Cart | Lists, sorting | Data-structure |
| Calculate a Week of Potion Ingredients | Arithmetic, loops | Calculation |
| Track the Migrating Thestral Herd | Lists, loops | Tracking |
| Build a Tiny Password Checker for the Common Room | Conditionals, strings | Mini-tool |
| Fix Mira's Overdue-Book Reminder Spell | Dictionaries, dates | Debugging |
| Write a Random Sorting-Hat Quiz Generator | Modules (random) | Mini-tool |
| Repair a First-Year's Broken "Hello World" | Syntax errors | Debugging |
| Build a Simple House-Points Tally Tool | Dictionaries, functions | Mini-tool |
| Translate a Muggle-Born Student's Notes into Spell-Speak | Strings, functions | Creative |
| Create a Study-Reminder Owl | Files, modules (datetime) | Mini-tool |
| Solve Professor Thistlewood's Ratio Riddle | Operators | Puzzle |
| Catalogue the Trophy Room | Dictionaries, lists | Data-structure |
| Patch a Leaky Cauldron Simulation | Error handling | Debugging |
| Write a Function Library for Common Spells | Functions | Refactor |
| Help the Librarian Deduplicate the Shelf List | Sets | Data-structure |
| Build a Simple Quiz Game for Younger Students | Full integration | Capstone-lite |

---

## SECTION H — CODING CHALLENGE DATABASE (by type)

| Type | Concepts | Example Problem | Hint System | Evaluation | Story Connection |
|---|---|---|---|---|---|
| Spell Casting | print, variables, functions | Write a function that prints a spell name and its power level | 5-level (Sec. L) | Output match + style check | Charms class |
| Potion Brewing | variables, arithmetic, conditionals | Given ingredient counts, compute ratio and print PASS/FAIL against a safe threshold | 5-level | Output match, edge cases (zero ingredients) | Potions Lab |
| Creature Tracking | lists, loops | Given a list of creature sightings, count how many of each type appear | 5-level | Output match, handles empty list | Courtyard/Forest |
| Enchanted Library | dictionaries | Given a catalogue dict, add/update/remove entries per instructions | 5-level | Final dict state match | Library |
| Time-Turner | while/for loops | Simulate a countdown clock with a stop condition | 5-level | Output sequence match, no infinite loop | Clocktower |
| Magical Communication | strings, functions | Build a function that formats a raw message into "proper spell-speak" | 5-level | String equality, format edge cases | Owlery |
| Castle Security | conditionals | Given access rules, decide if a student may enter a room | 5-level | Truth-table coverage | Corridors |
| Forbidden Forest | data structures + problem solving | Combine a dict and list to resolve which "anomaly" is most dangerous | 5-level | Multi-step correctness | Forbidden Forest |
| Wizard Duel | timed, mixed review | Solve 3 short problems from prior chapters against a soft timer | 5-level, timer removable for anxiety-sensitive mode | Correctness only, time is bonus not gate | Dueling Arena |
| Artifact Repair | debugging | Given broken code with a labeled bug category, fix it | 5-level, first hint identifies *which line* | Before/after output diff | Any (recurring format) |

---

## SECTION I — BOSS BATTLES

**1. The Infinite Loop** (Ch6)
- *Story:* The Clocktower's curse is a while loop with a condition that never resolves.
- *Required Skills:* while, break, continue, reading a running loop's state.
- *Environment:* Clocktower interior, visualized loop counter ticking.
- *Coding Mechanics:* Player is given three progressively broken while-loop scripts and must fix the loop condition/increment in each before a shared "curse timer" runs out (soft timer, generous).
- *Stages:* (1) Loop never starts, (2) Loop never ends, (3) Loop ends but skips required work.
- *Failure Conditions:* Submitting code that still infinite-loops is caught by a safe sandbox timeout and explained, not punished — player retries immediately.
- *Hints:* 5-level, Level 1 asks "what changes each time through the loop?"
- *Scoring:* Stages completed + hints used (informational, not gating).
- *Rewards:* 60 XP, Reparo (partial unlock), House Points.
- *Story Outcome:* The Clocktower's hour hand moves for the first time in years; Hollis reveals the "coincidences" pattern.

**2. The Corrupted Spellbook** (Ch11)
- *Story:* A spellbook's pages call each other in a tangled, buggy web of near-duplicate functions.
- *Required Skills:* def, parameters, return, scope.
- *Environment:* A shifting library of floating function "pages."
- *Coding Mechanics:* Player refactors three duplicated code blocks into one correctly parameterized function, then calls it in three places.
- *Stages:* (1) Extract the function, (2) Parameterize it correctly, (3) Fix a scope bug (a variable used outside its function).
- *Failure Conditions:* Refactor changes program output — caught automatically, explained as "the spell changed meaning."
- *Hints:* 5-level.
- *Scoring:* Correctness of refactor + output equivalence.
- *Rewards:* 50 XP, House Points, "Refactorer" badge.
- *Story Outcome:* The Spell Compendium becomes usable; foreshadows the larger Corrupted Logbook.

**3. The Enchanted Library Crisis** (Ch10, story midpoint)
- *Story:* The library's dictionary-based catalogue starts losing entries as the corruption spreads.
- *Required Skills:* dictionaries, nested dicts, loops over dicts.
- *Environment:* Books visibly vanish from shelves as catalogue entries are lost; player's fixes visibly restore them.
- *Coding Mechanics:* Player must rebuild a corrupted catalogue dict from a partial backup list, resolving conflicts (duplicate keys, missing values) per given rules.
- *Stages:* (1) Restore top-level entries, (2) Restore nested shelf-location data, (3) Deduplicate conflicting entries.
- *Failure Conditions:* Partial restoration is allowed and scored proportionally — no all-or-nothing fail state.
- *Hints:* 5-level.
- *Scoring:* % of catalogue correctly restored.
- *Rewards:* 60 XP, Protego (partial unlock).
- *Story Outcome:* Confirms the corruption is deliberate, not accidental; Madame Quill shares the first fragment of the old logbook.

**4. The Forbidden Forest Guardian** (Ch12)
- *Story:* A guardian construct tests the player with a live, tangled mess of buggy code guarding the forest's heart.
- *Required Skills:* loops, data structures, functions, try/except — the year's first true multi-concept integration.
- *Environment:* A shifting forest clearing; each "root" of the guardian is one buggy function.
- *Coding Mechanics:* Player is given a program with five separate bugs (one of each type from L54) across a small multi-function script and must find and fix all five.
- *Stages:* (1) Syntax error, (2) Name error, (3) Type error, (4) Logic error, (5) Runtime error requiring try/except.
- *Failure Conditions:* None fatal — the guardian "resets" a stage rather than ending the fight.
- *Hints:* 5-level, first hint always names *which category* of error to look for.
- *Scoring:* Bugs fixed, categorized correctly.
- *Rewards:* 70 XP, Protego unlocked fully, House Points, "Investigator" title.
- *Story Outcome:* Player recovers a full copy of the corrupted logbook, revealing the Unnamed Author's identity clues.

**5. The Final Castle Defense** (Ch14, climax)
- *Story:* The old logbook's automation, left unattended for years, is finally collapsing under its own unhandled edge cases and threatens the castle wards.
- *Required Skills:* everything — variables, control flow, data structures, functions, error handling, files.
- *Environment:* The Corrupted Wing, visually assembled from fragments of every earlier location.
- *Coding Mechanics:* A genuinely broken, moderately long multi-function program (reading from a "ward log" file) with several interacting bugs; player must diagnose using their own judgment, not a stage checklist.
- *Stages:* Open-ended — player chooses order of investigation, mirroring real debugging.
- *Failure Conditions:* None permanent; the ward flickers but never fully falls, keeping stakes narratively real without punishing exploration.
- *Hints:* 5-level, but Level 1 here is deliberately vaguer than earlier bosses (matching Year-1 exit mastery expectations).
- *Scoring:* Wards restored (proportional to bugs fixed) + code quality (readability, no leftover dead code).
- *Rewards:* 100+ XP, Expecto Patronum unlocked, "Year 1 Graduate" title.
- *Story Outcome:* Directly sets up the Final Project — the player is asked to rebuild the system properly, not just patch it.

---

## SECTION J — EXAM SYSTEM

**Mid-Year Examination (after Ch8, L37)** — covers Chapters 1–8.
- Format: 40% short-answer/predict-the-output, 30% debugging (find-the-bug in short snippets), 30% write-your-own-code (2 small programs using variables/operators/conditionals/lists).
- No multiple-choice-only sections; every question requires producing or reasoning about real code.
- Untimed by default (timed "Duelist Mode" optional for players who want it).
- Retake policy: unlimited retakes with a freshly generated equivalent exam, framed narratively as "the Hall remembers your effort, not your first attempt."

**Final Examination (Ch14, L64)** — cumulative, all Year-1 concepts.
- Format: same three-part structure as Mid-Year, scaled up (more concepts, slightly harder debugging snippets, one longer written program).
- Includes at least one question per major topic area (variables/types, operators, conditionals, loops, lists, tuples/sets, dictionaries, functions, errors, files/modules).

**Practical Final (folds into the Final Project, Section K)** — the player *builds* something rather than answering isolated questions, assessed by rubric rather than pass/fail exam scoring.

---

## SECTION K — YEAR 1 FINAL PROJECT

### The Magical Academy Management System

**Premise:** Using the recovered, now-stabilized ideas from the corrupted logbook, the player builds a proper management system for the school — proof they've moved from "fixing magic" to "building magic."

**Requirements (must-have):**
- Student records (dictionary of dictionaries: name → {house, year, points})
- House points tracker with add/subtract functions
- Spell/potion inventory (list or dict) with add/remove/search
- A simple text menu loop (while loop) letting the user choose actions
- At least 3 custom functions with parameters and return values
- Basic input validation using conditionals
- Save/load to a file so data persists between runs
- Graceful error handling (no crashing on bad input)

**Optional (stretch) features:**
- Search/sort student records
- A simple "randomized Sorting Hat" using the `random` module
- Basic reporting (e.g., top house by points) using loops over dictionaries
- A small "duel simulator" mini-feature reusing earlier functions

**Milestones:**
1. Plan the data structures on paper/pseudocode (decomposition practice)
2. Build the core menu loop with placeholder functions
3. Implement student records + house points
4. Implement inventory
5. Add file save/load
6. Add error handling
7. Polish, test, and playtest with a friend (Wrenlight-style peer review encouraged)

**Evaluation rubric (qualitative bands, not punitive point deductions):**
- *Functionality:* Does it run and do what it claims?
- *Correctness:* Do the core features behave correctly, including edge cases?
- *Code organization:* Are functions used sensibly instead of one giant script?
- *Robustness:* Does bad input crash it, or does it recover?
- *Readability:* Would another student understand this code?

**Final reward:** "Expecto Patronum" fully unlocked (symbolizing independent problem-solving), a Year 1 Diploma, and the player's project is narratively "adopted" by the school — visually represented in the Great Hall.

**Story consequence:** Closes the main plot — the Unnamed Author's reckless, unreviewed magic is replaced by the player's tested, documented, resilient system, thematically completing the "code that works because it's built carefully" throughline.

---

## SECTION L — AI TUTOR

**Persona:** A small, sentient enchanted notebook ("Inkwell") that follows the player, speaks briefly, and never lectures unprompted.

**Hint ladder (used identically across all lessons/challenges/bosses):**
1. **Level 1 — Subtle nudge.** Points at the *category* of the problem ("Look closely at what changes each time your loop runs.")
2. **Level 2 — Conceptual guidance.** Names the concept without touching the player's code ("This is about loop conditions — what has to become False eventually?")
3. **Level 3 — Direct guidance.** References the player's actual code line ("Line 4 never updates `hour` — what should update it?")
4. **Level 4 — Pseudo-code.** Gives a near-solution in plain English steps.
5. **Level 5 — Near-complete solution.** Gives working code with one small gap for the player to fill in.
6. **Final Explanation.** Full solution *with* an explanation of why it works, always offered after any successful or failed attempt, never withheld as a "reward."

**Memory the tutor keeps (per player):**
- Concepts repeatedly missed → surfaced as gentle remediation quests, never as a public "weak" label.
- Common mistake patterns (e.g., off-by-one errors, forgetting `return`) → tutor proactively mentions the *pattern*, not just the instance, building metacognition.
- Learning pace → adjusts how quickly Inkwell offers Level 1 hints (faster learners get more silence/independence by default, adjustable by the player at any time).
- Preferred explanation style → some players respond better to visual analogies, others to direct technical language; Inkwell tracks which explanations "land" (measured by subsequent success rate) and favors that style.
- Confidence signals → hesitation patterns (many small edits, long pauses) trigger a *check-in*, not an unsolicited hint: "Want a nudge, or are you still thinking?"

**Gameplay effect:** Inkwell's hint usage feeds Ironroot/Deepcurrent house point calculations (using fewer hints on hard problems supports Deepcurrent's "wisdom" points) but never blocks progress — a player can always reach Level 6 (full explanation) and move on.

---

## SECTION M — PROGRESSION SYSTEM

| System | Description |
|---|---|
| **XP & Levels** | XP from lessons/quests/bosses/exams accumulates into a Player Level (1–20 across Year 1), gating nothing but unlocking cosmetics and title eligibility |
| **House Points** | Weekly-reset house competition per Section E; purely social, never gates content |
| **Coins** | Earned from side quests and daily tasks; spent on cosmetics (robe colors, wand designs, common-room decor) — never on hints, retries, or shortcuts (no pay-to-win) |
| **Spells** | Symbolic unlocks tied to mastery milestones (see Section U... i.e. Spell System below); purely narrative/cosmetic markers of concept mastery |
| **Titles** | "First-Term Scholar," "Investigator," "Refactorer," "Year 1 Graduate," etc. — earned, never purchased |
| **Badges** | Smaller achievement markers (e.g., "Zero-Hint Boss Clear," "7-Day Streak," "Helped 3 Classmates") |
| **Cosmetics** | Common-room decorations, robe colors, wand skins — entirely optional, no gameplay effect |

Design guardrail: nothing purchasable or grindable ever substitutes for actually solving a coding challenge — nothing in the economy can be spent to skip a lesson, auto-solve a challenge, or buy XP directly.

---

## SECTION N — LEARNING SCIENCE MAPPING

| Principle | Where it appears |
|---|---|
| **Active recall** | "Predict the output" segments before every new demonstration; Wizard Duel challenges |
| **Spaced repetition** | Side quests deliberately re-use earlier concepts (e.g., a Term 3 side quest reusing L9 string skills); Mid-Year and Final exams cumulative |
| **Retrieval practice** | Independent Challenge step in every lesson requires unaided recall before any hint is shown |
| **Deliberate practice** | Daily task loop (Section 24) always includes one short, targeted practice rep on a recent weak area |
| **Immediate feedback** | All code challenges run instantly with clear pass/fail + diff-style output comparison |
| **Progressive difficulty** | Section O's difficulty curve; every chapter opens at difficulty 1–2 before reaching its boss at 3–5 |
| **Interleaving** | Term 3 lessons and bosses deliberately combine 2–4 earlier concepts rather than teaching in isolation |
| **Project-based learning** | Mini-projects end nearly every chapter; the Final Project anchors the whole year |
| **Scaffolding** | Guided Coding step always precedes the Independent Challenge; hint ladder scaffolds within challenges |
| **Error-based learning** | Chapter 12's entire arc, plus the recurring "Artifact Repair" challenge type across all chapters |

---

## SECTION O — DIFFICULTY CURVE

```
Difficulty
  5 │                                                     ● Final Boss
    │                                                  ●  ● Final Project
  4 │                              ●        ●  ●    ●
    │                     ●     ●     ●  ●        ●
  3 │            ●     ●     ●     ●
    │      ●  ●
  2 │   ●
    │●
  1 │
    └──────────────────────────────────────────────────────────────
      Ch1  Ch2  Ch3  Ch4  Ch5  Ch6  Ch7  Ch8  Ch9  Ch10 Ch11 Ch12 Ch13 Ch14
```

Each chapter dips slightly at its *start* (new concept introduced gently) and rises to a local peak at its *boss/mini-project* — a sawtooth pattern layered on a rising trendline, so no single chapter feels like a difficulty wall, but the year as a whole clearly escalates.

---

## SECTION P — PLAYER JOURNEY TIMELINE

| Time | Milestone |
|---|---|
| Day 1 | Receive the Enchanted Letter, print() first output |
| Week 1 | Complete Sorting Ceremony, assigned to a house, comfortable with variables/types |
| Week 2–3 | Operators and first conditionals; first mini-project (Potion Ratio) |
| Month 1 | Chamber Lock quest complete; conditionals feel natural |
| Month 1.5 | First boss (Infinite Loop) cleared; while-loops understood |
| Month 2 | for-loops and lists; comfortable iterating over collections |
| Month 2.5 | Mid-Year Exam passed; "First-Term Scholar" title earned |
| Month 3 | Tuples/sets, dictionaries; Enchanted Library Crisis boss |
| Month 3.5 | Functions unlocked; Spell Compendium underway |
| Month 4 | Error handling arc; Forbidden Forest Guardian boss |
| Month 4.5 | Files and modules; Archive restored |
| Month 5 | Final Exam |
| Month 5–6 | Final Project build (Magical Academy Management System) |
| Graduation | Final Castle Defense boss, project presented, Year 1 complete |

*(Total pacing assumes roughly 3–5 lessons/week at 20–40 minutes each — a realistic beginner cadence, not a cram schedule.)*

---

## SECTION Q — YEAR 1 SKILL TREE

```
                         PYTHON FOUNDATIONS
                                 │
                 ┌───────────────┼───────────────┐
                 │                                │
             VARIABLES                       DEV BASICS
                 │                        (editor, errors)
       ┌─────────┼─────────┐
       │         │         │
   STRINGS   NUMBERS   BOOLEANS
       │         │         │
       └─────────┼─────────┘
                 │
             OPERATORS
      (arithmetic / comparison / logical)
                 │
                 ▼
             CONDITIONALS
          (if / elif / else / nested)
                 │
        ┌────────┴────────┐
        ▼                 ▼
   WHILE LOOPS         FOR LOOPS
   (break/continue)     (range)
        └────────┬────────┘
                 ▼
            DATA STRUCTURES
     ┌───────────┼───────────┐
     ▼           ▼           ▼
   LISTS   TUPLES & SETS  DICTIONARIES
     └───────────┼───────────┘
                 ▼
              FUNCTIONS
     (parameters / return / scope)
                 │
                 ▼
           ERROR HANDLING
        (tracebacks / try-except)
                 │
                 ▼
          FILES + MODULES
        (read/write, import)
                 │
                 ▼
         ★ FINAL PROJECT ★
   (Magical Academy Management System)
```

Every branch must be reached before the Final Project node unlocks, but *within* a term, chapters can flex slightly in order for optional side-quest pacing (e.g., a player could tackle Twin Vaults before finishing all Vault-of-Lists side quests) — the spine (Foundations → Conditionals → Loops → Data Structures → Functions → Errors → Files → Project) is fixed.

---

## SECTION R — COMMERCIAL IP CONVERSION PLAN

| Harry Potter Element (prototype) | Original Replacement | Gameplay Purpose Preserved |
|---|---|---|
| Hogwarts | "Aldermoor Academy" (or similar invented name) | Central school setting |
| Gryffindor / Slytherin / Ravenclaw / Hufflepuff | Emberwing / Deepcurrent / Ironroot / Wrenlight (already designed original) | Four-house identity system |
| Sorting Hat | "The Threshold Stone" — a sentient artifact that "reads" the player's early answers | Onboarding ceremony + first program |
| Hermione-style brilliant mentor | Mira Alderglass (already original) | Debugging/dictionary mentor |
| Snape-style strict professor | Professor Thistlewood (already original) | Precision-focused teaching |
| Time-Turner | "The Clockwright's Curse" — a cursed mechanism, not a named artifact | While-loop narrative device |
| Gringotts vaults | "The Deepvault" — an original underground repository | Tuples/sets puzzle setting |
| Forbidden Forest | "The Hollow Wood" | Errors + data-structure integration arc |
| Patronus (Expecto Patronum) | "Wardlight" — a self-generated protective spell tied to independent problem-solving | Capstone-mastery symbol |
| Lumos / Alohomora / Reparo / Accio / Protego | Invented spell names tied 1:1 to concept (e.g., "Kindle" = variables, "Unbar" = conditionals, "Mendcraft" = debugging, "Summon" = functions, "Ward" = error handling) | Concept-to-spell mapping system |
| Owlery / owl post | "The Skylark Post" — a courier-bird system, original species | Files/modules narrative wrapper |
| Quidditch-style dueling arena | "The Proving Ring" | Timed review challenge venue |
| Restricted Section | "The Hollow Archive" | Dictionaries/library arc |

Because the house system, mentor characters, and spell-to-concept mapping in this document were already designed as original content (not reused HP names), a commercial build mainly needs to: (1) rename the school/setting nouns above, (2) redesign visual assets to avoid trademarked iconography (robes, crests, creature designs), and (3) rewrite location flavor text to avoid recognizable phrasing from the source books. The *educational architecture* (chapters, lessons, bosses, exams, hint system, house-point philosophy) requires no changes at all — it was never HP-dependent.

---

## SECTION S — IMPLEMENTATION BLUEPRINT

**Frontend screens**
- Landing/Login → Sorting/Onboarding flow → Great Hall (hub/home) → Chapter Map → Location screens (per Section C) → Lesson player (story + code editor split view) → Challenge/Boss arena (code editor + live output + hint panel) → Exam mode → Inventory/Progression dashboard → House leaderboard → Settings/Accessibility (timer toggle, font size, colorblind-safe palette)

**Game engine / rendering requirements**
- 2D visual-novel-style presentation is sufficient (no need for 3D); illustrated static/animated location backgrounds, character portraits with a handful of emotion states, lightweight sprite-based "visual demonstrations" (e.g., variable boxes, loop counters) built as reusable component animations rather than bespoke art per lesson

**Python execution environment**
- Sandboxed, timeout-protected code execution (server-side or WASM-based in-browser Python runtime) so infinite loops and runaway code are safely interrupted and explained rather than crashing the client
- Deterministic test-runner per challenge (input → expected output / expected state comparisons), plus a lightweight static-analysis pass for style checks (e.g., "did they define a function" for function-requiring lessons) and AST-level checks (e.g., forbidding students from hard-coding an expected output string to "cheat" a test)

**Database entities (high level)**
- `Player` (id, name, house, level, xp, coins, current_chapter, current_lesson)
- `PlayerProgress` (player_id, lesson_id, status, attempts, hints_used, completed_at)
- `PlayerSkillState` (player_id, concept_id, mastery_score) — feeds AI tutor adaptivity
- `Lesson` (id, chapter_id, title, story_context, objective, concepts[], difficulty, template fields from Sec. 9)
- `Chapter` (id, term_id, order, title, story_summary)
- `Quest` (id, type[main/side], chapter_id, description, reward_refs)
- `Challenge` (id, lesson_id or boss_id, type, starter_code, test_cases[], hint_ladder[])
- `Boss` (id, chapter_id, stages[], scoring_rules)
- `Exam` (id, type[mid/final], question_bank_refs, cumulative_scope)
- `TutorMemory` (player_id, weak_concepts[], mistake_patterns[], preferred_explanation_style, hint_usage_stats)
- `Reward` (id, type[xp/coin/spell/title/badge/cosmetic], unlock_condition)
- `HouseWeeklyScore` (house_id, week_id, points, breakdown_by_source)

**Player progression data**
- Serialized per-player state covering current position in the skill tree (Section Q), unlocked spells/titles/badges, and a "Where am I / what have I learned / what's next / why" summary generated from `PlayerProgress` + `PlayerSkillState`

**Quest & lesson data**
- Authored as structured content (e.g., JSON/YAML per lesson matching the Section 9 template) so narrative writers and curriculum designers can edit content without touching engine code

**Coding challenge data**
- Each challenge stores: starter code, hidden test cases, visible example test case, five-level hint text, and a rubric for open-ended challenges (Final Project) scored via a mix of automated tests + structural checks

**AI tutor**
- A service consuming `PlayerProgress` + `PlayerSkillState` + real-time code diffs to select hint level and remediation quest suggestions; logs mistake patterns (e.g., recurring off-by-one, forgetting `return`) to `TutorMemory` for cross-session personalization

**Authentication**
- Standard email/OAuth login; support for supervised/classroom accounts (teacher dashboard) if this expands into an education-market product

**Leaderboards**
- Weekly house totals only by default (per Section E's anti-discouragement rule); optional opt-in individual leaderboard for players who want it, off by default

**Save system**
- Auto-save after every lesson/challenge/boss attempt; explicit "resume where you left off" on login; Final Project work saved incrementally like a real IDE project

**Analytics**
- Per-lesson completion/drop-off rates, hint-level distribution (to catch lessons that are miscalibrated), time-on-task, retry counts on exams/bosses — used to tune difficulty curve (Section O) over time without ever being shown to players as a "score" that could feel punitive

---

*This document defines the complete Year 1 system. Any single section (e.g., the remaining 55 lessons in full seven-field template, additional side quests, full exam question banks) can be expanded into its own detailed document on request.*

**Chapter 5**: Functions & Reusability (6 lessons + 2 side quests + Midterm Review)


Lesson 5.1: What is a function? (10–15 min)


**Title**: The Whisperwind Trial
