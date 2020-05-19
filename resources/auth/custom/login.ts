import { Drash } from "https://deno.land/x/drash/mod.ts";
import { checkUserExisted } from "../service/index.ts";

export default class LoginResource extends Drash.Http.Resource {
  static paths = ["/auth/login"];

  public async POST() {
    const username = this.request.getBodyParam("username");
    const password = this.request.getBodyParam("password");
    try {
      const userList = await checkUserExisted({ username });
      const rowList= userList.rows;
      const [rowItem] = rowList || [];
      const [id, usernameData, passwordData] = rowItem || [];
      if (!id) {
        throw new Drash.Exceptions.HttpException(401, 'Username or password is invalid!'); 
      }

      const isMatched = Drash.Members.HashPassword.comparePassword(password, passwordData);

      if (!isMatched) {
        throw new Drash.Exceptions.HttpException(
          401,
          "Username or password is invalid!"
        );
      }

      const token = Drash.Members.GenerateJWT.generateJwtFromUserInfo({ username });

      this.response.body = {
        username: usernameData,
        token,
      };
      return this.response;
    } catch (e) {
      console.log(e);
      throw new Drash.Exceptions.HttpException(500, e.message);
    }
  }
}
