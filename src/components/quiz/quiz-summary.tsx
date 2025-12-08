import React from 'react';
import { QuizSummaryProps } from '@/src/db/quiz.types';
import { formatTime } from '@/src/lib/format-time';

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Trophy = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

export const QuizSummary: React.FC<QuizSummaryProps> = ({
  quiz,
  results,
  onRestart,
  onBackToList,
  totalTime,
  bestTime
}) => {
  const correctCount = results.filter(r => r.correct).length;
  const totalCount = results.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect Score! 🏆";
    if (percentage >= 80) return "Excellent Work! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Not Bad! 📈";
    return "Keep Practicing! 💪";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-6">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Quiz Complete!
            </h1>
            <h2 className="text-2xl text-gray-600">{quiz.quizName}</h2>
          </div>

          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">
              {correctCount} / {totalCount}
            </div>
            <div className="text-2xl text-gray-600 mb-4">
              {percentage}% Correct
            </div>
            <div className="text-xl font-semibold text-purple-600">
              {getPerformanceMessage()}
            </div>

            {totalTime !== undefined && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="bg-blue-50 px-6 py-3 rounded-lg border-2 border-blue-200">
                  <div className="text-sm text-gray-600">Time</div>
                  <div className="text-2xl font-bold text-blue-700">
                    {formatTime(totalTime)}
                  </div>
                </div>

                {bestTime !== undefined && bestTime !== totalTime && (
                  <div className="bg-green-50 px-6 py-3 rounded-lg border-2 border-green-200">
                    <div className="text-sm text-gray-600">Your Best Time</div>
                    <div className="text-2xl font-bold text-green-700">
                      {formatTime(bestTime)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={onRestart}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              🔄 Try Again
            </button>
            <button
              onClick={onBackToList}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              📋 Back to Quizzes
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Detailed Results
          </h3>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={`${result.guessedMovieId}-${index}`}
                className={`p-4 rounded-lg border-2 ${result.correct
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {result.correct ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <div>
                      <div className="font-semibold text-gray-800">
                        Question {index + 1}
                      </div>
                      <div className="text-sm text-gray-600">
                        {result.movieName}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {result.attempts} attempt{result.attempts !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};