import { z } from 'zod';
import { ToDoCreateManyInputObjectSchema } from './objects/ToDoCreateManyInput.schema';

export const ToDoCreateManySchema = z.object({
  data: z.union([
    ToDoCreateManyInputObjectSchema,
    z.array(ToDoCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
