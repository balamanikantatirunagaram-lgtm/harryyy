import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
const apiKey = process.env.VITE_NVIDIA_API_KEY;

if (!supabaseUrl || !supabaseKey || !apiKey) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Define Schema for the actual generated lesson
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

// The hardcoded first 5 topics so the brain knows the foundation
const FOUNDATION_TOPICS = [
  "print() and Strings",
  "Variables",
  "Basic Math (+, -, *)",
  "Booleans (True/False)",
  "If Statements"
];

// Helper to call NVIDIA Llama 3.1 70B
async function callAI(prompt: string): Promise<any> {
  const requestBody = {
    model: 'meta/llama-3.1-70b-instruct',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 2000,
    response_format: { type: "json_object" }
  };

  const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
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
  if (content.startsWith('```json')) {
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  }
  return JSON.parse(content);
}

// ---------------------------------------------------------
// The Autonomous Brain Loop
// ---------------------------------------------------------
async function runBrain() {
  console.log("🧠 The Autonomous Curriculum Brain has awakened...");

  while (true) {
    try {
      // 1. Check Memory: What lessons do we already have?
      const { data: existingLessons, error } = await supabase
        .from('lessons')
        .select('lesson_number, topic, chapter_number')
        .order('lesson_number', { ascending: true });

      if (error) {
        console.error("Database error, please ensure the lessons table exists via supabase_schema.sql:", error.message);
        console.log("Retrying in 10 seconds...");
        await new Promise(resolve => setTimeout(resolve, 10000));
        continue;
      }

      const coveredTopics = [...FOUNDATION_TOPICS, ...(existingLessons?.map(l => l.topic) || [])];
      
      // Determine what lesson we are building next
      const nextLessonNumber = (existingLessons && existingLessons.length > 0) 
        ? existingLessons[existingLessons.length - 1].lesson_number + 1 
        : 6; // Start at 6 because 1-5 are hardcoded

      const isBoss = (nextLessonNumber % 6 === 0);
      const currentChapter = Math.floor((nextLessonNumber - 1) / 6) + 1;

      console.log(`\n======================================================`);
      console.log(`🤔 Planning Lesson ${nextLessonNumber} (Chapter ${currentChapter}) | Boss Battle: ${isBoss}`);
      console.log(`📚 Topics Covered So Far: ${coveredTopics.length}`);

      // 2. Call The Curriculum Director (Planner)
      const plannerPrompt = `
You are the Headmaster of a Wizarding Python Academy RPG.
Your job is to design the curriculum progressively from basics to advanced Python concepts.

Topics already covered:
${JSON.stringify(coveredTopics, null, 2)}

We are designing Lesson ${nextLessonNumber}, which is in Chapter ${currentChapter}.
${isBoss ? "CRITICAL: This is the final lesson of the chapter. IT MUST BE A BOSS BATTLE testing previous concepts!" : "This is a standard lesson introducing a new concept."}

Decide the exact next topic to teach that naturally follows the covered topics.
Plan the story context and the quest objective. 
Make the story extremely immersive (Harry Potter vibes, spells, potions, magical creatures).

Respond ONLY with valid JSON matching this structure:
{
  "topic": "String (The programming concept, e.g., 'Lists', 'While Loops', 'Functions')",
  "storyContext": "String (Immersive background story for the quest)",
  "quest": "String (The exact objective the student must code)"
}
`;

      const plan = await callAI(plannerPrompt);
      console.log(`🎯 Director chose topic: "${plan.topic}"`);
      
      // 3. Call The Lesson Writer (Generator)
      console.log(`✍️ Scribing lesson content...`);
      const writerPrompt = `
You are the AI curriculum generator for a Wizarding Python Academy RPG.

GENERATE LESSON NUMBER: ${nextLessonNumber}
TOPIC TO TEACH: ${plan.topic}
STORY CONTEXT TO USE: ${plan.storyContext}
QUEST FOR THE STUDENT: ${plan.quest}

CRITICAL INSTRUCTIONS:
1. Do not use generic text. Use the STORY CONTEXT provided to drop the player into the moment.
2. Keep the 'instruction' short, punchy, and easy to understand (max 3 sentences).
3. The 'starterCode' must contain the initial code for the quest.
4. The 'expectedOutputSnippet' must be a unique substring that the output must contain for the student to pass.

Respond ONLY with valid JSON matching this structure:
{
  "chapterNumber": ${currentChapter},
  "title": "String (Magical title for the lesson)",
  "story": "String (Fleshed out story based on context)",
  "instruction": "String (Short explanation of the programming concept)",
  "questDescription": "String (Action-oriented quest objective)",
  "starterCode": "String",
  "expectedOutputSnippet": "String",
  "xpReward": Number (e.g. 50 or 100 for boss),
  "isBoss": ${isBoss}
}
`;
      
      const lessonData = await callAI(writerPrompt);
      
      // Validate schema
      const validatedLesson = LessonSchema.parse(lessonData);

      // 4. Save to Database
      console.log(`💾 Saving Lesson ${nextLessonNumber} to Database...`);
      const { error: insertError } = await supabase.from('lessons').insert([{
        lesson_number: nextLessonNumber,
        chapter_number: currentChapter,
        topic: plan.topic,
        content: validatedLesson
      }]);

      if (insertError) {
        throw new Error(`Failed to insert into Supabase: ${insertError.message}`);
      }

      console.log(`✅ Successfully archived Lesson ${nextLessonNumber}!`);

      // 5. Rest to avoid API rate limits
      console.log("💤 Resting for 5 seconds before next lesson...");
      await new Promise(resolve => setTimeout(resolve, 5000));

    } catch (e: any) {
      console.error("❌ Brain encountered an error:", e.message);
      console.log("🔄 Retrying in 10 seconds...");
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
}

// Start the brain
runBrain();
