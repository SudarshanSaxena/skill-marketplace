import { ITask } from "@/models/task";

export interface TaskTableProps {
  tasks: ITask[];
  itemsPerPage?: number;
}