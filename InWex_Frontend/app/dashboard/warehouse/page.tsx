import Navbar from "@/components/dashboard/navbar/Navbar"
import WarehouseContent from "@/components/dashboard/warehouse/WarehouseContent"

const page = () => {
    const navbarLeftContent = (
        <div className="text-4xl font-medium">Warehouse</div>
    )

    return (
        <>
            <Navbar leftContent={navbarLeftContent} />
            <WarehouseContent />
        </>
    )
}

export default page