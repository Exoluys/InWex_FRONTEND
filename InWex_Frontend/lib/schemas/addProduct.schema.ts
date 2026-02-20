import { z } from "zod"

export const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    sku: z.string().min(1, "SKU is required"),
    description: z.string().min(1, "Description is required"),
    unit_of_measure: z.string().min(1, "Unit is required"),
    barcode: z.string().min(1, "Barcode is required"),
    cost_price: z.string().min(0, "Cost price must be positive"),
    selling_price: z.string().min(0, "Selling price must be positive"),
    image: z.instanceof(File, { message: "Image is required" }),
    category: z.string().min(1, "Category is required"),
})

export type ProductValues = z.infer<typeof productSchema>