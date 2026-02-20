import Navbar from "@/components/dashboard/Navbar"
import { Product } from "@/lib/types"

const page = ({ product }: { product: Product }) => {
    const navbarLeftContent = (
        <h1 className="text-4xl font-medium">Product: {product.name}</h1>
    )

    return (
        <Navbar leftContent={navbarLeftContent} />
    )
}

export default page