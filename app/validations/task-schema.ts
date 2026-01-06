import z from "zod";

enum priority {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
export const formSchema = z.object({
  title: z
    .string()
    .min(5, "Task title must be at least 5 characters.")
    .max(32, "Task title must be at most 32 characters."),
  description: z
    .string()
    .max(100, "Description must be at most 100 characters.")
    .optional(),
  completed: z.boolean().default(false).optional(),
  priority: z.enum(["EASY", "MEDIUM", "HIGH"]),
});

export type Task = z.infer<typeof formSchema>;