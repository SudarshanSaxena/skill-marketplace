import React from 'react'
import { fetchAllTasks } from './action';
import TaskTable from './components/TaskListTable';

export default async function TaskList() {
  const tasks = await fetchAllTasks();
  console.log(tasks);
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Tasks</h1>
      <TaskTable tasks={tasks} itemsPerPage={5} />
    </main>
  )
}
