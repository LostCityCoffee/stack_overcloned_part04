import knex from "knex";

const db = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'Kevmysql406*',
    database: 'stackovercloned',
  },
});

export default db;