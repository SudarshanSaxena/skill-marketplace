// app/api/tasks/task/[id]/route.ts

import { getTaskById } from '@/lib/taskService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const task = await getTaskById(url.searchParams.get('id') as string);
  return NextResponse.json(task);
}
