import { z } from 'zod';
import { ToDoStatusSchema } from '../enums/ToDoStatus.schema';
import { NestedEnumToDoStatusWithAggregatesFilterObjectSchema } from './NestedEnumToDoStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumToDoStatusFilterObjectSchema } from './NestedEnumToDoStatusFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumToDoStatusWithAggregatesFilter> = z
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
        z.lazy(() => NestedEnumToDoStatusWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumToDoStatusFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumToDoStatusFilterObjectSchema).optional(),
  })
  .strict();

export const EnumToDoStatusWithAggregatesFilterObjectSchema = Schema;
