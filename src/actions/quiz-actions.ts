'use server'

import { revalidatePath } from 'next/cache'
import { quizFormSchema, type QuizFormData } from '@/src/db/validation-schemas'
import { db } from '@/src/index'
import { quizzes, guessedMovies } from '@/src/db/schema'

export async function createQuizAction(data: QuizFormData) {
  try {
    const validatedData = quizFormSchema.parse(data)
    
    const [quiz] = await db.insert(quizzes).values({
      quizName: validatedData.quizName,
      createdBy: 1 // Hardcoded user ID for now
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
      // quizId: quiz.id // Will be available once DB is implemented
    }
  } catch (error) {
    console.error('Error creating quiz:', error)
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create quiz' 
    }
  }
}
