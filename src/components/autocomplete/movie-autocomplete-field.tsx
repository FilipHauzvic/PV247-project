"use client";

import { useState } from "react";
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
  placeholder = "Enter movie name",
}: MovieAutocompleteFieldProps) => {
  const [inputValue, setInputValue] = useState("");

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
      render={({ field }) => (
        <div style={{ position: "relative" }}>
          <TextField
            {...field}
            fullWidth
            label="Movie Name"
            placeholder={placeholder}
            error={!!errors?.questions?.[selectedQuestionIndex]?.movieName}
            helperText={errors?.questions?.[selectedQuestionIndex]?.movieName?.message}
            sx={{ mt: 2, mb: 2 }}
            onChange={(e) => {
              field.onChange(e);
              setInputValue(e.target.value);
            }}
            onFocus={openSuggestions}
            onBlur={closeSuggestions}
            autoComplete="off"
          />
          <MovieSuggestionsDropdown
            suggestions={suggestions}
            open={open}
            highlightedIndex={highlightedIndex}
            onHighlight={setHighlightedIndex}
            onSelect={(movie) =>
              handleSelect(movie, (title) => {
                field.onChange(title);
                setInputValue(title);
              })
            }
          />
        </div>
      )}
    />
  );
};