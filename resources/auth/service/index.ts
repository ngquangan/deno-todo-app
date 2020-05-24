import { Drash } from 'https://deno.land/x/drash/mod.ts';

type DataTypes = {
  username: string;
  password?: string;
};

const registerUser = async (data: DataTypes) => {
  const postgresDatabase = Drash.Members.postgresDatabase;
  return postgresDatabase.query({
    text: `INSERT INTO accounts (username, password) VALUES ($1, $2);`,
    args: [data.username, data.password],
  });
};

const checkUserExisted = async (data: DataTypes) => {
  const postgresDatabase = Drash.Members.postgresDatabase;
  return postgresDatabase.query({
    text: `SELECT * FROM accounts WHERE username=$1;`,
    args: [data.username],
  });
};

export {
    registerUser,
    checkUserExisted
}
