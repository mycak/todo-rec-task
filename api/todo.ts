import {
  ToDoCreateInputObjectSchema,
  ToDoUpdateInputObjectSchema,
} from "@/client/api/types/schemas";
import { ToDoStatusSchema } from "./../client/api/types/schemas/enums/ToDoStatus.schema";
import axios from "axios";
import { z } from "zod";

const apiClient = axios.create({
  baseURL: "http://localhost:3005/api/toDo",
});

const ToDoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: ToDoStatusSchema,
  createdAt: z.date(),
});

type ToDo = z.infer<typeof ToDoSchema>;

export const fetchAllToDos = async (): Promise<ToDo[]> => {
  const { data } = await apiClient.get("/all");
  return data;
};

export const fetchToDo = async (id: number): Promise<ToDo> => {
  const { data } = await apiClient.get(`/${id}`);
  return data;
};

export const createToDo = async (
  toDo: z.infer<typeof ToDoCreateInputObjectSchema>
): Promise<ToDo> => {
  const { data } = await apiClient.post("/", toDo);
  return data;
};

export const updateToDo = async ({
  id,
  ...updateData
}: z.infer<typeof ToDoUpdateInputObjectSchema> & {
  id: number;
}): Promise<ToDo> => {
  const { data } = await apiClient.put(`/${id}`, updateData);
  return data;
};

export const deleteToDo = async (id: number): Promise<void> => {
  await apiClient.delete(`/${id}`);
};
