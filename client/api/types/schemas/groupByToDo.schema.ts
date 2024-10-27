import { z } from 'zod';
import { ToDoWhereInputObjectSchema } from './objects/ToDoWhereInput.schema';
import { ToDoOrderByWithAggregationInputObjectSchema } from './objects/ToDoOrderByWithAggregationInput.schema';
import { ToDoScalarWhereWithAggregatesInputObjectSchema } from './objects/ToDoScalarWhereWithAggregatesInput.schema';
import { ToDoScalarFieldEnumSchema } from './enums/ToDoScalarFieldEnum.schema';

export const ToDoGroupBySchema = z.object({
  where: ToDoWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ToDoOrderByWithAggregationInputObjectSchema,
      ToDoOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: ToDoScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ToDoScalarFieldEnumSchema),
});
