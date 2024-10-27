import { z } from 'zod';
import { ToDoOrderByWithRelationInputObjectSchema } from './objects/ToDoOrderByWithRelationInput.schema';
import { ToDoWhereInputObjectSchema } from './objects/ToDoWhereInput.schema';
import { ToDoWhereUniqueInputObjectSchema } from './objects/ToDoWhereUniqueInput.schema';
import { ToDoCountAggregateInputObjectSchema } from './objects/ToDoCountAggregateInput.schema';
import { ToDoMinAggregateInputObjectSchema } from './objects/ToDoMinAggregateInput.schema';
import { ToDoMaxAggregateInputObjectSchema } from './objects/ToDoMaxAggregateInput.schema';
import { ToDoAvgAggregateInputObjectSchema } from './objects/ToDoAvgAggregateInput.schema';
import { ToDoSumAggregateInputObjectSchema } from './objects/ToDoSumAggregateInput.schema';

export const ToDoAggregateSchema = z.object({
  orderBy: z
    .union([
      ToDoOrderByWithRelationInputObjectSchema,
      ToDoOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ToDoWhereInputObjectSchema.optional(),
  cursor: ToDoWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z
    .union([z.literal(true), ToDoCountAggregateInputObjectSchema])
    .optional(),
  _min: ToDoMinAggregateInputObjectSchema.optional(),
  _max: ToDoMaxAggregateInputObjectSchema.optional(),
  _avg: ToDoAvgAggregateInputObjectSchema.optional(),
  _sum: ToDoSumAggregateInputObjectSchema.optional(),
});
