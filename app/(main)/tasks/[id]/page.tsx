"use client";

import { useParams, useRouter } from "next/navigation";
import { fetchTaskById } from "@/lib/services/api";
import { Badge } from "@/components/ui/badge";
import Loading from "../../loading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { MessageSquare, Plus, X } from "lucide-react";
import { DeleteDialog } from "../components/delete-dialog";
import { useQuery } from "@tanstack/react-query";

export default function TaskDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => fetchTaskById(id),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {(error as Error).message}</div>;
  const status: Record<string, string> = {
    todo: "bg-secondary text-secondary-foreground",
    done: "bg-green-500 text-white border-none",
    "in-progress": "bg-orange-500 text-white border-none",
  };
  const commentCount = task.comments?.length || 0;
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-end my-4 space-x-4">
        <Button onClick={router.back} variant={"outline"}>
          <X />
          Cancel
        </Button>
        <Button>
          <Plus />
          New Subtask
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <div className="flex space-x-4 mt-2">
            <Badge className={`capitalize ${status[task.status] || ""}`}>
              {task.status}
            </Badge>
            <div className="text-gray-400 text-sm">{task.dueDate}</div>
          </div>
          <Label className="mt-2 font-semibold">Description</Label>
          <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Label className="font-semibold">SubTask</Label>
          <div className="grid gap-2 mt-2">
            {task.subtasks?.map((subtask: unknown) => (
              <div
                key={subtask.id}
                className="flex items-center space-x-3 p-2 rounded-md border bg-card"
              >
                <Checkbox
                  id={subtask.id}
                  checked={subtask.completed}
                  disabled
                />
                <label
                  htmlFor={subtask.id}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    subtask.completed
                      ? "line-through text-muted-foreground"
                      : ""
                  }`}
                >
                  {subtask.title}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <MessageSquare className="w-4 h-4" /> Comments ({commentCount})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-6">
            {task.comments?.map((comment: unknown) => (
              <div key={comment.id} className="flex items-start gap-3">
                <Avatar className="h-9 w-9 shrink-0 aspect-square rounded-full overflow-hidden border">
                  <AvatarFallback className="bg-purple-700 text-white font-semibold flex items-center justify-center rounded-full w-full h-full">
                    {comment.author.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold leading-none mb-1">
                    {comment.author}
                  </label>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t">
            <Textarea
              placeholder="Write a comment..."
              className="min-h-[80px] resize-none"
            />
            <div className="flex justify-end">
              <Button size="sm">Post Comment</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end my-4 space-x-4">
        <DeleteDialog />
      </div>
    </div>
  );
}
