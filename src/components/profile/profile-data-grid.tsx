"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from '@mui/material/Paper';
import { HistoryGame } from "@/src/data/game";
import { formatTime } from "@/src/lib/format-time";
import { Loading } from "./loading";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", flex: 1 },
	{ field: "quizName", headerName: "Quiz Name", flex: 1 },
	{ field: "date", headerName: "Date", flex: 1 },
	{ field: "result", headerName: "Result", flex: 1 },
	{ field: "time", headerName: "Time", flex: 1 },
];

export const ProfileDataGrid = ({ data }: { data?: HistoryGame[] | undefined}) => {
	const gridData = data?.map((game) => ({
		id: game.id,
		quizName: game.quiz.quizName,
		date: game.date,
		result: `${game.movieGuesses.filter(guess => guess.falseGuessCount < guess.guessedMovie.emojis.length).length} / ${game.movieGuesses.length}`,
		time: formatTime(game.totalGuessingTimeInSeconds),
	}));

	return (
		<main className="flex-1 p-6 bg-white shadow-xl rounded-xl">
			<h2 className="text-2xl font-semibold mb-4">Game History</h2>
			{data === undefined && <Loading />}
			{data?.length === 0 && <p>Game history is empty.</p>}
			{data && data.length > 0 &&
				<Paper elevation={0} className="border rounded-xl overflow-hidden">
					<DataGrid
					rows={gridData ?? []}
					columns={columns}
					paginationMode="client"
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 20,
								page: 0,
							},
						},
						columns: {
							columnVisibilityModel: {
								id: false,
							}
						},
					}}
					pageSizeOptions={[20]}
					autoHeight={true}
					disableAutosize
					disableRowSelectionOnClick
					disableColumnFilter
					disableColumnMenu
					disableColumnResize
					disableColumnSelector
					disableMultipleRowSelection
					sx={{ flex: 1 }}
					/>
				</Paper>}
		</main>
	);
};