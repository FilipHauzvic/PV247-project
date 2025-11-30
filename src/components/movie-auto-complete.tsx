"use client";

import { useState, useEffect, useRef } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import {
  TextField,
  Paper,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { searchMoviesTMDB } from "@/src/actions/quiz-actions";
import type { QuizFormData } from "@/src/db/validation-schemas";

interface MovieAutocompleteInputProps {
  control: Control<QuizFormData>;
  errors: FieldErrors<QuizFormData>;
  selectedQuestionIndex: number;
}

const MovieAutocompleteInput = ({
  control,
  errors,
  selectedQuestionIndex,
}: MovieAutocompleteInputProps) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  const [skipMovieQuery, setSkipMovieQuery] = useState(false);

  useEffect(() => {
    // This flag is set when clicking on a suggestion
    // In that case, new search would make the autocomplete list show up again, which is unwanted
    if (skipMovieQuery) {
      setSkipMovieQuery(false);
      return;
    }

    if (inputValue.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const handler = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchMoviesTMDB(inputValue);
        setSuggestions(results);
        setOpen(true);
      } catch {
        setSuggestions([]);
        setOpen(false);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue]);

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
            placeholder="Enter movie name"
            error={!!errors.questions?.[selectedQuestionIndex]?.movieName}
            helperText={
              errors.questions?.[selectedQuestionIndex]?.movieName?.message
            }
            sx={{ mt: 2, mb: 2 }}
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
              setInputValue(e.target.value);
            }}
            onFocus={() => {
              if (suggestions.length > 0) setOpen(true);
            }}
            onBlur={() => {
              setTimeout(() => setOpen(false), 100);
            }}
            autoComplete="off"
          />
          {open && suggestions.length > 0 && (
            <Paper
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                maxHeight: 200,
                overflowY: "auto",
                zIndex: 10,
              }}
              elevation={3}
            >
              <List ref={listRef}>
                {suggestions.map((movie, idx) => (
                  <ListItem key={movie.id} disablePadding>
                    <ListItemButton
                      selected={highlightedIndex === idx}
                      onMouseDown={() => {
                        setSkipMovieQuery(true);
                        field.onChange(movie.title);
                        setInputValue(movie.title);
                        setOpen(false);
                      }}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                    >
                      <Typography>
                        {movie.title}
                        {movie.release_date
                          ? ` (${movie.release_date.slice(0, 4)})`
                          : ""}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </div>
      )}
    />
  );
};

export default MovieAutocompleteInput;
