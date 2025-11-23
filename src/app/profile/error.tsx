"use client";

const ErrorProfilePage = ({ error }: { error: Error & { digest?: string } }) => {
	return (
		<div>
			<h1>The applicaiton ran into error.</h1>
			<p>{error.message ?? "Unknown error"}</p>
		</div>
	);
};

export default ErrorProfilePage;
