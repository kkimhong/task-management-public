import { Task } from "@/app/validations/task-schema";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:3001/tasks");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
