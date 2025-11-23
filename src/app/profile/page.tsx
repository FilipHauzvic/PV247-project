import { ProfileDataGrid } from "@/src/components/profile/profile-data-grid";
import { ProfileStatistics } from "@/src/components/profile/profile-statistics";
import { getUserGameHistory } from "@/src/service/game-service";

const ProfilePage = async () => {
	const userId = 1; // TODO: get user after learning auth
	const data = await getUserGameHistory(userId);

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
