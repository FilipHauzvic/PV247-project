import { Button, Input, InputLabel } from "@mui/material";
import Link from "next/link";

const LoginPage = () => {
	return (
		<form className="flex flex-col items-start justify-start gap-4">
			<h1 className="text-3xl p-2">Login</h1>
			<InputLabel htmlFor="username">Username</InputLabel>
				<Input
					id="username"
					name="username"
				/>
			<InputLabel htmlFor="password">Password</InputLabel>
				<Input
					id="password"
					name="password"
					type="password"
				/>
			<div>
				<Button type="submit" variant="contained" className="" >
					Login
				</Button>
			</div>
			
			<Link href="/login" className="mt-4 text-blue-500 hover:underline block">
				Don't have an account? Register here.
			</Link>
		</form>
	);
};

export default LoginPage;
