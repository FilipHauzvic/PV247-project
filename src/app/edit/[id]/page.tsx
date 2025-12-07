import { auth } from "@/src/auth";
import CreateQuizForm from "@/src/module/quiz/create-form";
import { Box } from "@mui/material";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { db } from "@/src";
import { guessedMovies, quizzes } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { QuizFormData } from "@/src/db/validation-schemas";
import { v4 as uuidv4 } from "uuid";

export const metadata: Metadata = {
	title: "Edit quiz",
};

const EditQuizPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;
  const quiz = await db.query.quizzes.findFirst({
	where: eq(quizzes.id, id),
  });
  const questions = quiz === undefined ? [] : await db.query.guessedMovies.findMany({
    where: eq(guessedMovies.quizId, quiz.id),
    orderBy: guessedMovies.orderInQuiz,
  });
  const data: (QuizFormData & { id: number }) | undefined = quiz === undefined ? undefined : {
	id: quiz?.id,
	quizName: quiz?.quizName,
	questions: questions.map(question => {
		return {
			id: uuidv4(),
			movieName: question.movieName,
			emojis: question.emojis,
			orderInQuiz: question.orderInQuiz,
		};
	}),
  };

  return (
    <Box sx={{ height: "calc(100vh - 70px)", overflow: "hidden" }}>
      <CreateQuizForm initialData={data}/>
    </Box>
  );
};

export default EditQuizPage;
