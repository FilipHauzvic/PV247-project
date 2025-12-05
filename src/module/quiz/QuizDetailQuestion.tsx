import { Box, Typography } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import EmojiInput from "./emoji-input";
import MovieAutocompleteInput from "@/src/components/movie-auto-complete";
import { MAX_EMOJI_LENGTH } from "@/src/utils/emoji";
import type { QuizFormData } from "@/src/db/validation-schemas";

interface QuizDetailQuestionProps {
  control: Control<QuizFormData>;
  errors: FieldErrors<QuizFormData>;
  selectedQuestionIndex: number;
}

export const QuizDetailQuestion = ({
  control,
  errors,
  selectedQuestionIndex,
}: QuizDetailQuestionProps) => (
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
        <EmojiInput
          value={field.value}
          onChange={field.onChange}
          maxEmojis={MAX_EMOJI_LENGTH}
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
);
