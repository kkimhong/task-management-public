import { Task } from "@/app/(main)/data-table";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:3001/tasks");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchTaskById = async (id: string) => {
  const res = await fetch(`http://localhost:3001/tasks/${id}`);
  if (!res.ok) throw new Error("Task not found");
  return res.json();
};
