import { type InferSelectModel } from 'drizzle-orm';

import {
	users,
	quizzes,
	guessedMovies,
	games,
	movieGuesses,
} from './schema';

export type User = InferSelectModel<typeof users>;
export type Quiz = InferSelectModel<typeof quizzes>;
export type GuessedMovie = InferSelectModel<typeof guessedMovies>;
export type Game = InferSelectModel<typeof games>;
export type MovieGuess = InferSelectModel<typeof movieGuesses>;
