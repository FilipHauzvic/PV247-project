"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/material";
import { quizFormSchema, type QuizFormData } from "@/src/db/validation-schemas";
import { QuestionListSidebar } from "./question-list-sidebar";
import { QuizDetailPanel } from "./quiz-detail-panel";

const createQuiz = async (data: QuizFormData) => {
  const quizData = {
    quizName: data.quizName,
    createdBy: 1, // Placeholder user ID
    questions: data.questions.map((q, idx) => ({
      movieName: q.movieName,
      emojis: q.emojis,
      orderInQuiz: idx,
    })),
  };

  const response = await fetch("/api/quiz/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create quiz");
  }

  return result;
};

const CreateQuizForm = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      quizName: "",
      questions: [{ id: uuidv4(), movieName: "", emojis: "", orderInQuiz: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const questions = watch("questions");

  const mutation = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      // Reset form on success
      reset({
        quizName: "",
        questions: [
          { id: uuidv4(), movieName: "", emojis: "", orderInQuiz: 0 },
        ],
      });
      setSelectedQuestionIndex(0);
    },
  });

  const handleAddQuestion = async () => {
    // Validate current question before adding new one
    const isValid = await trigger(`questions.${selectedQuestionIndex}`);
    if (!isValid) {
      return;
    }

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
