import { authClient } from '../lib/auth-client';
import { useState } from 'react';
import { Button, CircularProgress } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { Quiz } from '../db/types';
import { retrieveAllQuizzes } from '../db/queries/quiz';
import { Box } from '@mui/material';
import FilteredQuizzesList from '../components/quiz-list/filtered-quizzes-list';

const Page = () => {
	const session = authClient.useSession();
	const router = useRouter();

	const [quizzes, setQuizzes] = useState<Quiz[]>([]);
	const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
	const [sortedByMine, setSortedByMine] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [listLoading, setListLoading] = useState(false);
	const [refetchQuizzes, setRefetchQuizzes] = useState(false);

	useEffect(() => {
		const fetchQuizzes = async () => {
			const retrievedQuizzes = await retrieveAllQuizzes();
			setQuizzes(retrievedQuizzes);
			setFilteredQuizzes(retrievedQuizzes);
		};
		setListLoading(true);
		fetchQuizzes();
		setListLoading(false);

	}, [refetchQuizzes])

	useEffect(() => {
		if (searchText.length === 0) {
			return;
		}
		const handler = setTimeout(async () => {
			setFilteredQuizzes(quizzes.filter((quiz) => quiz.quizName
				.toLowerCase().includes(searchText.toLowerCase()) && (sortedByMine ? quiz.createdBy === session.data?.user?.id : true)));
		}, 300);
		return () => clearTimeout(handler);
	}, [searchText, sortedByMine]);

	return (
		<Box>
			<nav className="flex flex-row">
				<h2 className='justify-start'>Quizzes</h2>
				<ul className='justify-start'>
					<li>
						<Button variant={sortedByMine ? 'outlined' : 'contained'} onClick={() => setSortedByMine(false)}>Show all</Button>
					</li>
					{!session?.data?.user ? (
						<li>
							<Button variant={sortedByMine ? 'contained' : 'outlined'} onClick={() => setSortedByMine(true)}>Show mine</Button>
						</li>
					) : null}
					<li>
						<SearchIcon sx={{ display: { xs: 'flex' }, fontSize: 'inherit', color: 'black' }} />
						<TextField
							id="filled-search"
							label="Search quizzes"
							type="search"
							variant="filled"
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</li>
				</ul>
				<div className='justify-end'>
					<IconButton onClick={() => router.push("/create")} sx={{ p: 0 }}>
                		<AddIcon sx={{ display: { xs: 'flex' }, fontSize: 'inherit', color: 'green' }} />
              		</IconButton>
				</div>
			</nav>
			{listLoading ? (
				<CircularProgress />
			) : (
				<FilteredQuizzesList filteredQuizzes={filteredQuizzes} refetchQuizzes={refetchQuizzes} setRefetchQuizzes={setRefetchQuizzes} />
			)}
		</Box>
	)
};

export default Page;
