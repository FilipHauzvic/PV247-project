CREATE TABLE `games` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`total_guessing_time_in_seconds` integer NOT NULL,
	`date` text DEFAULT CURRENT_TIMESTAMP,
	`player_id` integer NOT NULL,
	`quiz_id` integer NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `guessed_movies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`movie_name` text NOT NULL,
	`emojis` text NOT NULL,
	`order_in_quiz` integer NOT NULL,
	`quiz_id` integer NOT NULL,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `movie_guesses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`false_guess_count` integer NOT NULL,
	`game_id` integer NOT NULL,
	`guessed_movie_id` integer NOT NULL,
	FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`guessed_movie_id`) REFERENCES `guessed_movies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quiz_name` text NOT NULL,
	`created_by` integer NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nickname` text NOT NULL,
	`password` text NOT NULL
);
