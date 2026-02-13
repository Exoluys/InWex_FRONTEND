"use client"

import { useAuth } from "@/contexts/AuthContext"
import ManagerDashboard from "./(role)/(manager)/ManagerDashboard"
import StaffDashboard from "./(role)/(staff)/StaffDashboard"
import OrgDashboard from "./(role)/(org)/OrgDashboard"

const DashboardPage = () => {
    const { role, isLoading } = useAuth()

    if (isLoading) return <div>Loading...</div>
    if (!role) return null

    if (role.manager) return <ManagerDashboard />
    if (role.warehouse_staff) return <StaffDashboard />
    if (role.business) return <OrgDashboard />

    return <div>No authorized role found</div>
}

export default DashboardPage
