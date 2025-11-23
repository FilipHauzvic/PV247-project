import { HistoryGame } from "@/src/data/game";
import GuesserTable from "../shared/guesser-table";

type ProfileStatisticsProps = {
	data: HistoryGame[];
};

export const formatTime = (totalSeconds: number) => {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	return `${hours}h ${minutes}m ${seconds}s`;
}

export const formatTimeAvg = (totalSeconds: number) => {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = (totalSeconds % 60).toFixed(2);
	return `${hours}h ${minutes}m ${seconds}s`;
}

export const ProfileStatistics = (props: ProfileStatisticsProps) => {
	const data = props.data;
	const totalGames = data.length;
	const totalTime = data.reduce((sum, g) => sum + g.totalGuessingTimeInSeconds, 0);
	const avgTimePerGame = totalGames > 0 ? totalTime / totalGames : 0;
	const totalMovies = data.reduce((sum, g) => sum + g.movieGuesses.length, 0);
	const totalCorrectGuesses = data.reduce((sum, g) => sum + g.movieGuesses.filter(guess => guess.falseGuessCount === 0).length, 0);
	const totalFullyCorrectGames = data.filter(g => g.movieGuesses.every(guess => guess.falseGuessCount === 0)).length;
	const percentMoviesGuessed = totalMovies > 0 ? (totalCorrectGuesses / totalMovies) * 100 : 0;
	const avgGuessesPerMovie = totalMovies > 0
		? data.reduce((sum, g) => sum + g.movieGuesses.reduce((s, guess) => s + (guess.falseGuessCount + 1), 0), 0) / totalMovies
		: 0;
	const fastestTime = data.length > 0 ? Math.min(...data.map(g => g.totalGuessingTimeInSeconds)) : 0;
	const slowestTime = data.length > 0 ? Math.max(...data.map(g => g.totalGuessingTimeInSeconds)) : 0;

	const tableData = [
			["Total games played", totalGames.toString()],
			["Total time played", formatTime(totalTime)],
			["Average time per game", formatTimeAvg(avgTimePerGame)],
			["Total movies guessed", totalMovies.toString()],
			["Total correct guesses on movies", totalCorrectGuesses.toString()],
			["Total fully correct games", totalFullyCorrectGames.toString()],
			["Percent of movies guessed", percentMoviesGuessed.toFixed(2) + "%"],
			["Average hints per movie", avgGuessesPerMovie.toFixed(1)],
			["Fastest game time", formatTime(fastestTime)],
			["Slowest game time", formatTime(slowestTime)],
		];

	  return (
		<aside style={{ width: "25rem" }}>
			<h2 className="text-2xl pb-2">User Statistics</h2>
			<GuesserTable rowNames={["Statistic", "Value"]} data={tableData} />
		</aside>
	  );
};
