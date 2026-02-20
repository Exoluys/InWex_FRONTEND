"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useProduct } from "@/contexts/ProductContext";
import { useEffect, useRef } from "react";
import { updateProductSchema, UpdateProductValues } from "@/lib/schemas/updateProduct.schema";
import { Product } from "@/lib/types";

const UpdateProduct = ({ product }: { product: Product }) => {
    const { updateProduct, categories } = useProduct()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const category = categories.find(c => c.id === Number(product?.category))

    const form = useForm<UpdateProductValues>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name: "",
            sku: "",
            category: "",
            unit_of_measure: "",
            barcode: undefined,
            cost_price: undefined,
            selling_price: undefined,
            description: "",
            image: undefined,
        },
    })

    useEffect(() => {
        if (product && categories.length > 0) {
            form.reset({
                name: product.name,
                sku: product.sku,
                category: String(category?.id),
                unit_of_measure: product.unit_of_measure,
                barcode: String(product.barcode),
                cost_price: String(product.cost_price),
                selling_price: String(product.selling_price),
                description: product.description,
                image: undefined,
            });
        }
    }, [product, categories, category, form]);

    const textFields: {
        name: keyof UpdateProductValues;
        type: string;
        placeholder: string;
    }[] = [
            { name: "name", type: "text", placeholder: "PRODUCT NAME *" },
            { name: "sku", type: "text", placeholder: "SKU *" },
            { name: "unit_of_measure", type: "text", placeholder: "UNIT OF MEASURE *" },
            { name: "barcode", type: "text", placeholder: "BARCODE *" },
            { name: "cost_price", type: "number", placeholder: "COST PRICE (INR) *" },
            { name: "selling_price", type: "number", placeholder: "SELLING PRICE (INR) *" },
        ];

    const isSubmitSuccessful = form.formState.isSubmitSuccessful;

    useEffect(() => {
        if (isSubmitSuccessful && fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [isSubmitSuccessful]);

    const onSubmit = async (data: UpdateProductValues) => {
        if (!product) return;
        await updateProduct(product.id, {
            ...data,
            status: product.status,
        });
        form.reset();
    }
    return (
        <div className="mx-auto max-w-4xl px-6 gap-20 w-full py-24">
            <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Update Product</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Edit the details below to update the product in the warehouse management system.
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 w-full max-w-sm mx-auto"
                >
                    {textFields.map(({ name, type, placeholder }) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type={type}
                                            placeholder={placeholder}
                                            autoComplete="off"
                                            className="w-full py-3 px-3 border-0 border-l-2 border-b-2 border-white/60 bg-transparent! rounded-none focus-visible:ring-0 placeholder:text-gray-400 placeholder:text-xs"
                                            {...field}
                                            value={
                                                typeof field.value === "number"
                                                    ? field.value
                                                    : typeof field.value === "string"
                                                        ? field.value
                                                        : ""
                                            }
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    {/* Category Select */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    key={field.value}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full py-3 px-3 border-0 border-l-2 border-b-2 border-white/60 bg-transparent! rounded-none focus:ring-0 text-xs text-gray-400">
                                            <SelectValue placeholder="CATEGORY *" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent position="popper" className="w-full">
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={String(cat.id)}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Image File Upload */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { onChange } }) => (
                            <FormItem>
                                <FormControl>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="w-full py-3 px-3 border-0 border-l-2 border-b-2 border-white/60 bg-transparent rounded-none text-xs text-gray-400 file:bg-transparent file:border-0 file:text-white file:text-xs file:cursor-pointer cursor-pointer"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) onChange(file)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <textarea
                                        placeholder="PRODUCT DESCRIPTION *"
                                        className="w-full min-h-30 py-3 px-3 border-0 border-l-2 border-b-2 border-white/60 bg-transparent! rounded-none resize-none focus:outline-none placeholder:text-gray-400 placeholder:text-xs"
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
                            {form.formState.isSubmitting ? "UPDATING..." : "UPDATE PRODUCT"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default UpdateProduct