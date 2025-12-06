import { auth } from '@/src/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutButton from '@/src/components/auth/logout-button';
import { ProfileBody } from '@/src/components/profile/profile-body';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
	title: "Profile",
};

const ProfilePage = async () => {
	const sessionPromise = auth.api.getSession({ headers: await headers() });
	const session = await sessionPromise;

	if (!session?.user) {
		redirect("/login");
	};

	return (
		<div className="mx-auto md:max-w-3/4 p-8 space-y-8">
			<div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white shadow-xl rounded-2xl border-gray-200 border">
				{session.user.image ? (
					<Image
					src={session.user.image}
					alt="profile-picture"
					className="w-16 h-16 rounded-full object-cover border"
					/>
				) : (
					<AccountCircleIcon
					sx={{ fontSize: 60, color: '#444' }}
					/>
				)}

				<div className="flex flex-col">
					<h1 className="text-3xl font-semibold text-gray-900">
					{session.user?.name}
					</h1>
					<p className="text-gray-500">{session.user.email}</p>
				</div>

				<div className="md:ml-auto">
					<LogoutButton />
				</div>
			</div>
			<ProfileBody sessionPromise={sessionPromise} />
		</div>
	);
};

export default ProfilePage;
