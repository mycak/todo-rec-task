import { z } from 'zod';
import { ToDoStatusSchema } from '../enums/ToDoStatus.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumToDoStatusFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => ToDoStatusSchema).optional(),
  })
  .strict();

export const EnumToDoStatusFieldUpdateOperationsInputObjectSchema = Schema;
