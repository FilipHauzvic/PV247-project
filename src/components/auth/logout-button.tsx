'use client';

import { authClient } from '@/src/lib/auth-client';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const LogoutButton = () => {
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const handleLogOut = async () => {
		const response = await authClient.signOut();

		if (response?.data?.success) {
			router.push('/');
			return;
		}

		setError(response.error?.message ?? 'Logout failed');
	};

  return (
  	<div>
		<Button onClick={handleLogOut}>Logout</Button>
		{error && <p style={{ color: 'red' }}>{error}</p>}
	</div>
  );
}

export default LogoutButton;
