import { createClient } from '@/lib/supabase/server';
import { ITask } from '@/models/task';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('tasks').select('*').range(0,9);
  if (error) throw new Error(error.message);

  console.log("data",data);

  if(data.length){
    const transformedResponse = data.map((task) => {
      const transformedData: ITask = {
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
      };
      return transformedData;
    });
    return NextResponse.json(transformedResponse);
  }

}