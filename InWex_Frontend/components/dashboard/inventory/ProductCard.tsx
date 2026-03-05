import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"
import { Product } from "@/lib/types/types"
import { useRouter } from "next/navigation"

type ProductCardProps = {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter()

    return (
        <Card className="w-full rounded-xl overflow-hidden bg-[#1E1E1E] p-0 border-none">
            <div className="relative h-60 bg-zinc-200 flex items-center justify-center">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            <CardContent className="flex-1 px-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="bg-zinc-700 text-white px-3 py-1 rounded-md">
                        Code: {product.sku}
                    </span>
                    <span className="text-white text-lg font-semibold">
                        ₹{product.selling_price}
                    </span>
                </div>

                <CardTitle className="text-white text-2xl">
                    {product.name}
                </CardTitle>

                <CardDescription className="text-zinc-400 line-clamp-2">
                    {product.description || "No description available"}
                </CardDescription>

                <CardDescription className="text-zinc-400">
                    In hand: {product.stock || 1} items
                </CardDescription>
            </CardContent>

            <CardFooter className="mt-auto px-4 pb-6 flex justify-end gap-2">
                <Button
                    onClick={() => (router.push(`/dashboard/inventory/products/${product.id}`))}
                    size="lg"
                    variant="secondary">
                    View Product
                </Button>
            </CardFooter>
        </Card>
    )
}
