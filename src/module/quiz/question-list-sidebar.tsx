"use client";

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { Question } from "@/src/db/validation-schemas";

interface QuestionListSidebarProps {
  questions: Question[];
  selectedQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  onAddQuestion: () => void;
  onDeleteQuestion: (index: number) => void;
  fieldIds: string[];
}

export const QuestionListSidebar = ({
  questions,
  selectedQuestionIndex,
  onSelectQuestion,
  onAddQuestion,
  onDeleteQuestion,
  fieldIds,
}: QuestionListSidebarProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "25%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6">Questions</Typography>
      </Box>

      <List sx={{ flexGrow: 1, overflow: "auto", py: 0 }}>
        {fieldIds.map((fieldId, index) => (
          <ListItem
            key={fieldId}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDeleteQuestion(index)}
                disabled={fieldIds.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton
              selected={selectedQuestionIndex === index}
              onClick={() => onSelectQuestion(index)}
            >
              <ListItemText
                primary={`Question #${index + 1}`}
                secondary={questions[index]?.movieName || "Empty"}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onAddQuestion}
        >
          Add New Question
        </Button>
      </Box>
    </Paper>
  );
};
