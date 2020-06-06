import { Drash } from "https://deno.land/x/drash/mod.ts";
import { getTaskItem } from "../service/index.ts";

export default class TaskBaseResource extends Drash.Http.Resource {
  static paths = ["/tasks/:id"];

  public async GET() {
    try {
      let taskId = this.request.getPathParam("id");
      const taskListResult = await getTaskItem({ taskId });
      const rowList = taskListResult.rows || [];
      const [rowItem] = rowList || [];
      if (!rowItem) {
        throw new Drash.Exceptions.HttpException(404, `Not Found!`);
      }

      const [id, name, note, status] = rowItem;

      this.response.body = {
        id, name, note, status
      };
      return this.response;
    } catch (e) {
      console.log(e);
      throw new Drash.Exceptions.HttpException(500, e.message);
    }
  }

  public PATCH() {}

  public DELETE() {}
}
