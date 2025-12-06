"use client";

import { useMovieAutocomplete } from "./use-movie-autocomplete";
import { MovieSuggestionsDropdown } from "./movie-suggestions-dropdown";

interface MovieAutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const MovieAutocompleteInput = ({
  value,
  onChange,
  placeholder = "Enter movie name",
}: MovieAutocompleteInputProps) => {
  const {
    suggestions,
    loading,
    open,
    highlightedIndex,
    setHighlightedIndex,
    handleSelect,
    openSuggestions,
    closeSuggestions,
  } = useMovieAutocomplete(value);

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={openSuggestions}
        onBlur={closeSuggestions}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
      />
      {loading && (
        <div className="absolute right-3 top-4">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}
      <MovieSuggestionsDropdown
        suggestions={suggestions}
        open={open}
        highlightedIndex={highlightedIndex}
        onHighlight={setHighlightedIndex}
        onSelect={(movie) => handleSelect(movie, onChange)}
      />
    </div>
  );
};

export default MovieAutocompleteInput;