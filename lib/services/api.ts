import { Task } from "@/app/(main)/component/data-table";
import { TaskFormValues } from "@/app/validations/task-schema";
import { da } from "zod/v4/locales";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:3001/tasks");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchTaskById = async (id: string) => {
  const response = await fetch(`http://localhost:3001/tasks/${id}`);
  if (!response.ok) throw new Error("Task not found");
  return response.json();
};

export const createTask = async (data: TaskFormValues) => {
  const response = await fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create task");
  return response.json();
};

export const updateTask = async ({
  id,
  data,
}: {
  id: string;
  data: TaskFormValues;
}) => {
  const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update task");
  return response.json();
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to delete task");
};
