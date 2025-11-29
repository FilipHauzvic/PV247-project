import { Suspense } from "react";
import { ProfileStatistics, ProfileStatisticsWrapper } from "./profile-statistics";
import { ProfileDataGrid } from "./profile-data-grid";
import { Session, User } from "better-auth";
import { ProfileDataGridWrapper } from "./profile-data-grid-wrapper";

type SessionAndUser = {
	session: Session,
	user: User;
}

export const ProfileBody = async ({ sessionPromise }: { sessionPromise: Promise<SessionAndUser | null>}) => {
	return (
		<div className="flex flex-col lg:flex-row gap-8">
			<Suspense fallback={<ProfileStatistics data={[]} />} >
				<ProfileStatisticsWrapper sessionPromise={sessionPromise} />
			</Suspense>
			<Suspense fallback={<ProfileDataGrid data={[]}/>} >
				<ProfileDataGridWrapper sessionPromise={sessionPromise} />
			</Suspense>
		</div>
	)
};
			