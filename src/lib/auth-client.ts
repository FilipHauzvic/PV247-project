import 'dotenv/config';
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.APP_URL ?? "https://pv-247-project-eight.vercel.app",
    plugins: [
		
    ],
})