"use client";
import { toTitleCase } from "@/lib/utils/string-utils";
import { ITask } from "@/models/task";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TaskTableProps {
  tasks: ITask[];
  itemsPerPage?: number;
}

export default function TaskTable({ tasks }: TaskTableProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const indexOfLast = currentPage * tasksPerPage;
  const indexOfFirst = indexOfLast - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow p-4">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Task Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Start Date</th>
            <th className="px-4 py-3">Hours</th>
            <th className="px-4 py-3">Rate</th>
            <th className="px-4 py-3">Progress</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr
              key={task.id}
              onClick={() => router.push(`/task/${task.id}`)}
              className="cursor-pointer border-b hover:bg-gray-100 transition"
            >
              <td className="px-4 py-2 font-medium text-gray-900">{task.taskName}</td>
              <td className="px-4 py-2 text-gray-700">{toTitleCase(task.category)}</td>
              <td className="px-4 py-2 text-gray-700">
                {new Date(task.expectedStartDate).toISOString().split("T")[0]}
              </td>
              <td className="px-4 py-2 text-gray-700">{task.expectedNumberOfWorkingHours}</td>
              <td className="px-4 py-2 text-gray-700">
                {task.hourlyRate} {task.rateCurrency}
              </td>
              <td className="px-4 py-2 text-gray-700">{task.progress}%</td>
              <td className="px-4 py-2 text-gray-700 capitalize">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "in_progress"
                      ? "bg-blue-100 text-blue-700"
                      : task.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status.replace("_", " ")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded text-sm font-medium ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
