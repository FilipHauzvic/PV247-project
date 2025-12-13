'use client';

import { use, useEffect, useState } from 'react';
import '@/src/app/globals.css'
import { useRouter, useSearchParams } from 'next/navigation';
import { QuizSummary } from '@/src/components/quiz/quiz-summary';
import { QuizWithMovies, QuizResult } from '@/src/db/quiz.types';

export default function QuizSummaryPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = use(params);

  const [quiz, setQuiz] = useState<QuizWithMovies | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [totalTime, setTotalTime] = useState<number | undefined>(undefined);
  const [bestTime, setBestTime] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const quizResponse = await fetch(`/api/quiz/${id}`);
        if (!quizResponse.ok) {
          throw new Error('Failed to fetch quiz');
        }
        const quizData = await quizResponse.json();
        setQuiz(quizData);

        const resultsParam = searchParams.get('results');
        const timeParam = searchParams.get('time');
        
        if (resultsParam) {
          try {
            const parsed = JSON.parse(resultsParam);
            if (Array.isArray(parsed)) {
              setResults(parsed);
              if (timeParam) {
                setTotalTime(parseInt(timeParam));
              }
              
              const gameResponse = await fetch(`/api/quiz/${id}/latest-game`);
              if (gameResponse.ok) {
                const gameData = await gameResponse.json();
                setBestTime(gameData.bestTime);
              }
              
              setLoading(false);
              return;
            }
          } catch {
            console.warn("Invalid results JSON in URL");
          }
        }

        const gameResponse = await fetch(`/api/quiz/${id}/latest-game`);
        if (gameResponse.ok) {
          const gameData = await gameResponse.json();
          setResults(gameData.results);
          setTotalTime(gameData.game.totalGuessingTimeInSeconds);
          setBestTime(gameData.bestTime);
        } else {
          setResults([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, searchParams]);

  const handleRestart = () => {
    router.push(`/quiz/${id}`);
  };

  const handleBackToList = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading results...</div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-xl text-red-500">
          {error || 'Quiz not found'}
        </div>
        <button
          onClick={handleBackToList}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Quiz List
        </button>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-xl">No results found for this quiz.</div>
        <button
          onClick={() => router.push(`/quiz/${id}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Take Quiz
        </button>
      </div>
    );
  }

  return (
    <QuizSummary
      quiz={quiz}
      results={results}
      onRestart={handleRestart}
      onBackToList={handleBackToList}
      totalTime={totalTime}
      bestTime={bestTime}
    />
  );
}