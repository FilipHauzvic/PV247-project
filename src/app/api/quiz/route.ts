import { retrieveAllQuizzes } from '@/src/db/queries/quiz';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest
) {
  try {
    const retrieveQuizzes = await retrieveAllQuizzes();
    return NextResponse.json(retrieveQuizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
