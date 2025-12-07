import 'dotenv/config';
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from ".";
import * as schema from "./db/schema";
import * as auth_schema from "../auth-schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
		schema: {
			...schema,
			...auth_schema,
		},
    }),
	socialProviders: {
        github: {
            clientId: process.env.GITHUB_ID! as string,
            clientSecret: process.env.GITHUB_SECRET! as string,
        },
    },
    plugins: [],
    baseURL: process.env.APP_URL ?? "https://pv-247-project-eight.vercel.app",
});