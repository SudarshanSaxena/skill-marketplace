import React from 'react'
import TaskTable from './components/TaskListTable';
import { getAllTasks } from '@/lib/taskService';

export default async function TaskList() {
  const tasks = await getAllTasks();
  console.log(tasks);
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Tasks</h1>
      <TaskTable tasks={tasks} itemsPerPage={5} />
    </main>
  )
}
