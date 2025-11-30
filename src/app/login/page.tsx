import { auth } from '@/src/auth';
import LoginButton from '@/src/components/auth/login-button';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: "Login",
};

export const LoginPage = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (session?.user) {
		redirect("/profile");
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-sm flex flex-col items-center gap-6">
				<h1 className="text-2xl font-bold text-gray-800 text-center">
					Sign in via GitHub
				</h1>
				<LoginButton />
			</div>
		</div>
	);
}

export default LoginPage;
