import Navbar from "@/components/dashboard/navbar/Navbar"
import StaffContent from "@/components/dashboard/staff/StaffContent"

const page = () => {
    const navbarLeftContent = (
        <div className="text-4xl font-medium">Staff</div>
    )

    return (
        <>
            <Navbar leftContent={navbarLeftContent} />
            <StaffContent />
        </>
    )
}

export default page