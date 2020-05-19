import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

import { JWT_KEY } from "./../../config/env/index.ts";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

type UserDataTypes = {
  username: string;
};

export default class GenerateJwt {
  generateJwtFromUserInfo = ({ username }: UserDataTypes) => {
    const payload: Payload = {
      username,
      iss: "joe",
      exp: setExpiration(new Date().getTime() + 60000),
    };
    return makeJwt({ header, payload, key: JWT_KEY });
  };
}
