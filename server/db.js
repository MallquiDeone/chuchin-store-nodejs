import { createPool } from "mysql2/promise";
import { 
    DB_HOST, DB_USER, DB_PORT, DB_DATABASE, DB_PASSWORD
} from "./config.js";

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    port: DB_PORT,
    database: DB_DATABASE,
    password: DB_PASSWORD
})