import { Drash } from "https://deno.land/x/drash/mod.ts";

const getTaskList = async () => {
  const postgresDatabase = Drash.Members.postgresDatabase;
  await postgresDatabase.connect();
  return postgresDatabase.query({
    text: `SELECT * FROM tasks;`,
    args: [],
  });
};

const getTaskItem = async (data: { taskId: number }) => {
  const postgresDatabase = Drash.Members.postgresDatabase;
  await postgresDatabase.connect();
  return postgresDatabase.query({
    text: `SELECT * FROM tasks WHERE id = $1;`,
    args: [data.taskId],
  });
};

type DataType = {
    name: string,
    note: string,
}

const createTask = async (data: DataType) => {
  const postgresDatabase = Drash.Members.postgresDatabase;
  await postgresDatabase.connect();
  return postgresDatabase.query({
    text: `INSERT INTO tasks (name, note) VALUES ($1, $2);`,
    args: [data.name, data.note],
  });
};

const deleteTask = async (data: { taskId: number }) => {
  const postgresDatabase = Drash.Members.postgresDatabase;
  await postgresDatabase.connect();
  return postgresDatabase.query({
    text: `DELETE FROM tasks WHERE id = $1;`,
    args: [data.taskId],
  });
};

export {
    getTaskList,
    getTaskItem,
    createTask,
    deleteTask,
};
