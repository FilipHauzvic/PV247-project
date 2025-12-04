'use server'

import { revalidatePath } from 'next/cache'
import { quizFormSchema, type QuizFormData } from '@/src/db/validation-schemas'
import { validateEmojiString, MAX_EMOJI_LENGTH, splitEmojiString } from '@/src/utils/emoji'
import { db } from '@/src/index'
import { quizzes, guessedMovies } from '@/src/db/schema'
import { auth } from '../auth'
import { headers } from 'next/headers';

export async function searchMoviesTMDB(query: string) {
  if (!query || query.length < 2) return [];

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('TMDB API key not set');
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) return [];

  const data = await res.json();
  if (!data.results) return [];

  // Return array of { id, title, release_date }
  return data.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    release_date: movie.release_date,
  }));
}

export async function createQuizAction(data: QuizFormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return {
      success: false,
      error: 'User not authenticated'
    }
  }

  try {
    const validatedData = quizFormSchema.parse(data)

    // Validate emojis for each question
    for (const q of validatedData.questions) {
      const result = validateEmojiString(q.emojis, MAX_EMOJI_LENGTH);
      if (!result.valid) {
        return {
          success: false,
          error: `Invalid emojis for "${q.movieName}": ${result.error}`
        }
      }
    }

    const [quiz] = await db.insert(quizzes).values({
      quizName: validatedData.quizName,
      createdBy: session.user.id
    }).returning();

    await db.insert(guessedMovies).values(
      validatedData.questions.map((q, idx) => ({
        movieName: q.movieName,
        emojis: q.emojis,
        orderInQuiz: idx,
        quizId: quiz.id,
      }))
    );

    revalidatePath('/')
    revalidatePath('/create')
    
    return { 
      success: true, 
      message: 'Quiz created successfully',
    }
  } catch (error) {
    console.error('Error creating quiz:', error)
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create quiz' 
    }
  }
}
