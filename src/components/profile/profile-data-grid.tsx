'use client';

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from '@mui/material/Paper';
import { HistoryGame } from "@/src/data/game";
import { formatTime } from "./profile-statistics";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", flex: 1 },
	{ field: "quizName", headerName: "Quiz Name", flex: 1 },
	{ field: "date", headerName: "Date", flex: 1 },
	{ field: "result", headerName: "Result", flex: 1 },
	{ field: "time", headerName: "Time", flex: 1 },
];

export const ProfileDataGrid = ({ data }: { data: HistoryGame[]}) => {
	const gridData = data.map((game) => ({
		id: game.id,
		quizName: game.quiz.quizName,
		date: game.date,
		result: `${game.movieGuesses.filter(guess => guess.falseGuessCount < guess.guessedMovie.emojis.length).length} / ${game.movieGuesses.length}`,
		time: formatTime(game.totalGuessingTimeInSeconds),
	}));

	return (
		<Paper style={{ width: "100%", display: "flex", flexDirection: "column" }}>
			<DataGrid
			rows={gridData}
			columns={columns}
			paginationMode="client"
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 20,
						page: 0,
					},
				},
			}}
			pageSizeOptions={[20]}
			autoHeight={false}
			disableAutosize
			disableRowSelectionOnClick
			disableColumnFilter
			disableColumnMenu
			disableColumnResize
			disableColumnSelector
			disableMultipleRowSelection
			sx={{ flex: 1 }}
			/>
		</Paper>
	);
};