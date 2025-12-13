import { db } from '@/src/index';
import { games, movieGuesses, guessedMovies, quizzes } from '@/src/db/schema';
import { QuizResult } from '@/src/db/quiz.types';
import { eq, desc, and, min, inArray } from 'drizzle-orm';
import { HistoryGame } from '@/src/data/game';

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

  const bestTimeResult = await db
    .select({
      bestTime: min(games.totalGuessingTimeInSeconds)
    })
    .from(games)
    .where(and(
      eq(games.quizId, quizId),
      eq(games.playerId, playerId)
    ));

  const bestTime = bestTimeResult[0]?.bestTime ?? undefined;

  const guesses = await db
    .select({
      id: movieGuesses.id,
      falseGuessCount: movieGuesses.falseGuessCount,
      guessedMovieId: movieGuesses.guessedMovieId,
      movieName: guessedMovies.movieName,
      emojis: guessedMovies.emojis,
    })
    .from(movieGuesses)
    .innerJoin(guessedMovies, eq(movieGuesses.guessedMovieId, guessedMovies.id))
    .where(eq(movieGuesses.gameId, game.id));

  const results = guesses.map(guess => {
    let maxAttempts = 0;
    maxAttempts = Array.from(guess.emojis).length;

    return {
      guessedMovieId: guess.guessedMovieId,
      movieName: guess.movieName,
      correct: guess.falseGuessCount < maxAttempts,
      attempts: guess.falseGuessCount + 1,
    };
  });

  return {
    game,
    results,
    bestTime,
  };
}

export const getUserGameHistory = async (userId: string) => {
  await new Promise(r => setTimeout(r, 2000));
  const gameData = await db
    .select()
    .from(games)
    .leftJoin(quizzes, eq(games.quizId, quizzes.id))
    .where(eq(games.playerId, userId));

  const gameIds = gameData.map(x => x.games.id);

  const movieData = await db
    .select()
    .from(movieGuesses)
    .leftJoin(guessedMovies, eq(movieGuesses.guessedMovieId, guessedMovies.id))
    .where(inArray(movieGuesses.gameId, gameIds));

  const gameHistory: HistoryGame[] = gameData.map(gameDataElement => ({
    id: gameDataElement.games.id,
    totalGuessingTimeInSeconds: gameDataElement.games.totalGuessingTimeInSeconds,
    date: gameDataElement.games.date ?? "",
    quiz: { quizName: gameDataElement.quizzes?.quizName ?? "Unknown Quiz" },
    movieGuesses: movieData
      .filter(movieDataElement => movieDataElement.movie_guesses.gameId === gameDataElement.games.id)
      .map(movieDataElement => ({
        falseGuessCount: movieDataElement.movie_guesses.falseGuessCount,
        guessedMovie: {
          movieName: movieDataElement.guessed_movies?.movieName ?? "Unknown Movie",
          emojis: movieDataElement.guessed_movies?.emojis ?? "",
        },
      })),
  }));

  return gameHistory;
}