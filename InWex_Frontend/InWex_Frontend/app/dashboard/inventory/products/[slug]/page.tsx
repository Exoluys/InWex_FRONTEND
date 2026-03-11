"use client"

import ProductPage from "@/components/dashboard/inventory/products/ProductPage"
import Navbar from "@/components/dashboard/navbar/Navbar"
import { Card, CardContent } from "@/components/ui/card"
import { useProduct } from "@/contexts/ProductContext"
import { Loader2, Package } from "lucide-react"
import { use, useEffect } from "react"

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params)
    const { selectedProduct, categories, isLoading, fetchProductBySlug, fetchCategory } = useProduct()
    const category = categories.find(c => c.id === Number(selectedProduct?.category))

    useEffect(() => {
        fetchProductBySlug(true, slug)
        if (categories.length === 0) fetchCategory()
    }, [slug, categories.length, fetchCategory, fetchProductBySlug])

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-transparent w-full max-w-sm border-none">
                <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="bg-zinc-800 rounded-full p-3">
                        <Loader2 className="h-6 w-6 text-zinc-400 animate-spin" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-zinc-300 font-semibold text-lg">Loading Product</p>
                        <p className="text-zinc-500 text-sm">Please wait a moment...</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    if (!selectedProduct) return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-transparent w-full max-w-sm border-none">
                <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="bg-zinc-800 rounded-full p-3">
                        <Package className="h-6 w-6 text-zinc-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-zinc-300 font-semibold text-lg">Product Not Found</p>
                        <p className="text-zinc-500 text-sm">This product may have been deleted or doesn&#39;t exist.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    if (!category) return (
        <div className="flex justify-center items-center h-screen">
            <Card className="bg-transparent w-full max-w-sm border-none">
                <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                    <div className="bg-zinc-800 rounded-full p-3">
                        <Package className="h-6 w-6 text-zinc-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-zinc-300 font-semibold text-lg">Category Not Found</p>
                        <p className="text-zinc-500 text-sm">This product&#39;s category may have been deleted.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    return (
        <>
            <Navbar />
            <ProductPage product={selectedProduct} category={category} />
        </>
    )
}

export default Page