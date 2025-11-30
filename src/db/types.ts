import { type InferSelectModel } from 'drizzle-orm';

import {
	quizzes,
	guessedMovies,
	games,
	movieGuesses,
} from './schema';

import {
	user,
	session,
	account,
	verification,
} from '../../auth-schema';

export type Quiz = InferSelectModel<typeof quizzes>;
export type GuessedMovie = InferSelectModel<typeof guessedMovies>;
export type Game = InferSelectModel<typeof games>;
export type MovieGuess = InferSelectModel<typeof movieGuesses>;

export type AuthUser = InferSelectModel<typeof user>;
export type AuthSession = InferSelectModel<typeof session>;
export type AuthAccount = InferSelectModel<typeof account>;
export type AuthVerification = InferSelectModel<typeof verification>;
