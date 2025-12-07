"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/material";
import { quizFormSchema, type QuizFormData } from "@/src/db/validation-schemas";
import { createQuizAction } from "@/src/actions/quiz-actions";
import { useRouter } from "next/navigation";
import { QuestionListSidebar } from "./question-list-sidebar";
import { QuizDetailPanel } from "./quiz-detail-panel";

const CreateQuizForm = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      quizName: "",
      questions: [{ id: uuidv4(), movieName: "", emojis: "", orderInQuiz: 0 }],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "questions",
  });

  const questions = watch("questions");

  const handleReorderQuestions = (oldIndex: number, newIndex: number) => {
    move(oldIndex, newIndex);
  };

  const mutation = useMutation({
    mutationFn: async (data: QuizFormData) => {
      const result = await createQuizAction(data);

      if (!result.success) {
        throw new Error(result.error || "Failed to create quiz");
      }

      return result;
    },
    onSuccess: () => {
      reset({
        quizName: "",
        questions: [
          { id: uuidv4(), movieName: "", emojis: "", orderInQuiz: 0 },
        ],
      });
      setSelectedQuestionIndex(0);
      router.push("/");
    },
  });

  const handleAddQuestion = async () => {
    append({
      id: uuidv4(),
      movieName: "",
      emojis: "",
      orderInQuiz: fields.length,
    });
    setSelectedQuestionIndex(fields.length);
  };

  const handleDeleteQuestion = (index: number) => {
    if (fields.length === 1) {
      return;
    }

    remove(index);

    // Adjust selected index if necessary
    if (selectedQuestionIndex >= fields.length - 1) {
      setSelectedQuestionIndex(Math.max(0, fields.length - 2));
    } else if (selectedQuestionIndex > index) {
      setSelectedQuestionIndex(selectedQuestionIndex - 1);
    }
  };

  const onSubmit = (data: QuizFormData) => {
    mutation.mutate(data);
  };

  return (
    <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <QuestionListSidebar
        questions={questions}
        selectedQuestionIndex={selectedQuestionIndex}
        onSelectQuestion={setSelectedQuestionIndex}
        onAddQuestion={handleAddQuestion}
        onDeleteQuestion={handleDeleteQuestion}
        onReorderQuestions={handleReorderQuestions}
        fieldIds={fields.map((f) => f.id)}
      />
      <QuizDetailPanel
        control={control}
        errors={errors}
        selectedQuestionIndex={selectedQuestionIndex}
        onSubmit={handleSubmit(onSubmit)}
        isPending={mutation.isPending}
        isError={mutation.isError}
        isSuccess={mutation.isSuccess}
        error={mutation.error}
      />
    </Box>
  );
};

export default CreateQuizForm;
