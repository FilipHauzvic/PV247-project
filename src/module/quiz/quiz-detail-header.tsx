import { Box, Typography, TextField } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import type { QuizFormData } from "@/src/db/validation-schemas";

interface QuizDetailHeaderProps {
  control: Control<QuizFormData>;
  errors: FieldErrors<QuizFormData>;
}

export const QuizDetailHeader = ({
  control,
  errors,
}: QuizDetailHeaderProps) => (
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
);
