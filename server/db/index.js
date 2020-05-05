import { makeSqliteDb } from "../src/data-access";
import dotenv from "dotenv";
dotenv.config();
(async function setupDb() {
  console.log("Setting up database...");
  // database collection will automatically be created if it does not exist
  // indexes will only be added if they don't exist
  const db = await makeSqliteDb();
  
  db.close();
  console.log("Database setup complete...");
  process.exit();
})();
