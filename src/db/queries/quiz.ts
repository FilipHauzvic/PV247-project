import { db } from "@/src/index";
import { quizzes, guessedMovies } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function getQuizWithMovies(quizId: number) {

  const quiz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, quizId),
  });

  if (!quiz) return null;

  const movies = await db
    .select()
    .from(guessedMovies)
    .where(eq(guessedMovies.quizId, quizId))
    .orderBy(guessedMovies.orderInQuiz);

  return {
    ...quiz,
    movies: movies.map((m) => ({
      id: m.id,
      movieName: m.movieName,
      emojis: m.emojis,
      orderInQuiz: m.orderInQuiz,
    })),
  };
}

export const retrieveAllQuizzes = async () => await db.query.quizzes.findMany({
  where: eq(quizzes.deleted, false),
});

export const deleteQuiz = async (quizId: number) => await db.update(quizzes).set({ deleted: true }).where(eq(quizzes.id, quizId));
