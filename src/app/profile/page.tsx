<<<<<<< HEAD

import { auth } from '@/src/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

=======
>>>>>>> 9bf3940219388c67144e0d5a293f6635766f9907
import { ProfileDataGrid } from "@/src/components/profile/profile-data-grid";
import { ProfileStatistics } from "@/src/components/profile/profile-statistics";
import { getUserGameHistory } from "@/src/service/game-service";

const ProfilePage = async () => {
	const userId = 1; // TODO: get user after learning auth
	const data = await getUserGameHistory(userId);

<<<<<<< HEAD
<<<<<<< HEAD
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		redirect('/login', );
	}

	const containerStyle: React.CSSProperties = {
		display: "flex",
		flexDirection: "row",
		gap: "16px", // equivalent to Tailwind gap-4
		padding: "16px", // Tailwind p-4
		width: "100%",
		boxSizing: "border-box",
	};

	const mainStyle: React.CSSProperties = {
		flex: 1, // grow to fill remaining space
		display: "flex",
		flexDirection: "column",
		gap: "16px",
	};

=======
>>>>>>> dce8e2a (feat: use tailwind styles for profile page)
=======
>>>>>>> 9bf3940219388c67144e0d5a293f6635766f9907
	return (
		<div className="flex flex-col w-full h-full p-4">
			<h1 className="text-3xl p-4">My Profile</h1>
			<div className="flex flex-row gap-8 w-full h-full px-4">
				<main className="flex-1 h-full">
					<h2 className="text-2xl pb-2">Game History</h2>
					<ProfileDataGrid data={data} />
				</main>
				<ProfileStatistics data={data} />
			</div>
		</div>
	);
};

export default ProfilePage;
