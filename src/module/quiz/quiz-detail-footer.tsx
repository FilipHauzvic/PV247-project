import PrimaryButton from "@/src/components/shared/primary-button";
import { Box } from "@mui/material";

interface QuizDetailFooterProps {
  isPending: boolean;
}

export const QuizDetailFooter = ({ isPending }: QuizDetailFooterProps) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    <PrimaryButton size="large" type="submit" disabled={isPending}>
      {isPending ? "Creating..." : "Create Quiz"}
    </PrimaryButton>
  </Box>
);
