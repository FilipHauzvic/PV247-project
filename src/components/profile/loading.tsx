import CircularProgress from "@mui/material/CircularProgress";

export const Loading = () => {
	return (
		<div className="flex justify-center items-center p-8">
			<CircularProgress />
		</div>
	);
};
