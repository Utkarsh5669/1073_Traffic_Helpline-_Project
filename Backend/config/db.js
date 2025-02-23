import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // Default PostgreSQL port
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("✅ PostgreSQL Connected Successfully!");
  } catch (error) {
    console.error("❌ Error Connecting to PostgreSQL:", error.message);
    process.exit(1);
  }
};

export default pool;
