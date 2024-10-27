import { z } from 'zod';
import { ToDoUpdateManyMutationInputObjectSchema } from './objects/ToDoUpdateManyMutationInput.schema';
import { ToDoWhereInputObjectSchema } from './objects/ToDoWhereInput.schema';

export const ToDoUpdateManySchema = z.object({
  data: ToDoUpdateManyMutationInputObjectSchema,
  where: ToDoWhereInputObjectSchema.optional(),
});
