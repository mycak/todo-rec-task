import { z } from 'zod';
import { ToDoUpdateInputObjectSchema } from './objects/ToDoUpdateInput.schema';
import { ToDoUncheckedUpdateInputObjectSchema } from './objects/ToDoUncheckedUpdateInput.schema';
import { ToDoWhereUniqueInputObjectSchema } from './objects/ToDoWhereUniqueInput.schema';

export const ToDoUpdateOneSchema = z.object({
  data: z.union([
    ToDoUpdateInputObjectSchema,
    ToDoUncheckedUpdateInputObjectSchema,
  ]),
  where: ToDoWhereUniqueInputObjectSchema,
});
