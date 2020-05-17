import { Drash } from "https://deno.land/x/drash/mod.ts";
import { registerUser } from "../service/index.ts";

export default class RegisterResource extends Drash.Http.Resource {
  static paths = ["/auth/register"];

  public async POST() {
    console.log('request', this.request);
    const email = this.request.getBodyParam("email");
    const password = this.request.getBodyParam("password");

    try {

      const hashedPassword = Drash.Members.HashPassword.hashPassword(password);

      const userCreated = await registerUser({
        email,
        password: hashedPassword,
      });
      
      if (!userCreated.done) {
        throw new Drash.Exceptions.HttpException(
          400,
          `Have not created yet!`
        ); 
      }

      this.response.body = 'Success';
      return this.response;
    } catch (e) {
      throw new Drash.Exceptions.HttpException(500, e.message);
    }
  }
}
