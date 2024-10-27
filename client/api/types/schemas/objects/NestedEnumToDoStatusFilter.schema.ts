import { z } from 'zod';
import { ToDoStatusSchema } from '../enums/ToDoStatus.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumToDoStatusFilter> = z
  .object({
    equals: z.lazy(() => ToDoStatusSchema).optional(),
    in: z
      .union([
        z.lazy(() => ToDoStatusSchema).array(),
        z.lazy(() => ToDoStatusSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => ToDoStatusSchema).array(),
        z.lazy(() => ToDoStatusSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => ToDoStatusSchema),
        z.lazy(() => NestedEnumToDoStatusFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const NestedEnumToDoStatusFilterObjectSchema = Schema;
