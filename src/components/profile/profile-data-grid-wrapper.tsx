import { getUserGameHistory } from "@/src/db/queries/game";
import { ProfileDataGrid } from "./profile-data-grid";
import { Session, User } from "better-auth";

type SessionAndUser = {
	session: Session,
	user: User;
}

export const ProfileDataGridWrapper = async ({ sessionPromise }: { sessionPromise: Promise<SessionAndUser | null>}) => {
	const session = await sessionPromise;
	const gameHistoryData = await getUserGameHistory(session?.user.id ?? "");

	return (
		<ProfileDataGrid data={gameHistoryData} />
	)
};
