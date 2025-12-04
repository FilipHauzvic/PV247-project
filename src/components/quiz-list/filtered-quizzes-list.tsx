import { Quiz } from "@/src/db/types";
import { CircularProgress, Pagination } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/material";
import { authClient } from "@/src/lib/auth-client";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useRouter } from "next/navigation";
import { deleteQuiz } from "@/src/db/queries/quiz";

type FilteredQuizzesListProps = {
    filteredQuizzes: Quiz[];
    refetchQuizzes: boolean;
    setRefetchQuizzes: (refetchSwitch: boolean) => void;
};

const FilteredQuizzesList = (props: FilteredQuizzesListProps) => {
    const [page, setPage] = useState(1);

    return (
        <Box>
            <ul>
                {props.filteredQuizzes.slice((page - 1) * 20, props.filteredQuizzes.length < page * 20 ? props.filteredQuizzes.length : page * 20)
                 .map((quiz => (
                    <li key={quiz.id}>
                        <QuizListItem quiz={quiz} refetchQuizzes={props.refetchQuizzes} setRefetchQuizzes={props.setRefetchQuizzes} />
                    </li>
                )))}
            </ul>
            <Pagination count={props.filteredQuizzes.length % 20 === 0 ? props.filteredQuizzes.length / 20 : props.filteredQuizzes.length / 20 + 1}
                page={page} onChange={(_, val) => setPage(val)} />
        </Box>
    );
};

type QuizListItemProps = {
    quiz: Quiz;
    refetchQuizzes: boolean;
    setRefetchQuizzes: (refetchSwitch: boolean) => void;
};

const QuizListItem = (props: QuizListItemProps) => {
    const session = authClient.useSession();
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    return (
        <div className="flex flex-col">
            <h3>{props.quiz.quizName}</h3>
            <ul className="flex flex-row">
                <li>
                    <IconButton onClick={() => router.push(`/quiz/${props.quiz.id}`)} sx={{ p: 0 }}>
                        <PlayCircleIcon />
                    </IconButton>
                </li>
                {session.data !== null && session.data.user !== null && session.data.user.id === props.quiz.createdBy ? (
                    <>
                        {
                            // TODO: if we decide to add edit button...
                            // <li>
                            //     <IconButton onClick={() => router.push(`/edit/${quiz.id}`)} sx={{ p: 0 }}>
                            //         <EditSquareIcon />
                            //     </IconButton>
                            // </li>
                        }
                        <li>
                            <IconButton disabled={deleting} onClick={async () => {
                                setDeleting(true);
                                await deleteQuiz(props.quiz.id);
                                props.setRefetchQuizzes(!props.refetchQuizzes)
                                setDeleting(false);
                            }} sx={{ p: 0 }}>
                                {deleting ? <CircularProgress /> : <DeleteIcon />}
                            </IconButton>
                        </li>
                    </>
                ) : null}
            </ul>
        </div>
    );
}

export default FilteredQuizzesList;
