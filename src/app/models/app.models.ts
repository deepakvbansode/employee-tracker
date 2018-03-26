import { IActivity } from './app.models';
export interface IUser {
  id ?: string,
  name : string,
  password : string,
  role : string,
  user_name : string
}

export interface IHistory {
  pc ?: Array<IActivity>,
  development ?: Array<IActivity>,
  testing ?: Array<IActivity>
}

export interface IActivity {
  employee_id : string,
  date : string
  start_time : string,
  end_time : string,
  percentage_completed : string,
  comment : string,
}

export interface ITask {
  id ?: string,
  name : string,
  description : string,
  client : string,
  priority : number,
  module_name : string,
  points : number,
  currentAssingedTo ?: string,
  currentTaskStatus : number,
  currentTaskPhase : number,
  history ?: IHistory
}

export enum TaskStatus {
  unAssigned = 1,
  assinged = 2,
  progress = 3,
  blocked = 4,
  completed = 5,
  pending = 6
}

export enum TaskPhases {
    pc = 11,
    development = 12,
    testing = 13,
    delivered = 14
}

export enum Priority {
    low = 0,
    medium = 1,
    high = 2,
    critical = 3
}

export interface IAddHistoryRequest {
  taskId : string,
  activity : IActivity
}
