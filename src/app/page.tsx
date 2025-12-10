"use client";

import { authClient } from '../lib/auth-client';
import { useState } from 'react';
import { CircularProgress } from "@mui/material";
import { useEffect } from 'react';
import { Quiz } from '../db/types';
import FilteredQuizzesList from '../components/quiz-list/filtered-quizzes-list';
import QuizListHeader from '../components/quiz-list/quiz-list-header';
import { useQuery } from '@tanstack/react-query';

const Page = () => {
	const session = authClient.useSession();

	const [quizzes, setQuizzes] = useState<Quiz[]>([]);
	const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
	const [sortedByMine, setSortedByMine] = useState<boolean | null>(null);
	const [searchText, setSearchText] = useState<string | null>(null);
	const [page, setPage] = useState(1);

	const { isPending, error } = useQuery({
		queryKey: ['quizzes'],
		queryFn: async () => {
			const response = await fetch('/api/quiz');

			if (!response.ok) {
				throw new Error('Failed to fetch quizzes');
			}

			const retrievedQuizzes = await response.json();
			setQuizzes(retrievedQuizzes);
			setFilteredQuizzes(retrievedQuizzes);
			return retrievedQuizzes;
		},
	})

	useEffect(() => {
		if (searchText === null && sortedByMine === null) {
			return;
		}
		const handler = setTimeout(async () => {
			setFilteredQuizzes(quizzes.filter((quiz) => (searchText === null || quiz.quizName
				.toLowerCase().includes(searchText.toLowerCase())) && (sortedByMine ? (session.data !== null && session.data.user !== null 
					&& quiz.createdBy === session.data.user.id) : true)));
			setPage(1);
		}, 300);
		return () => clearTimeout(handler);
	}, [searchText, sortedByMine, quizzes, session.data]);

	return (
		<div className="w-full h-full flex flex-col">
			<QuizListHeader setSortedByMine={setSortedByMine} sortedByMine={sortedByMine} setSearchText={setSearchText} />
			{error ? <div className="text-xl text-red-500 font-bold flex justify-center mt-50">
          		{error.message}
        	</div> : isPending ? (
				<div className="flex justify-center mt-50">
					<CircularProgress />
				</div>
			) : (
				<div className="flex justify-center">
					<FilteredQuizzesList filteredQuizzes={filteredQuizzes} quizzes={quizzes} setQuizzes={setQuizzes} 
						setFilteredQuizzes={setFilteredQuizzes} page={page} setPage={setPage} />
				</div>
			)}
		</div>
	)
};

export default Page;
