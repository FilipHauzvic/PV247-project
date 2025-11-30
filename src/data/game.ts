export type HistoryMovieGuess = {
	falseGuessCount: number;
	guessedMovie: {
		movieName: string;
		emojis: string;
	};
};

export type HistoryGame = {
	id: number;
	totalGuessingTimeInSeconds: number;
	date: string;
	quiz: {
		quizName: string;
	};
	movieGuesses: HistoryMovieGuess[];
};