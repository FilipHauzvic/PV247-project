PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_games` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`total_guessing_time_in_seconds` integer NOT NULL,
	`date` text DEFAULT CURRENT_TIMESTAMP,
	`player_id` text NOT NULL,
	`quiz_id` integer NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_games`("id", "total_guessing_time_in_seconds", "date", "player_id", "quiz_id") SELECT "id", "total_guessing_time_in_seconds", "date", "player_id", "quiz_id" FROM `games`;--> statement-breakpoint
DROP TABLE `games`;--> statement-breakpoint
ALTER TABLE `__new_games` RENAME TO `games`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_quizzes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quiz_name` text NOT NULL,
	`created_by` text NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_quizzes`("id", "quiz_name", "created_by") SELECT "id", "quiz_name", "created_by" FROM `quizzes`;--> statement-breakpoint
DROP TABLE `quizzes`;--> statement-breakpoint
ALTER TABLE `__new_quizzes` RENAME TO `quizzes`;