
import { auth } from '@/src/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import { ProfileDataGrid } from "@/src/components/profile/profile-data-grid";
import { ProfileStatistics } from "@/src/components/profile/profile-statistics";
import GuesserTable from "@/src/components/shared/guesser-table";
import { getUserGameHistory } from "@/src/service/game-service";

const ProfilePage = async () => {
	const userId = 1; // TODO: get user after learning auth
	const data = await getUserGameHistory(userId);

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

	return (
	<div style={containerStyle}>

		<main style={mainStyle}>
			<h1 style={{ fontSize: "1.875rem", padding: "8px 0" }}>My Profile</h1>
			<ProfileDataGrid data={data} />
		</main>
		<ProfileStatistics data={data} />
	</div>
	);
};

export default ProfilePage;
