import { Box, Button } from "@mui/material";

interface QuizDetailFooterProps {
  isPending: boolean;
}

export const QuizDetailFooter = ({ isPending }: QuizDetailFooterProps) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    <Button variant="contained" size="large" type="submit" disabled={isPending}>
      {isPending ? "Creating..." : "Create Quiz"}
    </Button>
  </Box>
);
