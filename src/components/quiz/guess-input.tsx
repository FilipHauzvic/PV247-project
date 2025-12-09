import React from "react";
import PrimaryButton from "../shared/primary-button";

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
  return (
    <>
      <div className="mb-4 h-14 flex items-center justify-center">
        {message && (
          <div
            className={`w-full p-4 rounded-lg text-center font-semibold ${
              isCorrect
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
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
        <PrimaryButton
          onClick={onSubmit}
          disabled={isDisabled || !guess.trim()}
          fullWidth
        >
          Submit Guess
        </PrimaryButton>
      </div>
    </>
  );
};
