import z from "zod"

export const updateProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    sku: z.string().min(1, "SKU is required"),
    description: z.string().min(1, "Description is required"),
    unit_of_measure: z.string().min(1, "Unit is required"),
    barcode: z.string().min(1, "Barcode is required"),
    cost_price: z.coerce.number().min(0, "Cost price must be positive"),
    selling_price: z.coerce.number().min(0, "Selling price must be positive"),
    image: z.instanceof(File).optional(),
    category: z.string().min(1, "Category is required"),
})

export type UpdateProductValues = z.infer<typeof updateProductSchema> 
