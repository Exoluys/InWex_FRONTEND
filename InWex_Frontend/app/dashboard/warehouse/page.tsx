import Navbar from "@/components/dashboard/Navbar"

const page = () => {
    const navbarLeftContent = (
        <div className="text-4xl font-medium">Warehouse</div>
    )

    return (
        <>
            <Navbar leftContent={navbarLeftContent} />
        </>
    )
}

export default page