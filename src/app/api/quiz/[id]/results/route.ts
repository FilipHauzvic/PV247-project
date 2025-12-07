import { NextRequest, NextResponse } from 'next/server';
import { saveGameResults } from '@/src/db/queries/game';
import { auth } from '@/src/auth';
import { headers } from 'next/headers';
import { db } from '@/src/index';
import { games } from '@/src/db/schema';
import { eq, and, min } from 'drizzle-orm';

export async function POST(
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

    const body = await request.json();
    const { results, totalGuessingTimeInSeconds } = body;

    if (!Array.isArray(results)) {
      return NextResponse.json(
        { error: 'Invalid results format' },
        { status: 400 }
      );
    }

    if (typeof totalGuessingTimeInSeconds !== 'number') {
      return NextResponse.json(
        { error: 'Invalid time format' },
        { status: 400 }
      );
    }

    const game = await saveGameResults({
      quizId,
      playerId: session.user.id,
      results,
      totalGuessingTimeInSeconds,
    });

    const bestTimeResult = await db
      .select({ 
        bestTime: min(games.totalGuessingTimeInSeconds) 
      })
      .from(games)
      .where(and(
        eq(games.quizId, quizId),
        eq(games.playerId, session.user.id)
      ));

    const bestTime = bestTimeResult[0]?.bestTime ?? undefined;

    return NextResponse.json({ 
      success: true,
      gameId: game.id,
      bestTime
    });
  } catch (error) {
    console.error('Error saving quiz results:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}