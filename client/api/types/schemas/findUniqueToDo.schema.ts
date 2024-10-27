import { z } from 'zod';
import { ToDoWhereUniqueInputObjectSchema } from './objects/ToDoWhereUniqueInput.schema';

export const ToDoFindUniqueSchema = z.object({
  where: ToDoWhereUniqueInputObjectSchema,
});
