import Navbar from "@/components/dashboard/navbar/Navbar"
import AddWarehouse from "@/components/dashboard/warehouses/warehouse/AddWarehouse"

const page = () => {
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center mt-40">
                <AddWarehouse />
            </div>
        </>
    )
}

export default page