import { Drash } from "https://deno.land/x/drash/mod.ts";

export default class LoginResource extends Drash.Http.Resource {
  static paths = ["/auth/login"];

  public POST() {
    return this.response;
  }
}
