import { NextRequest, NextResponse } from 'next/server';
import { getQuizWithMovies } from '@/src/db/queries/quiz';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const quizId = parseInt(id);

    if (isNaN(quizId)) {
      return NextResponse.json(
        { error: 'Invalid quiz ID' },
        { status: 400 }
      );
    }

    const quiz = await getQuizWithMovies(quizId);

    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}