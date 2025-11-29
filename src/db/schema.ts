import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { user } from '@/auth-schema';

export const quizzes = sqliteTable("quizzes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quizName: text("quiz_name").notNull(),
  createdBy: integer("created_by")
    .references(() => user.id)
    .notNull(),
});

export const guessedMovies = sqliteTable("guessed_movies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  movieName: text("movie_name").notNull(),
  emojis: text("emojis").notNull(),
  orderInQuiz: integer("order_in_quiz").notNull(),
  quizId: integer("quiz_id")
    .references(() => quizzes.id)
    .notNull(),
});

export const games = sqliteTable("games", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  totalGuessingTimeInSeconds: integer("total_guessing_time_in_seconds").notNull(),
  date: text("date").default(sql`CURRENT_TIMESTAMP`),
  playerId: integer("player_id")
    .references(() => user.id)
    .notNull(),
  quizId: integer("quiz_id")
    .references(() => quizzes.id)
    .notNull(),
});

export const movieGuesses = sqliteTable("movie_guesses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  falseGuessCount: integer("false_guess_count").notNull(),
  gameId: integer("game_id")
    .references(() => games.id)
    .notNull(),
  guessedMovieId: integer("guessed_movie_id")
    .references(() => guessedMovies.id)
    .notNull(),
});
