import React from 'react';
import { QuizWithMovies, QuizResult } from '@/src/db/quiz.types';

interface QuizHeaderProps {
  quiz: QuizWithMovies;
  currentIndex: number;
  results: QuizResult[];
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({ 
  quiz, 
  currentIndex, 
  results 
}) => {
  const getSquareColor = (index: number) => {
    if (index < currentIndex) {
      return results[index]?.correct ? 'bg-green-500' : 'bg-red-500';
    } else if (index === currentIndex) {
      return 'bg-blue-500';
    } else {
      return 'bg-white border-2 border-gray-300';
    }
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{quiz.quizName}</h1>
      
      <div className="flex gap-2 flex-wrap">
        {quiz.movies.map((_, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-lg ${getSquareColor(index)} transition-all duration-300 shadow-md flex items-center justify-center text-white font-semibold`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};