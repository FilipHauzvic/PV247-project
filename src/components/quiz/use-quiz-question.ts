import { useState } from 'react';

type QuizState = 
  | { type: 'idle' }
  | { type: 'processing-correct' }
  | { type: 'processing-incorrect' }
  | { type: 'showing-answer' };

interface UseQuizQuestionProps {
  maxEmojis: number;
  correctAnswer: string;
  onCorrect: (attempts: number) => void;
  onIncorrect: (attempts: number) => void;
}

export function useQuizQuestion({
  maxEmojis,
  correctAnswer,
  onCorrect,
  onIncorrect,
}: UseQuizQuestionProps) {
  const [guess, setGuess] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [quizState, setQuizState] = useState<QuizState>({ type: 'idle' });

  const emojisToShow = Math.min(wrongAttempts + 1, maxEmojis);

  const normalizeString = (str: string) => 
    str.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

  const reset = () => {
    setGuess('');
    setWrongAttempts(0);
    setMessage('');
    setQuizState({ type: 'idle' });
  };

  const handleCorrectGuess = () => {
    setMessage('🎉 Correct!');
    setQuizState({ type: 'processing-correct' });
    const attempts = wrongAttempts + 1;
    setTimeout(() => {
      onCorrect(attempts);
      reset();
    }, 1500);
  };

  const handleIncorrectGuess = () => {
    const hasAttemptsLeft = wrongAttempts < maxEmojis;

    if (hasAttemptsLeft) {
      setWrongAttempts(prev => prev + 1);
      setMessage('❌ Try again!');
      setQuizState({ type: 'processing-incorrect' });
      setTimeout(() => {
        setMessage('');
        setQuizState({ type: 'idle' });
      }, 2000);
    } else {
      setMessage(`❌ Wrong! It was "${correctAnswer}"`);
      setQuizState({ type: 'showing-answer' });
      setTimeout(() => {
        onIncorrect(wrongAttempts + 1);
        reset();
      }, 2500);
    }
  };

  const submitGuess = () => {
    if (!guess.trim() || quizState.type !== 'idle') return;

    const isCorrect = normalizeString(guess) === normalizeString(correctAnswer);
    if (isCorrect) {
      handleCorrectGuess();
    } else {
      handleIncorrectGuess();
    }
  };

  return {
    guess,
    setGuess,
    wrongAttempts,
    message,
    quizState,
    emojisToShow,
    submitGuess,
    isDisabled: quizState.type !== 'idle',
    reset,
  };
}