import React, { useState, useEffect, useRef } from 'react';
import { QuizPageProps, QuizResult } from '@/src/db/quiz.types';
import { QuizHeader } from './quiz-header';
import { EmojiDisplay } from './emoji-display';
import { GuessInput } from './guess-input';

export const QuizPlay: React.FC<QuizPageProps> = ({ quiz, onComplete, autocompleteComponent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [results, setResults] = useState<QuizResult[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [startTime] = useState(Date.now());
  const [totalSeconds, setTotalSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTotalSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime]);

  const currentMovie = quiz.movies[currentIndex];
  const maxEmojis = Array.from(currentMovie.emojis).length;
  const emojisToShow = Math.min(wrongAttempts + 1, maxEmojis);

  const normalizeString = (str: string) => {
    return str.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  };

  const handleGuess = () => {
    if (!guess.trim() || isProcessing) return;

    setIsProcessing(true);
    const isMatch = normalizeString(guess) === normalizeString(currentMovie.movieName);

    if (isMatch) {
      setMessage('🎉 Correct!');
      setIsCorrect(true);

      const newResult: QuizResult = {
        guessedMovieId: currentMovie.id,
        movieName: currentMovie.movieName,
        correct: true,
        attempts: wrongAttempts + 1
      };
      const newResults = [...results, newResult];
      setResults(newResults);

      setTimeout(() => {
        if (currentIndex < quiz.movies.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setGuess('');
          setWrongAttempts(0);
          setMessage('');
          setIsCorrect(false);
          setIsProcessing(false);
        } else {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          onComplete(newResults, totalSeconds);
        }
      }, 1500);
    } else {
      if (wrongAttempts < maxEmojis) {
        setWrongAttempts(wrongAttempts + 1);
        setMessage('❌ Try again!');
        setIsProcessing(false);
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage(`❌ Wrong! It was "${currentMovie.movieName}"`);

        const newResult: QuizResult = {
          guessedMovieId: currentMovie.id,
          movieName: currentMovie.movieName,
          correct: false,
          attempts: wrongAttempts + 1
        };
        const newResults = [...results, newResult];
        setResults(newResults);

        setTimeout(() => {
          if (currentIndex < quiz.movies.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setGuess('');
            setWrongAttempts(0);
            setMessage('');
            setIsProcessing(false);
          } else {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            onComplete(newResults, totalSeconds);
          }
        }, 2500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        <QuizHeader
          quiz={quiz}
          currentIndex={currentIndex}
          results={results}
        />

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">
              Question {currentIndex + 1} of {quiz.movies.length}
            </div>
            <div className="text-sm text-orange-600">
              Attempts: {wrongAttempts + 1} / {maxEmojis + 1}
            </div>
            <div className="text-sm text-blue-600">
              Time: {Math.floor(totalSeconds / 60)}:{(totalSeconds % 60).toString().padStart(2, '0')}
            </div>
          </div>

          <EmojiDisplay
            emojis={currentMovie.emojis}
            emojisToShow={emojisToShow}
          />

          <GuessInput
            guess={guess}
            onGuessChange={setGuess}
            onSubmit={handleGuess}
            isDisabled={isCorrect || isProcessing}
            message={message}
            isCorrect={isCorrect}
            autocompleteComponent={autocompleteComponent}
          />
        </div>
      </div>
    </div>
  );
};