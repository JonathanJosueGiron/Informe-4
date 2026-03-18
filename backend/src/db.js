import {createPool} from 'mysql2/promise'

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'JKSJ#02102219kll',
    port: 3306,
    database: 'dbpractica4'
})

