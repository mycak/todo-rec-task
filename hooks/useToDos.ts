//Create a hook to handle all todos enpoints with tanstack query use

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllToDos,
  fetchToDo,
  createToDo,
  updateToDo,
  deleteToDo,
} from "@/api/todo";
import {
  ToDoCreateInputObjectSchema,
  ToDoUpdateInputObjectSchema,
} from "@/client/api/types/schemas";
import { z } from "zod";

export const useToDos = () => {
  const queryClient = useQueryClient();

  // Query for fetching all todos
  const todos = useQuery({
    queryKey: ["todos"],
    queryFn: fetchAllToDos,
  });

  // Query for fetching a single todo
  const getToDo = (id: number) =>
    useQuery({
      queryKey: ["todo", id],
      queryFn: () => fetchToDo(id),
    });

  // Mutation for creating a todo
  const createToDoMutation = useMutation<
    Awaited<ReturnType<typeof createToDo>>,
    Error,
    z.infer<typeof ToDoCreateInputObjectSchema>
  >({
    mutationFn: async (data) => {
      const result = await createToDo(data);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      return data;
    },
  });

  // Mutation for updating a todo
  const updateToDoMutation = useMutation({
    mutationFn: (
      updateData: z.infer<typeof ToDoUpdateInputObjectSchema> & { id: number }
    ) => updateToDo(updateData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todo", data.id] });
    },
  });

  // Mutation for deleting a todo
  const deleteToDoMutation = useMutation({
    mutationFn: async (id: number) => {
      const result = await deleteToDo(id);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos,
    getToDo,
    createToDo: createToDoMutation.mutateAsync,
    updateToDo: updateToDoMutation.mutateAsync,
    deleteToDo: deleteToDoMutation.mutateAsync,
    isLoading: todos.isLoading,
    isError: todos.isError,
    error: todos.error,
    refetch: todos.refetch,
  };
};
