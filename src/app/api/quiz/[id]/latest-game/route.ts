import { NextRequest, NextResponse } from 'next/server';
import { getLatestGameForQuiz } from '@/src/db//queries/game';
import { auth } from '@/src/auth';
import { headers } from 'next/headers';

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

    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const gameData = await getLatestGameForQuiz(quizId, session.user.id);

    if (!gameData) {
      return NextResponse.json(
        { error: 'No game found' },
        { status: 404 }
      );
    }

    return NextResponse.json(gameData);
  } catch (error) {
    console.error('Error fetching game results:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}