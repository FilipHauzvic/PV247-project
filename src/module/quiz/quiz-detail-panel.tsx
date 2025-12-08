"use client";

import { Box, Alert } from "@mui/material";
import { Control, FieldErrors } from "react-hook-form";
import type { QuizFormData } from "@/src/db/validation-schemas";
import { QuizDetailHeader } from "./quiz-detail-header";
import { QuizDetailQuestion } from "./quiz-detail-question";
import { QuizDetailFooter } from "./quiz-detail-footer";

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
      <QuizDetailHeader control={control} errors={errors} />

      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <QuizDetailQuestion
          control={control}
          errors={errors}
          selectedQuestionIndex={selectedQuestionIndex}
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

      <QuizDetailFooter isPending={isPending} />
    </Box>
  );
};
