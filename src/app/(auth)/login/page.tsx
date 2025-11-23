import { Button, Input, InputLabel } from "@mui/material";
import Link from "next/link";

const LoginPage = () => {
	return (
		<form className="flex flex-col items-start justify-start gap-4">
			<h1 className="text-3xl">Login</h1>
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
			
			<Link href="/register" className="text-blue-500 hover:underline block">
				Don't have an account? Register here.
			</Link>
		</form>
	);
};

export default LoginPage;
