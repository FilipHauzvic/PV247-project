"use client";

import LogoutButton from '@/src/components/auth/logout-button';
import { ProfileDataGrid } from '@/src/components/profile/profile-data-grid';
import { ProfileStatistics } from '@/src/components/profile/profile-statistics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const LoadingProfilePage = () => {
	return (
		<div className="mx-auto md:max-w-3/4 p-8 space-y-8">
			<div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white shadow-xl rounded-2xl border-gray-200 border">
				<AccountCircleIcon
					sx={{ fontSize: 60, color: '#444' }}
				/>

				<div className="flex flex-col">
					<h1 className="text-3xl font-semibold text-gray-900">
					-
					</h1>
					<p className="text-gray-500">-</p>
				</div>

				<div className="md:ml-auto">
					<LogoutButton />
				</div>
			</div>
			<div className="flex flex-col lg:flex-row gap-8">
				<ProfileStatistics />
				<ProfileDataGrid />
			</div>
		</div>
	);
};

export default LoadingProfilePage;
