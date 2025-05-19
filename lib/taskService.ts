// lib/taskService.ts
import { createClient } from '@/lib/supabase/server';
import { ITask } from '@/models/task';

export async function getAllTasks(): Promise<ITask[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('tasks').select('*').range(0, 9);
  if (error) throw new Error(error.message);

  return data.map((task) => ({
    id: task.id,
    taskName: task.task_name,
    description: task.description,
    status: task.status,
    createdAt: task.created_at,
    updatedAt: task.updated_at,
    expectedStartDate: task.expected_start_date,
    expectedNumberOfWorkingHours: task.expected_number_of_working_hours,
    hourlyRate: task.hourly_rate,
    rateCurrency: task.rate_currency,
    progress: task.progress,
    category: task.category
  }));
}

export async function getTaskById(id: string): Promise<ITask | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

  if (!data) return null;

  return {
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
}
