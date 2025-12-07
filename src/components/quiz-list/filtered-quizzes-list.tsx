"use client";

import { Quiz } from "@/src/db/types";
import { CircularProgress, Pagination } from "@mui/material";
import { useState } from "react";
import { authClient } from "@/src/lib/auth-client";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from "next/navigation";

type FilteredQuizzesListProps = {
    filteredQuizzes: Quiz[];
    quizzes: Quiz[];
    setQuizzes: (quizzes: Quiz[]) => void;
    setFilteredQuizzes: (filteredQuizzes: Quiz[]) => void;
    page: number;
    setPage: (page: number) => void;
};

const FilteredQuizzesList = (props: FilteredQuizzesListProps) => (
    <div className="flex flex-col p-6 lg:w-7/8">
        <div className="mt-2 mb-6 flex justify-center">
            <Pagination count={props.filteredQuizzes.length % 20 === 0 ? Math.floor(props.filteredQuizzes.length / 20) : Math.floor(props.filteredQuizzes.length / 20) + 1}
                page={props.page} onChange={(_, val) => props.setPage(val)} />
        </div>
        <ul className="flex flex-wrap">
            {props.filteredQuizzes.slice((props.page - 1) * 20, props.filteredQuizzes.length < props.page * 20 ? props.filteredQuizzes.length : props.page * 20)
                .map((quiz => (
                <li key={quiz.id} className="p-2.5">
                    <QuizListItem quiz={quiz} quizzes={props.quizzes} setQuizzes={props.setQuizzes} 
                        setFilteredQuizzes={props.setFilteredQuizzes} filteredQuizzes={props.filteredQuizzes} />
                </li>
            )))}
        </ul>
    </div>
);

type QuizListItemProps = {
    quiz: Quiz;
    filteredQuizzes: Quiz[];
    quizzes: Quiz[];
    setQuizzes: (quizzes: Quiz[]) => void;
    setFilteredQuizzes: (filteredQuizzes: Quiz[]) => void;
};

const QuizListItem = (props: QuizListItemProps) => {
    const session = authClient.useSession();
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);
    const [deletingError, setDeletingError] = useState<string | null>(null);

    return (
        <div className="flex flex-col bg-gray-200 outline-solid outline-2 rounded-2xl">
            <h3 className="text-2xl m-4 font-semibold flex flex-wrap">{props.quiz.quizName}</h3>
            <ul className="flex flex-row justify-between">
                <li className="ml-4 mt-3 mb-3 mr-2">
                    <IconButton onClick={() => router.push(`/quiz/${props.quiz.id}`)} sx={{ p: 0 }}>
                        <PlayCircleIcon sx={{ display: { xs: 'flex' }, fontSize: 45, color: 'black' }}/>
                    </IconButton>
                </li>
				{session.data !== null && session.data.user !== null && session.data.user.id === props.quiz.createdBy ? (
                    <>
                        <li className="ml-10 mt-3 mb-3">
							<IconButton onClick={() => router.push(`/edit/${props.quiz.id}`)} sx={{ p: 0 }}>
								<EditIcon sx={{ display: { xs: 'flex' }, fontSize: 45, color: 'black' }} />
							</IconButton>
						</li>
                    </>
                ) : null}
                {session.data !== null && session.data.user !== null && session.data.user.id === props.quiz.createdBy ? (
                    <>
                        <li className="mt-3 mb-3 mr-3">
                            {deletingError ? <div className="text-xl text-red-500 mt-2 mr-2 font-semibold"> {deletingError} </div> : (
                            <IconButton disabled={deleting} onClick={async () => {
                                try {
                                    setDeleting(true);
                                    const response = await fetch(`/api/quiz/${props.quiz.id}`, {method: 'DELETE'});
                                    if (!response.ok) {
                                        throw new Error('Failed to delete quiz');
                                    }
                                    props.setQuizzes(props.quizzes.filter((quiz) => quiz.id != props.quiz.id));
                                    props.setFilteredQuizzes(props.filteredQuizzes.filter((quiz) => quiz.id != props.quiz.id));
                                } catch (err) {
                                    setDeletingError(err instanceof Error ? err.message : 'An error occurred');
                                } finally {
                                    setDeleting(false);
                                }
                            }} sx={{ p: 0 }}>
                                {deleting ? <CircularProgress sx={{ display: { xs: 'flex' }, fontSize: 45, color: 'red' }} /> 
                                : <DeleteIcon sx={{ display: { xs: 'flex' }, fontSize: 45, color: 'red' }}/>}
                            </IconButton>)}
                        </li>
                    </>
                ) : null}
            </ul>
        </div>
    );
}

export default FilteredQuizzesList;
