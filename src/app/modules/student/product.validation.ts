import { z } from "zod";

const zodVariantSchema = z.object({
    type: z.string(),
    value: z.string()
  });
  
  const zodInventorySchema = z.object({
    quantity: z.number(),
    inStock: z.boolean()
  });
  
  const zodProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    tags: z.array(z.string()),
    variants: z.array(zodVariantSchema),
    inventory: zodInventorySchema
  });

  export default zodProductSchema;