import { auth } from '@/src/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import LogoutButton from '@/src/components/auth/logout-button';

export const ProfilePage = async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user) {
		redirect('/login', );
	}

	return (
		<div>
			<h1>Welcome {session.user.name}</h1>
			<LogoutButton />
		</div>
	);
}

export default ProfilePage;
