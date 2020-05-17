import { Drash } from "https://deno.land/x/drash/mod.ts";

const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [],
});

await server.run({
  hostname: "0.0.0.0",
  port: 1447,
});

console.log("Server listening: http://0.0.0.0:1447");
