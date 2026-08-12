import { supabase } from '../lib/supabase';
import { z } from 'zod';

const LessonSchema = z.object({
  chapterNumber: z.number(),
  title: z.string(),
  story: z.string(),
  instruction: z.string(),
  questDescription: z.string(),
  starterCode: z.string(),
  expectedOutputSnippet: z.string(),
  xpReward: z.number(),
  isBoss: z.boolean().default(false)
});

export type GeneratedLesson = z.infer<typeof LessonSchema>;

const PREBUILT_LESSONS: Record<number, GeneratedLesson> = {
  1: {
    chapterNumber: 1,
    title: "The Spark of Life",
    story: "You stand in the dark Great Hall. The torches are unlit. Professor Flitwick hands you your wand and smiles. 'You must speak the first words of magic to illuminate the room. A simple print incantation will do!'",
    instruction: "In Python, `print()` tells the computer to say something out loud. Words (Strings) must always be wrapped in quotes like `\"Lumos\"`.",
    questDescription: "Ignite the Great Hall torches by casting print(\"Lumos\").",
    starterCode: "# Cast your spell here\n",
    expectedOutputSnippet: "Lumos",
    xpReward: 50,
    isBoss: false
  },
  2: {
    chapterNumber: 1,
    title: "Enchanted Vials",
    story: "Professor Flitwick hands you a dusty, empty glass vial. 'Magic requires containers to hold essence,' he explains. 'If we do not capture the magic, it dissipates into the ether!'",
    instruction: "A variable is a named box that holds data. Use the `=` sign to put something inside it. Example: `potions = 5`.",
    questDescription: "Create a variable named `dragon_scales` and assign it the number `3`. Then print the variable to confirm your inventory.",
    starterCode: "# Create your variable below\n",
    expectedOutputSnippet: "3",
    xpReward: 50,
    isBoss: false
  },
  3: {
    chapterNumber: 1,
    title: "The Alchemist's Equation",
    story: "You sneak into the Potions lab. The recipe for a Healing Draught requires combining exactly 7 crushed roots and 4 moon drops. The cauldron bubbles hungrily.",
    instruction: "Python can do math just like a calculator. Use `+` for addition, `-` for subtraction, and `*` for multiplication.",
    questDescription: "Create a variable `total_ingredients` that adds `roots` (7) and `moon_drops` (4) together. Print the result.",
    starterCode: "roots = 7\nmoon_drops = 4\n# Calculate total_ingredients below\n",
    expectedOutputSnippet: "11",
    xpReward: 50,
    isBoss: false
  },
  4: {
    chapterNumber: 1,
    title: "The Sorting Hat's Logic",
    story: "The Sorting Hat sits on your head. It probes your mind, asking a simple, undeniable truth to gauge your magical alignment. You must answer truthfully.",
    instruction: "A Boolean is a value that is strictly `True` or `False`. Notice they always start with a capital letter and have no quotes around them.",
    questDescription: "Answer the Hat by creating a variable `is_magic_real` and setting it to `True`. Print it.",
    starterCode: "# Answer the Hat\n",
    expectedOutputSnippet: "True",
    xpReward: 50,
    isBoss: false
  },
  5: {
    chapterNumber: 1,
    title: "The Guarded Door",
    story: "The door to the Restricted Section is locked. A stone gargoyle asks for a password. It will only open if you present the correct magical key.",
    instruction: "Use an `if` statement to check a condition. If the condition is true, the indented code beneath it runs. Remember the colon `:` at the end!",
    questDescription: "Write an `if` statement checking if `password == \"Alohomora\"`. If it is, print `\"Unlocked!\"`.",
    starterCode: "password = \"Alohomora\"\n# Check the password\n",
    expectedOutputSnippet: "Unlocked!",
    xpReward: 50,
    isBoss: false
  }
};

const DYNAMIC_PLAN = [
  {
    topic: "BOSS BATTLE: The Rogue Boggart",
    storyContext: "A Boggart has escaped from a cabinet! It tries to confuse you by shifting shapes. You must calculate its weakness and shout the binding spell!",
    quest: "You have power = 10 and focus = 5. Create a spell_strength variable that multiplies them. Then print(\"Riddikulus!\")"
  },
  {
    topic: "Lists and Inventory",
    storyContext: "Hagrid needs you to organize his magical creatures feed bags. He hands you a parchment.",
    quest: "Create a list called `feed_bags` containing 'meat', 'vegetables', and 'insects'."
  }
];

