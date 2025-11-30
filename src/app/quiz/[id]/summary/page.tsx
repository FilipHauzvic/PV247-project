'use client';

import { use, useEffect, useState } from 'react';
import '@/src/app/globals.css'
import { useRouter, useSearchParams } from 'next/navigation';
import { QuizSummary } from '@/src/components/quiz/QuizSummary';
import { QuizWithMovies, QuizResult } from '@/src/types/quiz.types';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: "Finished game summary",
};

export default function QuizSummaryPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = use(params);

  const [quiz, setQuiz] = useState<QuizWithMovies | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/quiz/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch quiz');
        }

        const data = await response.json();
        setQuiz(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  useEffect(() => {
    const resultsParam = searchParams.get('results');
    if (!resultsParam) return;

    try {
      const parsed = JSON.parse(resultsParam);
      if (Array.isArray(parsed)) {
        setResults(parsed);
      }
    } catch {
      console.warn("Invalid results JSON");
    }
  }, [searchParams]);

  const handleRestart = () => {
    router.push(`/quiz/${id}`);
  };

  const handleBackToList = () => {
    router.push('/quiz');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading quiz...</div>
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

  return (
    <QuizSummary
      quiz={quiz}
      results={results}
      onRestart={handleRestart}
      onBackToList={handleBackToList}
    />
  );
}
