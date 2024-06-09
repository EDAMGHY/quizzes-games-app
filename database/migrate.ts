import { migrate } from "drizzle-orm/neon-http/migrator";
import { database } from "@/database";
import "dotenv/config";

const main = async () => {
  try {
    await migrate(database, { migrationsFolder: "database" });
    console.log("Migration completed");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
};

main();
