import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumToDoStatusFilterObjectSchema } from './EnumToDoStatusFilter.schema';
import { ToDoStatusSchema } from '../enums/ToDoStatus.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ToDoWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ToDoWhereInputObjectSchema),
        z.lazy(() => ToDoWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ToDoWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ToDoWhereInputObjectSchema),
        z.lazy(() => ToDoWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    title: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    description: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    status: z
      .union([
        z.lazy(() => EnumToDoStatusFilterObjectSchema),
        z.lazy(() => ToDoStatusSchema),
      ])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
  })
  .strict();

export const ToDoWhereInputObjectSchema = Schema;
