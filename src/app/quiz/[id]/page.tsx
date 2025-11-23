'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizPlay } from '@/src/components/quiz/QuizPlay';
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

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [currentView, setCurrentView] = useState<'play' | 'summary'>('play');
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);

  const quiz = MOCK_QUIZ;

  const handleQuizComplete = (results: QuizResult[]) => {
    setQuizResults(results);
    setCurrentView('summary');
  };

  const handleRestart = () => {
    setQuizResults([]);
    setCurrentView('play');
  };

  const handleBackToList = () => {
    router.push('/quiz');
  };

  if (currentView === 'play') {
    return <QuizPlay quiz={quiz} onComplete={handleQuizComplete} />;
  }

  return (
    <QuizSummary
      quiz={quiz}
      results={quizResults}
      onRestart={handleRestart}
      onBackToList={handleBackToList}
    />
  );
}