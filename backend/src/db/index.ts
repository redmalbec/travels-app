import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js';

//const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const pool = new Pool({
  host: 'host.docker.internal',
  port: 5432,
  user: 'web1',
  password: '1',
  database: 'Travels',
});

export const db = drizzle(pool, { schema });
