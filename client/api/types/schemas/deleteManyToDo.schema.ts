import { z } from 'zod';
import { ToDoWhereInputObjectSchema } from './objects/ToDoWhereInput.schema';

export const ToDoDeleteManySchema = z.object({
  where: ToDoWhereInputObjectSchema.optional(),
});
