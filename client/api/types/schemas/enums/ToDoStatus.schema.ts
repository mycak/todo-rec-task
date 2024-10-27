import { z } from 'zod';

export const ToDoStatusSchema = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']);
