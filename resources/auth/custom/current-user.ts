import { Drash } from "https://deno.land/x/drash/mod.ts";
import { isAuthMiddleware } from "../../../middlewares/is-auth.ts";
@Drash.Http.Middleware({
  before_request: [isAuthMiddleware],
  after_request: [],
})
export default class CurrentUserResource extends Drash.Http.Resource {
  static paths = ["/auth/user"];

  public GET() {
    console.log(this.response.body);
    // this.response.body = {
    //   ...this.response.user,
    // };
    return this.response;
  }
}
