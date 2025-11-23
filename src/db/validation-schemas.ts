import { z } from 'zod';

export const questionSchema = z.object({
  id: z.string(),
  movieName: z.string().min(1, 'Movie name is required'),
  emojis: z.string().min(1, 'Emojis are required').max(10, 'No more than 10 emojis allowed'),
  orderInQuiz: z.number(),
});

export const quizFormSchema = z.object({
  quizName: z.string().min(1, 'Quiz name is required'),
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
});

export type QuizFormData = z.infer<typeof quizFormSchema>;
export type Question = z.infer<typeof questionSchema>;
