import { z } from 'zod';
import { ToDoOrderByWithRelationInputObjectSchema } from './objects/ToDoOrderByWithRelationInput.schema';
import { ToDoWhereInputObjectSchema } from './objects/ToDoWhereInput.schema';
import { ToDoWhereUniqueInputObjectSchema } from './objects/ToDoWhereUniqueInput.schema';
import { ToDoScalarFieldEnumSchema } from './enums/ToDoScalarFieldEnum.schema';

export const ToDoFindManySchema = z.object({
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
  distinct: z.array(ToDoScalarFieldEnumSchema).optional(),
});
