'use client';

import { Loading } from "@/src/components/profile/loading";

export const LoadingLoginPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-sm flex flex-col items-center gap-6">
				<Loading />
			</div>
		</div>
	);
}

export default LoadingLoginPage;