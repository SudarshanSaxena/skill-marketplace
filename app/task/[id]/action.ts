'use server';

export async function fetchTaskDetails(id: string) {
  const response = await fetch("http://localhost:3000/api/tasks/task/" + id);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
}