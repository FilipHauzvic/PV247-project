"use client";

import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import type { QuizFormData } from "@/src/db/validation-schemas";
import MovieAutocompleteInput from "@/src/components/movie-auto-complete";

interface QuizDetailPanelProps {
  control: Control<QuizFormData>;
  errors: FieldErrors<QuizFormData>;
  selectedQuestionIndex: number;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
}

export const QuizDetailPanel = ({
  control,
  errors,
  selectedQuestionIndex,
  onSubmit,
  isPending,
  isError,
  isSuccess,
  error,
}: QuizDetailPanelProps) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 3 }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Quiz
        </Typography>
        <Controller
          name="quizName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Quiz Name"
              placeholder="Enter quiz name"
              error={!!errors.quizName}
              helperText={errors.quizName?.message}
              sx={{ mt: 2 }}
            />
          )}
        />
      </Box>

      {/* Question Detail Section */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          Question #{selectedQuestionIndex + 1}
        </Typography>

        <MovieAutocompleteInput
          control={control}
          errors={errors}
          selectedQuestionIndex={selectedQuestionIndex}
        />

        <Controller
          name={`questions.${selectedQuestionIndex}.emojis`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Emojis"
              placeholder="Enter emojis representing the movie"
              error={!!errors.questions?.[selectedQuestionIndex]?.emojis}
              helperText={
                errors.questions?.[selectedQuestionIndex]?.emojis?.message
              }
              sx={{ mb: 2 }}
            />
          )}
        />
      </Box>

      {/* Error/Success Messages */}
      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error instanceof Error ? error.message : "Failed to create quiz"}
        </Alert>
      )}
      {isSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Quiz created successfully!
        </Alert>
      )}

      {/* Footer - Create Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Quiz"}
        </Button>
      </Box>
    </Box>
  );
};
