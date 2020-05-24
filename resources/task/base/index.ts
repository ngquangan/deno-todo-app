import { Drash } from "https://deno.land/x/drash/mod.ts";

export default class TaskBaseResource extends Drash.Http.Resource {
  static paths = ["/tasks/:id"];

  public GET() {}

  public PATCH() {}

  public DELETE() {}
}
