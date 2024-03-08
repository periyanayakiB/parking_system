//db_connect.js
import pg from 'pg';
const {Pool} =pg;

export const pool=new Pool({
    user:'postgres',
    password:'postgres@123',
    host:'localhost',
    port:5432,
    database:'node_db'
});

