import React from 'react';
import { QuizPageProps } from '@/src/db/quiz.types';
import { QuizHeader } from './quiz-header';
import { EmojiDisplay } from './emoji-display';
import { GuessInput } from './guess-input';
import { TimerDisplay } from './quiz-timer';
import { useQuizProgression } from './use-quiz-progression';
import { useQuizQuestion } from './use-quiz-question';

export const QuizPlay: React.FC<QuizPageProps> = ({ 
  quiz, 
  onComplete, 
  autocompleteComponent 
}) => {
  const progression = useQuizProgression({ quiz, onComplete });
  
  const question = useQuizQuestion({
    maxEmojis: Array.from(progression.currentMovie.emojis).length,
    correctAnswer: progression.currentMovie.movieName,
    onCorrect: progression.handleCorrectAnswer,
    onIncorrect: progression.handleIncorrectAnswer,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <QuizHeader
          quiz={quiz}
          currentIndex={progression.currentIndex}
          results={progression.results}
        />

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">
              Question {progression.currentIndex + 1} of {quiz.movies.length}
            </div>
            <div className="text-sm text-orange-600">
              Attempts: {question.wrongAttempts + 1} / {Array.from(progression.currentMovie.emojis).length + 1}
            </div>
            <TimerDisplay startTime={progression.startTime} />
          </div>

          <EmojiDisplay
            emojis={progression.currentMovie.emojis}
            emojisToShow={question.emojisToShow}
          />

          <GuessInput
            guess={question.guess}
            onGuessChange={question.setGuess}
            onSubmit={question.submitGuess}
            isDisabled={question.isDisabled}
            message={question.message}
            isCorrect={question.quizState.type === 'processing-correct'}
            autocompleteComponent={autocompleteComponent}
          />
        </div>
      </div>
    </div>
  );
};