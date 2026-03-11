"use client"

import UpdateProduct from "@/components/dashboard/inventory/products/UpdateProduct"
import Navbar from "@/components/dashboard/navbar/Navbar"
import { Card, CardContent } from "@/components/ui/card"
import { useProduct } from "@/contexts/ProductContext"
import { Loader2, Package } from "lucide-react"
import { use } from "react"

const Page = ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } = use(params)

    const { products, isLoading } = useProduct()
    const product = products.find(p => p.id === Number(id))

    if (isLoading) return (
        <div className="flex justify-center items-center py-24">
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

    if (!product) return (
        <div className="flex justify-center items-center py-24">
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

    return (
        <>
            <Navbar />
            <UpdateProduct product={product} />
        </>
    )
}

export default Page