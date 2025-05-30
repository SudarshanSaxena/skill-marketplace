// app/api/tasks/task/[id]/route.ts

import { createClient } from '@/lib/supabase/server';
import { ITask } from '@/models/task';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  // ✅ extract id from URL pathname
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // or use regex if needed

  if (!id) {
    return NextResponse.json({ error: 'Task ID not found in URL' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

  // ✅ In your query you're using `.single()`, so `data` is an object, not an array.
  const transformedData: ITask = {
    id: data.id,
    taskName: data.task_name,
    description: data.description,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    expectedStartDate: data.expected_start_date,
    expectedNumberOfWorkingHours: data.expected_number_of_working_hours,
    hourlyRate: data.hourly_rate,
    rateCurrency: data.rate_currency,
    progress: data.progress,
    category: data.category
  };

  return NextResponse.json(transformedData);
}


export async function POST(req: NextRequest) {
  console.log('req', req);
  const supabase = await createClient();

  // ✅ extract id from URL pathname
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // or use regex if needed

  if (!id) {
    return NextResponse.json({ error: 'Task ID not found in URL' }, { status: 400 });
  }

  const body = await req.json();
  console.log('body', body);
  const task = body as ITask;

  const { data, error } = await supabase
    .from('tasks')
    .update({
      task_name: task.taskName,
      description: task.description,
      status: task.status,
      expected_start_date: task.expectedStartDate,
      expected_number_of_working_hours: task.expectedNumberOfWorkingHours,
      hourly_rate: task.hourlyRate,
      rate_currency: task.rateCurrency,
      progress: task.progress,
      category: task.category
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw new Error(error.message);

  // ✅ In your query you're using `.single()`, so `data` is an object, not an array.
  const transformedData: ITask = {
    id: data.id,
    taskName: data.task_name,
    description: data.description,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    expectedStartDate: data.expected_start_date,
    expectedNumberOfWorkingHours: data.expected_number_of_working_hours,
    hourlyRate: data.hourly_rate,
    rateCurrency: data.rate_currency,
    progress: data.progress,
    category: data.category
  };

  return NextResponse.json(transformedData);
}