'use server'

import { revalidatePath } from 'next/cache'
import { quizFormSchema, type QuizFormData } from '@/src/db/validation-schemas'

export async function createQuizAction(data: QuizFormData) {
  try {
    // Server-side validation
    const validatedData = quizFormSchema.parse(data)
    
    // TODO: Implement actual database insertion
    // This is a placeholder that will need to be implemented with your DB setup
    // Example:
    // const [quiz] = await db.insert(quizzes).values({
    //   quizName: validatedData.quizName,
    //   createdBy: 1, // TODO: Get from auth session
    // }).returning()
    //
    // await db.insert(guessedMovies).values(
    //   validatedData.questions.map((q, idx) => ({
    //     movieName: q.movieName,
    //     emojis: q.emojis,
    //     orderInQuiz: idx,
    //     quizId: quiz.id,
    //   }))
    // )
    
    // For now, just log the data
    console.log('Creating quiz with validated data:', {
      quizName: validatedData.quizName,
      questionCount: validatedData.questions.length,
      questions: validatedData.questions.map((q, idx) => ({
        order: idx,
        movieName: q.movieName,
        emojis: q.emojis,
      })),
    })
    
    // Revalidate relevant paths
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
