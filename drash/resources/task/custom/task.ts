import { Drash } from "https://deno.land/x/drash/mod.ts";
import { getTaskList, createTask } from "../service/index.ts";

export default class TaskCustomResource extends Drash.Http.Resource {
  static paths = ["/tasks"];

  public async GET() {
    try {
      const taskListResult = await getTaskList();
      const rowList = taskListResult.rows || [];
      const data = rowList.map((rowItem: any) => {
        const [id, name, note, status] = rowItem;
        return {
          id,
          name,
          note,
          status,
        };
      });
      this.response.body = data;
      return this.response;
    } catch (e) {
      console.log(e);
      throw new Drash.Exceptions.HttpException(500, e.message);
    }
  }

  public async POST() {
    const name = this.request.getBodyParam("name");
    const note = this.request.getBodyParam("note");
    try {
      const taskCreated = await createTask({
        name,
        note,
      });
      if (!taskCreated.done) {
        throw new Drash.Exceptions.HttpException(400, `Have not created yet!`);
      }
      this.response.body = "Success";
      return this.response;
    } catch (e) {
      throw new Drash.Exceptions.HttpException(500, e.message);
    }
  }
}
