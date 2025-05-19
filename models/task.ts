import { ECategory } from "./category";

export interface ITask{
  id: string;
  category: ECategory;
  taskName: string;
  description: string;
  expectedStartDate: Date;
  expectedNumberOfWorkingHours: number;
  hourlyRate: number;
  rateCurrency: string;
  progress: number;
  status: ETaskStatus;
}

export enum ETaskStatus{
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}