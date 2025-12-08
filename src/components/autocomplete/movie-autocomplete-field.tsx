"use client";

import { useState, useEffect } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
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

export const MovieAutocompleteField = ({
  control,
  errors,
  selectedQuestionIndex,
  placeholder = "Search and select a movie",
}: MovieAutocompleteFieldProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  const {
    suggestions,
    open,
    highlightedIndex,
    setHighlightedIndex,
    handleSelect,
    openSuggestions,
    closeSuggestions,
  } = useMovieAutocomplete(inputValue);

  return (
    <Controller
      name={`questions.${selectedQuestionIndex}.movieName`}
      control={control}
      render={({ field }) => {
        // Sync input value with form field when switching questions
        useEffect(() => {
          setInputValue(field.value || "");
          setSelectedMovie(field.value || null);
        }, [field.value, selectedQuestionIndex]);

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
                errors?.questions?.[selectedQuestionIndex]?.movieName
                  ?.message ||
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
      }}
    />
  );
};
