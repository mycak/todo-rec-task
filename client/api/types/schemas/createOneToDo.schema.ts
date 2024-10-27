import { z } from 'zod';
import { ToDoCreateInputObjectSchema } from './objects/ToDoCreateInput.schema';
import { ToDoUncheckedCreateInputObjectSchema } from './objects/ToDoUncheckedCreateInput.schema';

export const ToDoCreateOneSchema = z.object({
  data: z.union([
    ToDoCreateInputObjectSchema,
    ToDoUncheckedCreateInputObjectSchema,
  ]),
});
