import { Client } from "https://deno.land/x/postgres/mod.ts";

const postgresDatabase = new Client({
  user: "postgres",
  password: "test",
  database: "deno-todo-app",
  hostname: "localhost",
  port: 5432,
});

// await postgresDatabase.connect();
console.log('Connected postgres DB');

export default postgresDatabase;
