import { z } from 'zod';
import { ToDoStatusSchema } from '../enums/ToDoStatus.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ToDoUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string(),
    status: z.lazy(() => ToDoStatusSchema),
    createdAt: z.coerce.date().optional(),
  })
  .strict();

export const ToDoUncheckedCreateInputObjectSchema = Schema;
