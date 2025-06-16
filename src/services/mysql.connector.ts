import { createPool, Pool } from 'mysql2';
let pool: Pool | null = null;

const initializeMySqlConnector = () => {
  try {
    pool = createPool({
      connectionLimit:
        process.env.MY_SQL_DB_CONNECTION_LIMIT != undefined
          ? parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT)
          : undefined,
      port:
        process.env.MY_SQL_DB_PORT != undefined
          ? parseInt(process.env.MY_SQL_DB_PORT)
          : undefined,
      host: process.env.MY_SQL_DB_HOST,
      user: process.env.MY_SQL_DB_USER,
      password: process.env.MY_SQL_DB_PASSWORD,
      database: process.env.MY_SQL_DB_DATABASE,
    });

    console.debug('MySql Adapter Pool generated successfully');
    console.log('process.env.DB_DATABASE:', process.env.MY_SQL_DB_DATABASE);

    pool.getConnection((err, connection) => {
      if (err) {
        console.log('error mysql failed to connect', err.message);
        throw new Error('not able to connect to database');
      } else {
        console.log('connection made');
        connection.release();
      }
    });
  } catch (error) {
    console.error('[mysql.connector][initializeMySqlConnector][Error]: ', error);
    throw new Error('failed to initialize pool');
  }
};

export const execute = <T>(query: string, params: string[] = []): Promise<T> => {
  try {
    if (!pool) {
      initializeMySqlConnector();
    }

    return new Promise<T>((resolve, reject) => {
      pool!.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results as T);
      });
    });
  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('Failed to execute MySQL query');
  }
};

export default initializeMySqlConnector;
