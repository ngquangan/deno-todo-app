import { Drash } from "https://deno.land/x/drash/mod.ts";
import AuthResource from './resources/auth/index.ts';
import TaskResource from "./resources/task/index.ts";

import ResponseOverrided from "./overrides/response.ts";
Drash.Http.Response = ResponseOverrided;

const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [...AuthResource, ...TaskResource],
});

await server.run({
  hostname: "0.0.0.0",
  port: 1447,
});

console.log("Server listening: http://0.0.0.0:1447");

import postgresDatabase from "./config/db/postgres.ts";
Drash.addMember("postgresDatabase", postgresDatabase);

import HashPassword from "./utils/helpers/hashPassword.ts";
Drash.addMember("HashPassword", new HashPassword());

import GenerateJwt from "./utils/helpers/generateJwt.ts";
Drash.addMember("GenerateJWT", new GenerateJwt());