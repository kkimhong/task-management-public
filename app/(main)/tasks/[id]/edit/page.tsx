"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { TaskFormValues, taskSchema } from "@/app/validations/task-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTaskById, updateTask } from "@/lib/services/api";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/(main)/loading";
import { toast } from "sonner";

export default function EditTaskPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: task, isLoading } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => fetchTaskById(id),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    values: task,
  });

  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.push("/tasks");
      toast.success("Task has been updated");
    },
  });

  const onUpdate = (data: TaskFormValues) => {
    mutation.mutate({
      id,
      data,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <main className="w-full p-4 md:p-6 bg-background">
      <form onSubmit={handleSubmit(onUpdate)}>
        <Card className="w-full border shadow-none md:border md:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between py-4 space-y-0 border-b mb-4">
            <CardTitle className="text-xl font-bold">Update Task</CardTitle>

            <div className="flex items-center gap-2">
              <Button
                onClick={router.back}
                variant="outline"
                size="sm"
                type="button"
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button type="submit" size="sm" disabled={mutation.isPending}>
                <Save className="w-4 h-4 mr-1" />
                {mutation.isPending ? "Saving..." : "Update Task"}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <FieldSet>
              <FieldGroup className="space-y-4">
                <Field>
                  <FieldLabel className="text-xs font-semibold text-muted-foreground">
                    TASK TITLE
                  </FieldLabel>
                  <Input
                    placeholder="What needs to be done?"
                    {...register("title")}
                  />
                  <FieldError>{errors.title?.message}</FieldError>
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4">
                  <Field>
                    <FieldLabel className="text-xs font-semibold text-muted-foreground">
                      PROJECT ID
                    </FieldLabel>
                    <Input
                      placeholder="Project-101"
                      {...register("projectId")}
                    />
                    <FieldError>{errors.projectId?.message}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel className="text-xs font-semibold text-muted-foreground">
                      DUE DATE
                    </FieldLabel>
                    <Input type="date" {...register("dueDate")} />
                    <FieldError>{errors.dueDate?.message}</FieldError>
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4">
                  <Controller
                    control={control}
                    name="priority"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel className="text-xs font-semibold text-muted-foreground">
                          PRIORITY
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />

                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel className="text-xs font-semibold text-muted-foreground">
                          STATUS
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                </div>

                <Field>
                  <FieldLabel className="text-xs font-semibold text-muted-foreground">
                    DESCRIPTION
                  </FieldLabel>
                  <Textarea
                    placeholder="Provide additional context..."
                    className="min-h-[120px] resize-none"
                    {...register("description")}
                  />
                  <FieldError>{errors.description?.message}</FieldError>
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
