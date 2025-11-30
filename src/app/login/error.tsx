'use client';

export const ErrorLoginPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-sm flex flex-col items-center gap-6">
				<h1 className="text-2xl font-bold text-gray-800 text-center">
					Oops, the application ran into error.
				</h1>
			</div>
		</div>
	);
}

export default ErrorLoginPage;
