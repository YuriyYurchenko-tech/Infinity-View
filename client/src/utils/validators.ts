import { z } from 'zod';

export const BuildingShema = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string(),
  floorQuantity: z.number(),
});

export const AppartmentSchema = z.object({
  id: z.number(),
  square: z.number(),
  img: z.string(),
  floor: z.number(),
  roomsQuantity: z.number(),
  deadline: z.string(),
  price: z.number(),
  buildingId: z.number(),
  reservation: z.boolean(),
});

export const FeedbackSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  message: z.string(),
  status: z.boolean(),
});
export const FloorTypeSchema = z.object({
  id: z.number(),
  img: z.string(),
  img2: z.string(),
  floorDiapason: z.string(),
  building: z.string(),
});
