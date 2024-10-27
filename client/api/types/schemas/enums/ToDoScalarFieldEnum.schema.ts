import { z } from 'zod';

export const ToDoScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'description',
  'status',
  'createdAt',
]);
