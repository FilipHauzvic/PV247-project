import { eq, inArray } from "drizzle-orm";
import { db } from "..";
import { games, guessedMovies, movieGuesses, quizzes } from "../db/schema";
import { HistoryGame } from "../data/game";

export const getUserGameHistory = async (userId: number) => {
	if (userId === 1)
	{
		return [
			{
				id: 1,
				totalGuessingTimeInSeconds: 120,
				date: "2024-01-01",
				quiz: { quizName: "Sample Quiz" },
				movieGuesses: [
					{ falseGuessCount: 2, guessedMovie: { movieName: "Inception", emojis: "🌀👨‍💻" } },
					{ falseGuessCount: 0, guessedMovie: { movieName: "The Matrix", emojis: "💊🕶️" } },
				],
			},
			{
				id: 2,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 3,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 4,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 5,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 6,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 7,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 8,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 9,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 10,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 11,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 12,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 13,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 14,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 15,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 16,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 17,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 18,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 19,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 20,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 21,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
			{
				id: 22,
				totalGuessingTimeInSeconds: 95,
				date: "2024-02-15",
				quiz: { quizName: "Another Quiz" },
				movieGuesses: [
					{ falseGuessCount: 1, guessedMovie: { movieName: "Interstellar", emojis: "🚀🌌" } }
				],
			},
		];
	}
	
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