import z from "zod";

export const updateWarehouseSchema = z.object({
    name: z.string().min(1, "Warehouse name is required").max(100, "Name too long")
})

export type UpdateWarehouseValues = z.infer<typeof updateWarehouseSchema>