import { z } from 'zod';
import { ToDoWhereUniqueInputObjectSchema } from './objects/ToDoWhereUniqueInput.schema';
import { ToDoCreateInputObjectSchema } from './objects/ToDoCreateInput.schema';
import { ToDoUncheckedCreateInputObjectSchema } from './objects/ToDoUncheckedCreateInput.schema';
import { ToDoUpdateInputObjectSchema } from './objects/ToDoUpdateInput.schema';
import { ToDoUncheckedUpdateInputObjectSchema } from './objects/ToDoUncheckedUpdateInput.schema';

export const ToDoUpsertSchema = z.object({
  where: ToDoWhereUniqueInputObjectSchema,
  create: z.union([
    ToDoCreateInputObjectSchema,
    ToDoUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ToDoUpdateInputObjectSchema,
    ToDoUncheckedUpdateInputObjectSchema,
  ]),
});
