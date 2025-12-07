import type { Quiz, GuessedMovie } from '@/src/db/types';

export interface QuizWithMovies {
  id: number;
  quizName: string;
  createdBy: string;
  movies: MovieForQuiz[];
}

export interface MovieForQuiz {
  id: number;
  movieName: string;
  emojis: string[];
  orderInQuiz: number;
}

export interface QuizResult {
  guessedMovieId: number;
  movieName: string;
  correct: boolean;
  attempts: number;
}

export interface QuizPageProps {
  quiz: QuizWithMovies;
  onComplete: (results: QuizResult[], totalSeconds: number) => void;
  autocompleteComponent: React.ComponentType<{
    value: string;
    onChange: (value: string) => void;
  }>;
}

export interface QuizSummaryProps {
  quiz: QuizWithMovies;
  results: QuizResult[];
  onRestart: () => void;
  onBackToList: () => void;
}

export function convertToQuizWithMovies(
  quiz: Quiz,
  guessedMovies: GuessedMovie[]
): QuizWithMovies {
  return {
    id: quiz.id,
    quizName: quiz.quizName,
    createdBy: quiz.createdBy,
    movies: guessedMovies
      .filter(movie => movie.quizId === quiz.id)
      .sort((a, b) => a.orderInQuiz - b.orderInQuiz)
      .map(movie => ({
        id: movie.id,
        movieName: movie.movieName,
        emojis: JSON.parse(movie.emojis),
        orderInQuiz: movie.orderInQuiz,
      })),
  };
}

export function convertResultsForDB(
  results: QuizResult[],
  gameId: number
) {
  return results.map(result => ({
    gameId,
    guessedMovieId: result.guessedMovieId,
    falseGuessCount: result.attempts - 1,
  }));
}