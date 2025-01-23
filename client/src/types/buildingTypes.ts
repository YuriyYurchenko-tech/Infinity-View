import type {z} from'zod'
import type { BuildingShema } from '../utils/validators';

export type BuildingType = z.infer<typeof BuildingShema >
