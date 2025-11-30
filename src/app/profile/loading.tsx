"use client";

import LogoutButton from '@/src/components/auth/logout-button';
import { ProfileBody } from '@/src/components/profile/profile-body';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const LoadingProfilePage = () => {
	return (
		<div className="mx-auto max-w-6xl p-8 space-y-8">
			<div className="flex items-center gap-4 p-4 bg-white shadow-xl rounded-2xl border-gray-200 border">
				<AccountCircleIcon
					sx={{ fontSize: 60, color: '#444' }}
				/>

				<div className="flex flex-col">
					<h1 className="text-3xl font-semibold text-gray-900">
					-
					</h1>
					<p className="text-gray-500">-</p>
				</div>

				<div className="ml-auto">
					<LogoutButton />
				</div>
			</div>
			<ProfileBody sessionPromise={Promise.resolve<null>(null)} />
		</div>
	);
};

export default LoadingProfilePage;
