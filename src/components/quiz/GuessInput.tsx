import React from 'react';

interface GuessInputProps {
  guess: string;
  onGuessChange: (value: string) => void;
  onSubmit: () => void;
  isDisabled: boolean;
  message: string;
  isCorrect: boolean;
}

export const GuessInput: React.FC<GuessInputProps> = ({
  guess,
  onGuessChange,
  onSubmit,
  isDisabled,
  message,
  isCorrect,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isDisabled) {
      onSubmit();
    }
  };

  return (
    <>
      <div className="mb-4 h-14 flex items-center justify-center">
        {message && (
          <div className={`w-full p-4 rounded-lg text-center font-semibold ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guess the movie name:
          </label>
          <input
            type="text"
            value={guess}
            onChange={(e) => onGuessChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            placeholder="Enter your guess..."
            disabled={isDisabled}
          />
        </div>
        <button
          onClick={onSubmit}
          disabled={isDisabled || !guess.trim()}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          Submit Guess
        </button>
      </div>
    </>
  );
};