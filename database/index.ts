import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

import "dotenv/config";

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const database = drizzle(sql, {
  schema,
});
