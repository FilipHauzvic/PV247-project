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
  Drawer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseIcon from "@mui/icons-material/Close";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Question } from "@/src/db/validation-schemas";

interface QuestionListSidebarProps {
  questions: Question[];
  selectedQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  onAddQuestion: () => void;
  onDeleteQuestion: (index: number) => void;
  onReorderQuestions: (oldIndex: number, newIndex: number) => void;
  fieldIds: string[];
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

interface SortableQuestionItemProps {
  fieldId: string;
  index: number;
  question: Question;
  isSelected: boolean;
  isOnlyQuestion: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

const SortableQuestionItem = ({
  fieldId,
  index,
  question,
  isSelected,
  isOnlyQuestion,
  onSelect,
  onDelete,
}: SortableQuestionItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: fieldId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      disablePadding
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={onDelete}
          disabled={isOnlyQuestion}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <Box
          {...attributes}
          {...listeners}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <DragIndicatorIcon sx={{ color: "text.secondary" }} />
        </Box>
        <ListItemButton
          selected={isSelected}
          onClick={onSelect}
          sx={{ flex: 1 }}
        >
          <ListItemText
            primary={`Question #${index + 1}`}
            secondary={question?.movieName || "Empty"}
          />
        </ListItemButton>
      </Box>
    </ListItem>
  );
};

export const QuestionListSidebar = ({
  questions,
  selectedQuestionIndex,
  onSelectQuestion,
  onAddQuestion,
  onDeleteQuestion,
  onReorderQuestions,
  fieldIds,
  open,
  onClose,
  isMobile,
}: QuestionListSidebarProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fieldIds.indexOf(active.id as string);
      const newIndex = fieldIds.indexOf(over.id as string);

      onReorderQuestions(oldIndex, newIndex);

      // Update selected index if needed
      if (selectedQuestionIndex === oldIndex) {
        onSelectQuestion(newIndex);
      } else if (selectedQuestionIndex === newIndex) {
        onSelectQuestion(oldIndex > newIndex ? newIndex + 1 : newIndex - 1);
      } else if (
        selectedQuestionIndex > Math.min(oldIndex, newIndex) &&
        selectedQuestionIndex < Math.max(oldIndex, newIndex)
      ) {
        onSelectQuestion(
          oldIndex < newIndex
            ? selectedQuestionIndex - 1
            : selectedQuestionIndex + 1
        );
      }
    }
  };

  const sidebarContent = (
    <>
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Questions</Typography>
        {isMobile && (
          <IconButton onClick={onClose} edge="end" aria-label="close sidebar">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fieldIds}
          strategy={verticalListSortingStrategy}
        >
          <List sx={{ flexGrow: 1, overflow: "auto", py: 0 }}>
            {fieldIds.map((fieldId, index) => (
              <SortableQuestionItem
                key={fieldId}
                fieldId={fieldId}
                index={index}
                question={questions[index]}
                isSelected={selectedQuestionIndex === index}
                isOnlyQuestion={fieldIds.length === 1}
                onSelect={() => onSelectQuestion(index)}
                onDelete={() => onDeleteQuestion(index)}
              />
            ))}
          </List>
        </SortableContext>
      </DndContext>

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
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: "85%",
            maxWidth: 360,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

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
      {sidebarContent}
    </Paper>
  );
};

export default QuestionListSidebar;
