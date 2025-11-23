'use client';

import { use } from 'react';
import '@/src/app/globals.css'
import { useRouter, useSearchParams } from 'next/navigation';
import { QuizSummary } from '@/src/components/quiz/QuizSummary';
import { QuizWithMovies, QuizResult } from '@/src/types/quiz.types';

const MOCK_QUIZ: QuizWithMovies = {
  id: 1,
  quizName: "Classic Movies Quiz",
  createdBy: 1,
  movies: [
    { id: 1, movieName: "The Lion King", emojis: ["🦁", "👑", "🌅", "🎵", "🐗"], orderInQuiz: 0 },
    { id: 2, movieName: "Titanic", emojis: ["🚢", "❤️", "🧊", "💎", "🌊"], orderInQuiz: 1 },
    { id: 3, movieName: "Finding Nemo", emojis: ["🐠", "🔍", "🌊", "🦈", "🐢"], orderInQuiz: 2 },
    { id: 4, movieName: "The Matrix", emojis: ["💊", "🕶️", "💻", "🔫", "🤖"], orderInQuiz: 3 },
  ]
};

export default function QuizSummaryPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = use(params);

  const quiz = MOCK_QUIZ;

  const mockResults: QuizResult[] = [
    { guessedMovieId: 1, movieName: "The Lion King", correct: true, attempts: 2 },
    { guessedMovieId: 2, movieName: "Titanic", correct: false, attempts: 5 },
    { guessedMovieId: 3, movieName: "Finding Nemo", correct: true, attempts: 1 },
    { guessedMovieId: 4, movieName: "The Matrix", correct: true, attempts: 3 },
  ];

  const handleRestart = () => {
    router.push(`/quiz/${id}`);
  };

  const handleBackToList = () => {
    router.push('/quiz');
  };

  return (
    <QuizSummary
      quiz={quiz}
      results={mockResults}
      onRestart={handleRestart}
      onBackToList={handleBackToList}
    />
  );
}