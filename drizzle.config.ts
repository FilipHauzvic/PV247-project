import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: '.drizzle',
	schema: [
		'./src/db/schema.ts',
		'./auth-schema.ts',
	],
	dialect: 'turso',
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL ?? "libsql://pv247-project-db-emerakin.aws-eu-west-1.turso.io",
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
});