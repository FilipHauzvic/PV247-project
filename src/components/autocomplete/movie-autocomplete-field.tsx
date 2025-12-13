"use client";

import { useState } from "react";
import { Controller, Control, FieldErrors, ControllerRenderProps } from "react-hook-form";
import { TextField } from "@mui/material";
import { useMovieAutocomplete } from "./use-movie-autocomplete";
import { MovieSuggestionsDropdown } from "./movie-suggestions-dropdown";
import type { QuizFormData } from "@/src/db/validation-schemas";

interface MovieAutocompleteFieldProps {
  control: Control<QuizFormData>;
  errors?: FieldErrors<QuizFormData>;
  selectedQuestionIndex: number;
  placeholder?: string;
}

interface MovieInputProps {
  field: ControllerRenderProps<QuizFormData, `questions.${number}.movieName`>;
  errors?: FieldErrors<QuizFormData>;
  selectedQuestionIndex: number;
  placeholder: string;
}

const MovieInput = ({ field, errors, selectedQuestionIndex, placeholder }: MovieInputProps) => {
  const [inputValue, setInputValue] = useState(field.value || "");
  const [selectedMovie, setSelectedMovie] = useState<string | null>(field.value || null);

  const {
    suggestions,
    open,
    highlightedIndex,
    setHighlightedIndex,
    handleSelect,
    openSuggestions,
    closeSuggestions,
  } = useMovieAutocomplete(inputValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // If user types something different from selected movie, clear the form value
    if (newValue !== selectedMovie) {
      field.onChange("");
      setSelectedMovie(null);
    }
  };

  const handleMovieSelect = (title: string) => {
    field.onChange(title);
    setInputValue(title);
    setSelectedMovie(title);
  };

  return (
    <div style={{ position: "relative" }}>
      <TextField
        value={inputValue}
        fullWidth
        label="Movie Name"
        placeholder={placeholder}
        error={!!errors?.questions?.[selectedQuestionIndex]?.movieName}
        helperText={
          errors?.questions?.[selectedQuestionIndex]?.movieName?.message ||
          (inputValue && !selectedMovie
            ? "Please select a movie from the suggestions"
            : "")
        }
        sx={{ mt: 2, mb: 2 }}
        onChange={handleInputChange}
        onFocus={openSuggestions}
        onBlur={closeSuggestions}
        autoComplete="off"
      />
      <MovieSuggestionsDropdown
        suggestions={suggestions}
        open={open}
        highlightedIndex={highlightedIndex}
        onHighlight={setHighlightedIndex}
        onSelect={(movie) => handleSelect(movie, handleMovieSelect)}
      />
    </div>
  );
};

export const MovieAutocompleteField = ({
  control,
  errors,
  selectedQuestionIndex,
  placeholder = "Search and select a movie",
}: MovieAutocompleteFieldProps) => {
  return (
    <Controller
      name={`questions.${selectedQuestionIndex}.movieName`}
      control={control}
      render={({ field }) => (
        <MovieInput
          key={selectedQuestionIndex}
          field={field}
          errors={errors}
          selectedQuestionIndex={selectedQuestionIndex}
          placeholder={placeholder}
        />
      )}
    />
  );
};