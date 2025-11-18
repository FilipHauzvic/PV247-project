import GuesserTable from "@/src/components/shared/guesser-table";

const Page = () => (
	<div>
		<h1 className="text-3xl p-2">Movie emoji guesser main page</h1>
		<GuesserTable rowNames={["Your Guess", "Correct Guess"]} data={[["Mission Impossible", "Rambo"], ["Tomb Raider", "Rambo"], 
			["Game of Thrones", "Rambo"], ["Rambo", "Rambo"]]} ></GuesserTable>
	</div>
);

export default Page;
