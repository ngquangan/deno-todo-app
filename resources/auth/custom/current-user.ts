import { Drash } from "https://deno.land/x/drash/mod.ts";

export default class CurrentUserResource extends Drash.Http.Resource {
  static paths = ["/auth/user"];

  public GET() {
    return this.response;
  }
}
