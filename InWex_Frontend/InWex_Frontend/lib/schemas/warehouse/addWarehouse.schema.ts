import z from "zod";

export const warehouseSchema = z.object({
    name: z.string().min(1, "Warehouse name is required").max(100, "Name too long")
})

export type WarehouseValues = z.infer<typeof warehouseSchema>