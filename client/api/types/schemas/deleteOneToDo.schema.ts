import { z } from 'zod';
import { ToDoWhereUniqueInputObjectSchema } from './objects/ToDoWhereUniqueInput.schema';

export const ToDoDeleteOneSchema = z.object({
  where: ToDoWhereUniqueInputObjectSchema,
});
