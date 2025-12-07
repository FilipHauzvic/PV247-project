import React from 'react';

interface GuessInputProps {
  guess: string;
  onGuessChange: (value: string) => void;
  onSubmit: () => void;
  isDisabled: boolean;
  message: string;
  isCorrect: boolean;
  autocompleteComponent: React.ComponentType<{
    value: string;
    onChange: (value: string) => void;
  }>;
}

export const GuessInput: React.FC<GuessInputProps> = ({
  guess,
  onGuessChange,
  onSubmit,
  isDisabled,
  message,
  isCorrect,
  autocompleteComponent: AutocompleteComponent,
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
          <AutocompleteComponent value={guess} onChange={onGuessChange} />
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