export const generateLesson = async (
  _playerLevel: number, 
  currentChapter: number, 
  _previousTopics: string[],
  currentLessonNumber: number
): Promise<GeneratedLesson> => {
  // 1. Instantly return prebuilt lessons for the first 5 lessons
  if (currentLessonNumber <= 5) {
    return PREBUILT_LESSONS[currentLessonNumber];
  }

  // 2. Try to fetch the lesson from the centralized Cloud Database (Supabase)
  try {
    const { data: cachedLesson, error: dbError } = await supabase
      .from('lessons')
      .select('content')
      .eq('lesson_number', currentLessonNumber)
      .single();

    if (!dbError && cachedLesson?.content) {
      console.log(`Fetched Lesson ${currentLessonNumber} from Centralized DB!`);
      // Validate the cached JSON just to be safe
      return LessonSchema.parse(cachedLesson.content);
    }
  } catch {
    console.warn("Could not fetch from Supabase (table might not exist yet). Falling back to AI generation.");
  }

  // 3. Fall back to AI generation if not in DB
  const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
  if (!apiKey) {
    throw new Error("NVIDIA API Key not found in .env (VITE_NVIDIA_API_KEY)");
  }

  // We use DYNAMIC_PLAN to give the AI context. Lesson 6 maps to index 0, Lesson 7 to index 1, etc.
  const planIndex = (currentLessonNumber - 6) % DYNAMIC_PLAN.length;
  const currentPlan = DYNAMIC_PLAN[planIndex];
  const isBoss = (currentLessonNumber % 6 === 0);

  const prompt = `
You are the AI curriculum generator for a Wizarding Python Academy RPG.

GENERATE LESSON NUMBER: ${currentLessonNumber}
TOPIC TO TEACH: ${currentPlan.topic}
STORY CONTEXT TO USE: ${currentPlan.storyContext}
QUEST FOR THE STUDENT: ${currentPlan.quest}

CRITICAL INSTRUCTIONS for formatting the text:
1. DO NOT use generic text like "Welcome to the Wizarding Python Academy..." Use the STORY CONTEXT provided above to drop the player into the moment.
2. Keep the 'instruction' short, punchy, and easy to understand (max 3 sentences) explaining the TOPIC TO TEACH.
3. Make the 'questDescription' clear and action-oriented based exactly on the QUEST FOR THE STUDENT.

Return ONLY valid JSON in the following format, with no markdown formatting or extra text:
{
  "chapterNumber": ${currentChapter},
  "title": "String",
  "story": "String",
  "instruction": "String",
  "questDescription": "String",
  "starterCode": "String",
  "expectedOutputSnippet": "String",
  "xpReward": Number,
  "isBoss": ${isBoss}
}
`;

  try {
    const requestBody = {
      model: 'meta/llama-3.1-70b-instruct',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: "json_object" }
    };

    const res = await fetch('/nvidia-api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      throw new Error(`NVIDIA API error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    let content = json.choices[0]?.message?.content;
    
    // Clean up potential markdown blocks
    if (content.startsWith('```json')) {
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    }
    
    const parsedData = JSON.parse(content);
    
    // Validate the AI output using Zod to ensure it perfectly matches the application schema
    const validatedLesson = LessonSchema.parse(parsedData);

    // 4. Save the freshly generated lesson to the centralized DB so future users get it instantly
    try {
      await supabase.from('lessons').insert([{
        lesson_number: currentLessonNumber,
        chapter_number: currentChapter,
        topic: validatedLesson.title,
        content: validatedLesson
      }]);
      console.log(`Saved Lesson ${currentLessonNumber} to Centralized DB!`);
    } catch (dbErr) {
      console.warn("Failed to save to Supabase. Table might be missing.", dbErr);
    }

    return validatedLesson;

  } catch (error) {
    console.error("AI Generation or Validation failed:", error);
    throw error;
  }
};
