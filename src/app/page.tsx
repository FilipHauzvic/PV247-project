import Link from "next/link";

const Page = () => (
	<div>
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
					<div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-sm flex flex-col items-center gap-6">
						<h1 className="text-2xl font-bold text-gray-800 text-center">
							Movie Emoji Guesser
						</h1>
						<p className="text-center text-gray-600">
							Welcome to our fun movie guessing game. Solve the emoji riddle and figure out the encoded movie name.
							If you <Link href="/login" className="text-black hover:text-blue-500"><b>sign in using GitHub</b></Link>, you can even create custom quizes for yout friends!
						</p>
					</div>
				</div>
	</div>
);

export default Page;
