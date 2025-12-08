import { Box, Typography } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import EmojiInput from "./emoji-input";
import { MovieAutocompleteField } from "@/src/components/autocomplete/movie-autocomplete-field";
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
  <Box
    sx={{ flexGrow: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
  >
    <Typography variant="h5" gutterBottom>
      Question #{selectedQuestionIndex + 1}
    </Typography>
    <MovieAutocompleteField
      control={control}
      errors={errors}
      selectedQuestionIndex={selectedQuestionIndex}
    />
    <Box
      sx={{
        flexBasis: "40%",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Controller
        key={selectedQuestionIndex}
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
          />
        )}
      />
    </Box>
  </Box>
);
