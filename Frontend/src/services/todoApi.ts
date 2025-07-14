import axios from "axios";
import { Todo } from "../components/Type";
const API = "http://localhost:3001/todos";

export const fetchTodos = () => axios.get<Todo[]>(API);

export const addTodo = (todo: Omit<Todo, "id">) => axios.post<Todo>(API, todo);

export const updateTodo = (id: number, data: Partial<Todo>) =>
  axios.put<Todo>(`${API}/${id}`, data);

export const deleteTodo = (id: number) => axios.delete(`${API}/${id}`);
