import { useState, useRef } from 'react';
import { QuizResult, QuizWithMovies } from '@/src/db/quiz.types';

interface UseQuizProgressionProps {
  quiz: QuizWithMovies;
  onComplete: (results: QuizResult[], totalSeconds: number) => void;
}

export function useQuizProgression({ quiz, onComplete }: UseQuizProgressionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  const startTimeRef = useRef(Date.now());

  const currentMovie = quiz.movies[currentIndex];
  const isLastQuestion = currentIndex === quiz.movies.length - 1;

  const getElapsedSeconds = () => 
    Math.floor((Date.now() - startTimeRef.current) / 1000);

  const moveToNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleCorrectAnswer = (attempts: number) => {
    const newResult: QuizResult = {
      guessedMovieId: currentMovie.id,
      movieName: currentMovie.movieName,
      correct: true,
      attempts,
    };
    
    const updatedResults = [...results, newResult];
    setResults(updatedResults);
    
    if (isLastQuestion) {
      onComplete(updatedResults, getElapsedSeconds());
    } else {
      moveToNextQuestion();
    }
  };

  const handleIncorrectAnswer = (attempts: number) => {
    const newResult: QuizResult = {
      guessedMovieId: currentMovie.id,
      movieName: currentMovie.movieName,
      correct: false,
      attempts,
    };
    
    const updatedResults = [...results, newResult];
    setResults(updatedResults);
    
    if (isLastQuestion) {
      onComplete(updatedResults, getElapsedSeconds());
    } else {
      moveToNextQuestion();
    }
  };

  return {
    currentIndex,
    currentMovie,
    results,
    isLastQuestion,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    startTime: startTimeRef.current,
  };
}