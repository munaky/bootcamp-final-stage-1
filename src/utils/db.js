import { Pool } from "pg";

const pool = new Pool({
    host: 'localhost',
    database: 'stage_1_final',
    user: 'postgres',
    password: 'admin',
    port: 5432,
});

export default async function executeQuery(query){
    return await pool.query(query);
}