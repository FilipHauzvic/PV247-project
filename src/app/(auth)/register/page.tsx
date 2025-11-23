import { Button, Input, InputLabel } from "@mui/material";
import Link from "next/link";

const RegisterPage = () => {
	return (
		<form className="flex flex-col items-start justify-start gap-4">
			<h1 className="text-3xl">Register</h1>
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
			<InputLabel htmlFor="repeat-password">Repeat password</InputLabel>
				<Input
					id="repeat-password"
					name="repeat-password"
					type="password"
				/>
			<div>
				<Button type="submit" variant="contained" className="" >
					Register
				</Button>
			</div>
			
			<Link href="/login" className="text-blue-500 hover:underline block">
				Already have an account? Login here.
			</Link>
		</form>
	);
};

export default RegisterPage;
