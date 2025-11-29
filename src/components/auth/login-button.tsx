'use client';

import { authClient } from '@/src/lib/auth-client';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export const LoginButton = () => {
	const router = useRouter();

	const handleLogin = async () => {
		const response = await authClient.signIn.social({
			provider: 'github',
			callbackURL: '/profile',
		});

		if (response.data?.url) {
			router.push(response.data.url);
		}
	};

  return <Button 
			color="inherit"
			sx={{
				backgroundColor: "black",
				color: "white",
				"&:hover": { backgroundColor: "#333" },
			}}
			className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
  			onClick={handleLogin}
			variant='contained'>
				Continue
		</Button>;
}

export default LoginButton;
