import { db } from '@/src/index';
import { games, movieGuesses, guessedMovies } from '@/src/db/schema';
import { QuizResult } from '@/src/types/quiz.types';
import { eq, desc, and } from 'drizzle-orm';

export async function saveGameResults(data: {
  quizId: number;
  playerId: string;
  results: QuizResult[];
  totalGuessingTimeInSeconds: number;
}) {
  const [game] = await db.insert(games).values({
    quizId: data.quizId,
    playerId: data.playerId,
    totalGuessingTimeInSeconds: data.totalGuessingTimeInSeconds,
  }).returning();

  const guessesData = data.results.map(result => ({
    gameId: game.id,
    guessedMovieId: result.guessedMovieId,
    falseGuessCount: result.attempts - 1,
  }));

  await db.insert(movieGuesses).values(guessesData);

  return game;
}

export async function getLatestGameForQuiz(quizId: number, playerId: string) {
  const latestGame = await db
    .select()
    .from(games)
    .where(and(
      eq(games.quizId, quizId),
      eq(games.playerId, playerId)
    ))
    .orderBy(desc(games.date))
    .limit(1);

  if (latestGame.length === 0) {
    return null;
  }

  const game = latestGame[0];

  // Get all movie guesses for this game
  const guesses = await db
    .select({
      id: movieGuesses.id,
      falseGuessCount: movieGuesses.falseGuessCount,
      guessedMovieId: movieGuesses.guessedMovieId,
      movieName: guessedMovies.movieName,
    })
    .from(movieGuesses)
    .innerJoin(guessedMovies, eq(movieGuesses.guessedMovieId, guessedMovies.id))
    .where(eq(movieGuesses.gameId, game.id));

  // Convert to QuizResult format
  const results = guesses.map(guess => ({
    guessedMovieId: guess.guessedMovieId,
    movieName: guess.movieName,
    correct: guess.falseGuessCount === 0,
    attempts: guess.falseGuessCount + 1,
  }));

  return {
    game,
    results,
  };
}