import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ToDoCountOrderByAggregateInputObjectSchema } from './ToDoCountOrderByAggregateInput.schema';
import { ToDoAvgOrderByAggregateInputObjectSchema } from './ToDoAvgOrderByAggregateInput.schema';
import { ToDoMaxOrderByAggregateInputObjectSchema } from './ToDoMaxOrderByAggregateInput.schema';
import { ToDoMinOrderByAggregateInputObjectSchema } from './ToDoMinOrderByAggregateInput.schema';
import { ToDoSumOrderByAggregateInputObjectSchema } from './ToDoSumOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ToDoOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => ToDoCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => ToDoAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => ToDoMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => ToDoMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => ToDoSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const ToDoOrderByWithAggregationInputObjectSchema = Schema;
