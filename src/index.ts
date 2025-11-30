import 'dotenv/config';

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import * as schema from './db/schema';
import * as auth_schema from '../auth-schema';

const client = createClient({
	url: process.env.TURSO_DATABASE_URL ?? "libsql://pv247-project-db-emerakin.aws-eu-west-1.turso.io",
	authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(
	client,
	{ schema: {
		...schema,
		...auth_schema,
  	}},
);
