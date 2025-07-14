export interface User {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  text: string;
  date: string;
  startTime: string;
  endTime: string;
  done: boolean;
  userId: number;
}
