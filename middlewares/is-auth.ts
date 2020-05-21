import { Drash } from "https://deno.land/x/drash/mod.ts";

export const isAuthMiddleware = async (
  request: any,
  response: Drash.Http.Response
) => {
  try {
    let [, token] = request.headers?.get("authorization")?.split(" ") || [];
    const data = await Drash.Members.GenerateJWT.verifyJwtFromHeader({ jwt: token });
    if (!data) {
      throw new Drash.Exceptions.HttpMiddlewareException(
        403,
        "Token is invalid"
      );
    }
    response.body = data;
  } catch (e) {
    throw new Drash.Exceptions.HttpMiddlewareException(500, e.message);
  }
};
