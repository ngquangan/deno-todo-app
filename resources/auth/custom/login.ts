import { Drash } from "https://deno.land/x/drash/mod.ts";
import { checkUserExisted } from "../service/index.ts";

export default class LoginResource extends Drash.Http.Resource {
  static paths = ["/auth/login"];

  public async POST() {
    const username = this.request.getBodyParam("username");
    const password = this.request.getBodyParam("password");
    try {
      const userList = await checkUserExisted({ username });
      console.log(userList);
      return this.response;
    } catch (e) {
      console.log(e);
      throw new Drash.Exceptions.HttpException(500, e.message);
    }
  }
}
