'use server';

import { ITask } from "@/models/task";

export async function fetchTaskDetails(id: string) {
  const response = await fetch("http://localhost:3000/api/tasks/task/" + id);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
}

export async function updateTask(id: string, task: ITask) {
  const response = await fetch("http://localhost:3000/api/tasks/task/"+id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...task,
    }),
  });

  console.log("response", response);

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  const data = await response.json();
  return data;
}