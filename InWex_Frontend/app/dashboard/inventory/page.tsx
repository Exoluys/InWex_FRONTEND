"use client"

import InventoryContent from "@/components/dashboard/inventory/InventoryContent";
import Navbar from "@/components/dashboard/Navbar";

const page = () => {
    const navbarLeftContent = (
        <h1 className="text-4xl font-medium">Inventory</h1>
    )

    return (
        <>
            <Navbar leftContent={navbarLeftContent} />

            <InventoryContent />
        </>
    )
}

export default page