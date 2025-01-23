import type {z} from 'zod';
import type {AppartmentSchema} from '../utils/validators';

export type AppartmentTypeDb= z.infer<typeof AppartmentSchema>;
export type AppartmentTypeForm = Omit<AppartmentTypeDb, 'id'>;
    