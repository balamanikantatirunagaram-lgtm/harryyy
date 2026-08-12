# Chapter 1: The Foundations of Magic (Python Basics)

## Curriculum Plan
Chapter 1 focuses on introducing the player to the absolute basics of Python programming, framed as fundamental incantations and manipulation of magical essence. The progression is designed to be engaging, short, and varied.

### Lesson 1: The Spark of Life (Print & Strings)
* **Concept:** `print()` statement and Strings.
* **Story:** You stand in the dark Great Hall. The torches are unlit. You must speak the first words of magic to illuminate the room.
* **Instruction (Short):** In Python, `print()` tells the computer to say something out loud. Words (Strings) must always be wrapped in quotes like `"Lumos"`.
* **Engaging Quest:** Ignite the Great Hall torches by casting `print("Lumos")`.

### Lesson 2: Enchanted Vials (Variables & Integers)
* **Concept:** Variables and assignment.
* **Story:** Professor Flitwick hands you a dusty, empty glass vial. "Magic requires containers to hold essence," he explains.
* **Instruction (Short):** A variable is just a named box that holds data. Use the `=` sign to put something inside it. Example: `potions = 5`.
* **Engaging Quest:** Create a variable named `dragon_scales` and assign it the number `3`. Print the variable to confirm your inventory.

### Lesson 3: The Alchemist's Equation (Basic Math)
* **Concept:** Arithmetic operations (`+`, `-`, `*`, `/`).
* **Story:** You sneak into the Potions lab. The recipe for a Healing Draught requires combining exactly 7 crushed roots and 4 moon drops.
* **Instruction (Short):** Python can do math just like a calculator. Use `+` for addition, `-` for subtraction, and `*` for multiplication.
* **Engaging Quest:** Create a variable `total_ingredients` that adds `roots` (7) and `moon_drops` (4) together.

### Lesson 4: The Sorting Hat's Logic (Booleans)
* **Concept:** Booleans (`True`, `False`).
* **Story:** The Sorting Hat sits on your head. It asks a simple, undeniable truth to gauge your alignment. 
* **Instruction (Short):** A Boolean is a value that is strictly `True` or `False`. Notice they always start with a capital letter and have no quotes.
* **Engaging Quest:** Answer the Hat by creating a variable `is_magic_real` and setting it to `True`.

### Lesson 5: The Guarded Door (If Statements)
* **Concept:** Conditionals (`if` statement).
* **Story:** The door to the Restricted Section is locked. A stone gargoyle asks for a password. If you have the right key, it will open.
* **Instruction (Short):** Use an `if` statement to check a condition. If the condition is true, the indented code beneath it runs. Remember the colon `:` at the end of the `if` line!
* **Engaging Quest:** Write an `if` statement checking if `password == "Alohomora"`. If it is, print `"Unlocked!"`.

### Boss Battle: The Rogue Boggart
* **Concept:** Combining Variables, Math, and Strings.
* **Story:** A Boggart has escaped from a cabinet! It tries to confuse you by shifting shapes. You must calculate its weakness and shout the binding spell!
* **Quest:** You have `power = 10` and `focus = 5`. Create a `spell_strength` variable that multiplies them. Then print `"Riddikulus!"`.

---

## Technical Architecture for Background Prefetching

To solve the 30+ second load time issue, we will implement a background prefetching queue.

1. **State Update (`playerStore.ts`)**: Add a `prefetchedLesson` state property.
2. **Background Task (`aiTutor.ts`)**: 
   - When a lesson loads, immediately check if `prefetchedLesson` exists. 
   - If it does, load it instantly. 
   - While the user is solving the current lesson, silently dispatch an async call to `generateLesson(currentLesson + 1)`.
   - Store the result in `prefetchedLesson`.
3. **AI Prompt Optimization**: Update the system prompt to explicitly enforce short, varied, and engaging instructions rather than long-winded generic text. Inject the planned curriculum topics into the prompt so the AI knows exactly *what* to teach next.
