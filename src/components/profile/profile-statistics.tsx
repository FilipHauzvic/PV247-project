import { HistoryGame } from "@/src/data/game";
import GuesserTable from "../shared/guesser-table";
import { formatTime, formatTimeAvg } from "@/src/lib/format-time";
import { getUserGameHistory } from "@/src/service/game-service";
import { Session, User } from "better-auth";

type SessionAndUser = {
	session: Session,
	user: User;
}

export const ProfileStatisticsWrapper = async ({ sessionPromise }: { sessionPromise: Promise<SessionAndUser | null>}) => {
	const session = await sessionPromise;
	const gameHistoryData = await getUserGameHistory(session?.user.id ?? "");

	return (
		<ProfileStatistics data={gameHistoryData} />
	)
};


export const ProfileStatistics = ({ data }: { data?: HistoryGame[] | undefined}) => {
	if (!data)
	{
		return (
			<aside className="w-full lg:w-120 p-6 bg-white shadow rounded-xl">
				<h2 className="text-2xl font-semibold mb-4">Game Statistics</h2>

				<GuesserTable rowNames={["Statistic", "Value"]} data={[]} />
			</aside>
		)
	}

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
		<aside className="w-full lg:w-120 p-6 bg-white shadow rounded-xl">
			<h2 className="text-2xl font-semibold mb-4">Game Statistics</h2>

			<GuesserTable rowNames={["Statistic", "Value"]} data={tableData} />
		</aside>
	  );
};
