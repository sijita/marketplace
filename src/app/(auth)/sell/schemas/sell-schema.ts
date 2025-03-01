import { z } from 'zod';

const sellSchema = z.object({
  productName: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  condition: z.enum(['nuevo', 'usado']),
  price: z.number().positive().min(1000),
  stock: z.number().int().positive(),
  department: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  freeShipping: z.boolean(),
});

export default sellSchema;
