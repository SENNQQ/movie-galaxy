import Pool from 'pg'

const pool = new Pool.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movie-galaxy',
    password: 'cawaq359268',
    port: 5432,
})

export default pool;