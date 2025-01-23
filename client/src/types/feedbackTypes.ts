import type { z } from 'zod';
import type { FeedbackSchema } from '../utils/validators';

export type FeedbackTypeDb = z.infer<typeof FeedbackSchema>;
export type FeedbackTypeForm = Omit<FeedbackTypeDb, 'id' | 'status'>;
