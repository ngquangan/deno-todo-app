import { Drash } from 'https://deno.land/x/drash/mod.ts';

type RegisterDataTypes = {
  email: string;
  password: string;
};

const registerUser = async (data: RegisterDataTypes) => {
  const postgresDatabase = Drash.Members.postgresDatabase;

  await postgresDatabase.connect();
  return postgresDatabase.query({
    text: `INSERT INTO "public".user (email, password) VALUES ($1, $2);`,
    args: [data.email, data.password],
  });
};

export {
    registerUser,
}
