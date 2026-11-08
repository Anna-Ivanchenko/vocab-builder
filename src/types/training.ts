export type TaskLang = "en" | "ua";

export interface Task {
  _id: string;
  en: string;
  ua: string;
  task: TaskLang;
}

export interface TasksResponse {
  words: Task[];
}

export interface AnswerResult extends Task {
  isDone: boolean;
}