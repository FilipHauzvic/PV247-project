import { Quiz } from "@/src/db/types";
import { Pagination } from "@mui/material";
import QuizListItem from "./filtered-quzzes-list-item";

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

export default FilteredQuizzesList;
