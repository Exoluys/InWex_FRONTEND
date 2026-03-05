import { Category, Product } from "@/lib/types/types"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Tag, Barcode, TrendingUp, Box, Calendar } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useProduct } from "@/contexts/ProductContext"
import { useRouter } from "next/navigation"

const ProductPage = ({ product, category }: { product: Product, category: Category }) => {
    const profit = Number(product.selling_price) - Number(product.cost_price)
    const margin = ((profit / Number(product.selling_price)) * 100).toFixed(1)
    const { deleteProduct } = useProduct()
    const router = useRouter()

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">

            {/* Main Card */}
            <Card className="bg-transparent border-none">
                <CardContent className="p-6 space-y-6">

                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row gap-8">

                        {/* Image */}
                        <div className="w-64 h-64 rounded-xl bg-muted border flex items-center justify-center shrink-0 overflow-hidden">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={256}
                                    height={256}
                                    className="object-contain w-full h-full"
                                    priority
                                />
                            ) : (
                                <Package size={64} className="text-muted-foreground" />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-between flex-1 space-y-4">

                            <div className="space-y-2">
                                <Badge variant="secondary" className="w-fit">
                                    {category.name}
                                </Badge>
                                <h1 className="text-3xl font-semibold tracking-tight">
                                    {product.name}
                                </h1>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Meta Badges */}
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="flex items-center gap-1">
                                    <Tag size={12} /> SKU: {product.sku}
                                </Badge>

                                <Badge variant="outline" className="flex items-center gap-1">
                                    <Barcode size={12} /> {product.barcode}
                                </Badge>

                                <Badge variant="outline" className="flex items-center gap-1">
                                    <Box size={12} /> {product.unit_of_measure}
                                </Badge>
                            </div>

                            {/* Dates */}
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    Created: {new Date(product.created_at).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    Updated: {new Date(product.updated_at).toLocaleDateString()}
                                </div>
                            </div>

                        </div>
                    </div>

                    <Separator />

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        <Card className="p-4 bg-transparent">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Cost Price
                            </p>
                            <p className="text-2xl font-semibold mt-1">
                                ₹{product.cost_price}
                            </p>
                        </Card>

                        <Card className="p-4 bg-transparent">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Selling Price
                            </p>
                            <p className="text-2xl font-semibold mt-1">
                                ₹{product.selling_price}
                            </p>
                        </Card>

                        <Card className="p-4 bg-transparent">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Profit Margin
                            </p>
                            <p className="text-2xl font-semibold flex items-center gap-2 mt-1">
                                <TrendingUp size={18} className="text-green-500" />
                                {margin}%
                            </p>
                        </Card>

                        <Card className="p-4 bg-transparent">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Stock
                            </p>
                            <p
                                className={`text-2xl font-semibold mt-1 ${product.stock < 10
                                    ? "text-red-500"
                                    : "text-green-500"
                                    }`}
                            >
                                {product.stock ?? 1} units
                            </p>
                        </Card>

                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={() => deleteProduct(product.id)}
                            variant="destructive"
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() => router.push(`/dashboard/inventory/products/update/${product.id}`)}>
                            Update
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default ProductPage