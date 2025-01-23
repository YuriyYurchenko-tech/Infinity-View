import type {z} from 'zod';
import type {FloorTypeSchema} from '../utils/validators';

export type FloorTypeDb= z.infer<typeof FloorTypeSchema>;
