'use server';

export async function fetchAllTasks() {
  const response = await fetch("http://localhost:3000/api/tasks/list-tasks")
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
}