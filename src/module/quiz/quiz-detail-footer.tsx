import { Box, Button } from "@mui/material";

interface QuizDetailFooterProps {
  isPending: boolean;
  isEdit: boolean;
}

export const QuizDetailFooter = ({ isPending, isEdit }: QuizDetailFooterProps) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    <Button variant="contained" size="large" type="submit" disabled={isPending}>
      {isPending ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Save changes" : "Create Quiz")}
    </Button>
  </Box>
);
