const Pool=require("pg").Pool;

const pool=new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    database: process.env.DB_DATABASE,
    ssl:{
        rejectUnauthorized: false
    }
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle pg client', err);
});

module.exports=pool;