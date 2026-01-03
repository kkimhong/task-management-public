"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Task, formSchema } from "@/app/validations/task-schema";

const FormComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Task>({
    resolver: zodResolver(formSchema),
  });

  console.log("error:", errors);

  return (
    <form
      className="flex flex-col gap-4 p-10"
      onSubmit={handleSubmit((data) => {
        console.log("submitted data:", data);
      })}>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <label htmlFor="title">Title:</label>
          <input
            {...register("title")}
            id="title"
            className="border border-gray-500 rounded"
          />
        </div>
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>

      <div className="flex gap-2">
        <label htmlFor="description">Description:</label>
        <textarea
          {...register("description")}
          id="description"
          className="border border-gray-500 rounded"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="priority">Priority</label>
        <select id="priority" {...register("priority")}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="flex gap-2">
        <label htmlFor="completed">Complete</label>
        <input type={"checkbox"} {...register("completed")} id="completed" />
      </div>
      <div className="flex gap-2 self-start">
        <button
          type="button"
          className="px-4 py-1 bg-gray-300 text-gray-800 rounded"
          onClick={() => reset()}>
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-1 bg-blue-500/80 text-white rounded hover:bg-blue-500 active:bg-blue-500">
          Create
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
