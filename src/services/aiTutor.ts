import { z } from 'zod';
import { CURRICULUM } from '../data/curriculum';

export const LessonSchema = z.object({
  chapterNumber: z.number(),
  title: z.string(),
  story: z.string(),
  instruction: z.string(),
  exampleCode: z.string().optional(),
  questDescription: z.string(),
  exampleInput: z.string().optional(),
  exampleOutput: z.string().optional(),
  starterCode: z.string(),
  expectedOutputSnippet: z.string(),
  xpReward: z.number(),
  isBoss: z.boolean().default(false)
});

export type GeneratedLesson = z.infer<typeof LessonSchema>;

export const generateLesson = async (
  _playerLevel: number, 
  _currentChapter: number, 
  _previousTopics: string[],
  currentLessonNumber: number
): Promise<GeneratedLesson> => {
  // We completely ripped out the AI! The curriculum is now 100% pre-built and perfectly paced.
  const lesson = CURRICULUM[currentLessonNumber];
  
  if (!lesson) {
    // If they beat all 30 lessons!
    return {
      chapterNumber: 6,
      title: "Graduation!",
      story: "You have defeated Lord Voldemort and mastered the Python language.",
      instruction: "There is nothing left to teach you here. Go forth and build incredible things!",
      questDescription: "Print 'I am a Python Master!'",
      starterCode: "print('I am a Python Master!')",
      expectedOutputSnippet: "I am a Python Master!",
      xpReward: 1000,
      isBoss: true
    };
  }

  return lesson;
};
