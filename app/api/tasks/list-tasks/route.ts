// app/api/tasks/list-tasks/route.ts
import { getAllTasks } from '@/lib/taskService';
import { NextResponse } from 'next/server';

export async function GET() {
  const tasks = await getAllTasks();
  return NextResponse.json(tasks);
}
