import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

import { validateJwt } from "https://deno.land/x/djwt/validate.ts";

import { JWT_KEY } from "./../../config/env/index.ts";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

type UserDataType = {
  username: string;
};

type JwtDataType = {
    jwt: string
}

export default class GenerateJwt {
  generateJwtFromUserInfo = ({ username }: UserDataType) => {
    const payload: Payload = {
      username,
      iss: "joe",
      exp: setExpiration(new Date().getTime() + 60 * 60 * 1000),
    };
    return makeJwt({ header, payload, key: JWT_KEY });
  };

  verifyJwtFromHeader = async ({ jwt }: JwtDataType) => {
    return await validateJwt(jwt, JWT_KEY, { isThrowing: false });
  }
}
