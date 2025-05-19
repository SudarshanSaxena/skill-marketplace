'use client';
import { ECategory } from "@/models/category";
import { ETaskStatus, ITask } from "@/models/task";
import { useEffect, useState } from "react";
import { fetchTaskDetails } from "./action";
import { formatDate } from "@/lib/utils/date-utils";
import React from "react";



export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const usableParams = React.use(params)
  const [task, setTask] = useState<ITask | null>(null);
  const [editState, setEditState] = useState<Partial<ITask>>({});
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchTaskDetails(usableParams.id).then(setTask);
  }, [usableParams]);

  if (!task) return <div className="p-6">Loading...</div>;

  const handleChange = (key: keyof ITask, value: any) => {
    setEditState((prev: Partial<ITask>) => ({ ...prev, [key]: value }));
  };

  const toggleEdit = (key: keyof ITask) => {
    const stringKey = String(key);
    setIsEditing((prev) => ({ ...prev, [stringKey]: !prev[stringKey] }));
  };

  const saveChanges = () => {
    // send editState to backend (PATCH or PUT)
    setTask({ ...task, ...editState });
    setEditState({});
    setIsEditing({});
  };

  const hasChanges = Object.keys(editState).length > 0;

  const renderEditable = (key: keyof ITask, type = "text") => {
    if (isEditing[String(key)]) {
      if (key === "description") {
        return (
          <textarea
            value={editState[key] ?? (task as any)[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full p-2 border rounded"
          />
        );
      } else {
        return (
          <input
            type={type}
            value={editState[key] ?? (task as any)[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full p-2 border rounded"
          />
        );
      }
    } else {
      return (
        <p
          className="cursor-pointer hover:underline"
          onClick={() => toggleEdit(key)}
        >
          {key === "expectedStartDate"
            ? formatDate((editState[key] ?? task[key]).toString())
            : editState[key] ?? (task as any)[key]}
        </p>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {renderEditable("taskName")}
        </h1>
        {hasChanges && (
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow">
        <div>
          <h2 className="text-sm text-gray-500">Category</h2>
          {renderEditable("category")}
        </div>
        <div>
          <h2 className="text-sm text-gray-500">Expected Start Date</h2>
          {renderEditable("expectedStartDate", "date")}
        </div>
        <div>
          <h2 className="text-sm text-gray-500">Working Hours</h2>
          {renderEditable("expectedNumberOfWorkingHours", "number")}
        </div>
        <div>
          <h2 className="text-sm text-gray-500">Hourly Rate</h2>
          {renderEditable("hourlyRate", "number")}
        </div>
        <div>
          <h2 className="text-sm text-gray-500">Currency</h2>
          {renderEditable("rateCurrency")}
        </div>
        <div>
          <h2 className="text-sm text-gray-500">Progress (%)</h2>
          {renderEditable("progress", "number")}
        </div>
        <div>
          <h2 className="text-sm text-gray-500">Status</h2>
          {isEditing.status ? (
            <select
              value={editState.status ?? task.status}
              onChange={(e) =>
                handleChange("status", e.target.value as ETaskStatus)
              }
              className="w-full p-2 border rounded"
            >
              {Object.values(ETaskStatus).map((status) => (
                <option key={String(status)} value={String(status)}>
                  {String(status).replace("_", " ")}
                </option>
              ))}
            </select>
          ) : (
            <span
              className={`cursor-pointer px-2 py-1 rounded-full capitalize inline-block ${
                task.status === ETaskStatus.COMPLETED
                  ? "bg-green-100 text-green-700"
                  : task.status === ETaskStatus.IN_PROGRESS
                  ? "bg-blue-100 text-blue-700"
                  : task.status === ETaskStatus.CANCELLED
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
              onClick={() => toggleEdit("status")}
            >
              {(editState.status ?? task.status).replace("_", " ")}
            </span>
          )}
        </div>
        <div className="md:col-span-2">
          <h2 className="text-sm text-gray-500">Description</h2>
          {renderEditable("description")}
        </div>
      </div>
    </div>
  );
}
