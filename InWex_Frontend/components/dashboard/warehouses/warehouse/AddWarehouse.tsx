"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useWarehouse } from "@/contexts/WarehouseContext"
import { warehouseSchema, WarehouseValues } from "@/lib/schemas/warehouse/addWarehouse.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const AddWarehouse = () => {
    const { addWarehouse } = useWarehouse()

    const form = useForm<WarehouseValues>({
        resolver: zodResolver(warehouseSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = async (data: WarehouseValues) => {
        await addWarehouse(data)
        form.reset()
    }

    return (
        <div className="mx-auto max-w-4xl px-6 gap-20 w-full py-24">
            <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Add New Warehouse</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Fill in the details below to register a new warehouse in the management system.
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
                            {form.formState.isSubmitting ? "ADDING..." : "ADD WAREHOUSE"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AddWarehouse