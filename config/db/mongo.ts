import { init, MongoClient } from "https://deno.land/x/mongo/mod.ts";

await init();

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");
console.log('Connected MongoDB');

const mongoDatabase = client.database("deno-todo-app");

export default mongoDatabase;