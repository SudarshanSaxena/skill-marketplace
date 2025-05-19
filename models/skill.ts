import { ECategory } from "./category";

export interface ISkill{
  id: string;
  category: ECategory;
  experience: string;
  natureOfWork: ENatureOfWork;
  hourlyRate: number;
}

export enum ENatureOfWork{
  ONSITE = "onsite",
  ONLINE = "online",
}