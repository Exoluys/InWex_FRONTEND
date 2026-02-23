"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useWarehouse } from "@/contexts/WarehouseContext"
import { useEffect } from "react"
import { Warehouse } from "@/lib/types"
import { updateWarehouseSchema, UpdateWarehouseValues } from "@/lib/schemas/warehouse/updateWarehouse.schema"

const UpdateWarehouse = ({ warehouse }: { warehouse: Warehouse }) => {
    const { updateWarehouse } = useWarehouse()

    const form = useForm<UpdateWarehouseValues>({
        resolver: zodResolver(updateWarehouseSchema),
        defaultValues: {
            name: "",
        },
    })

    useEffect(() => {
        if (warehouse) {
            form.reset({
                name: warehouse.name,
            })
        }
    }, [warehouse, form])

    const onSubmit = async (data: UpdateWarehouseValues) => {
        await updateWarehouse(warehouse.id, data)
        form.reset()
    }

    return (
        <div className="mx-auto max-w-4xl px-6 gap-20 w-full py-24">
            <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Update Warehouse</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Edit the details below to update the warehouse in the management system.
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 w-full max-w-sm mx-auto"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="WAREHOUSE NAME *"
                                        autoComplete="off"
                                        className="w-full py-3 px-3 border-0 border-l-2 border-b-2 border-white/60 bg-transparent! rounded-none focus-visible:ring-0 placeholder:text-gray-400 placeholder:text-xs"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-center mt-4">
                        <Button
                            variant="ghost"
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="px-8 py-2 text-sm font-semibold border-0 border-l-2 border-r-2 border-white/60 rounded-none hover:bg-transparent! tracking-wider transition-colors cursor-pointer"
                        >
                            {form.formState.isSubmitting ? "UPDATING..." : "UPDATE WAREHOUSE"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default UpdateWarehouse