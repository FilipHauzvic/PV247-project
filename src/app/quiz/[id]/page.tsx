'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuizPlay } from '@/src/components/quiz/quiz-play';
import { QuizWithMovies, QuizResult } from '@/src/db/quiz.types';
import MovieAutocompleteInput from '@/src/components/autocomplete/movie-autocomplete-input';

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [quiz, setQuiz] = useState<QuizWithMovies | null>(null);
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

  const handleQuizComplete = async (results: QuizResult[], totalSeconds: number) => {
    try {
      const response = await fetch(`/api/quiz/${id}/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          results,
          totalGuessingTimeInSeconds: totalSeconds
        })
      });

      if (!response.ok) {
        console.error('Failed to save results');
      }
    } catch (error) {
      console.error('Error saving results:', error);
    }

    router.push(`/quiz/${id}/summary`);
  };

  const handleBackToList = () => {
    router.push('/');
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
    <QuizPlay 
      quiz={quiz} 
      onComplete={handleQuizComplete} 
      autocompleteComponent={MovieAutocompleteInput} 
    />
  );
}