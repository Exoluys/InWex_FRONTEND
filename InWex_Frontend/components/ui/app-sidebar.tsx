"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarHeader,
    SidebarGroup,
    SidebarFooter,
    SidebarGroupContent,
} from "./sidebar"
import {
    Settings,
    LogOut,
} from "lucide-react"
import { businessItems, managerItems, staffItems } from "../config/sidebar/sidebarItems"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

const AppSidebar = ({ role }: { role: string }) => {
    const pathname = usePathname()
    const { logout } = useAuth()
    const mainItems = role === "business" ? businessItems : role === "manager" ? managerItems : staffItems

    return (
        <Sidebar className="border-none">
            {/* Logo */}
            <SidebarHeader className="h-45 flex items-center text-4xl font-light mt-20 mr-3">
                <Image src="/logo/InwexUpdatedTransparent.png" alt="InWex Logo" width={130} height={130} priority />
            </SidebarHeader>

            {/* Main */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => {
                                const active = pathname === item.url
                                return (
                                    <SidebarMenuItem key={item.title} className="mb-3">
                                        <SidebarMenuButton asChild className="">
                                            <Link
                                                href={item.url}
                                                className={`
                                                    flex text-lg! items-center gap-5
                                                    px-4 py-7 transition-colors
                                                    ${active
                                                        ? "text-white"
                                                        : "text-neutral-400 hover:text-white"
                                                    }
                                                `}
                                            >
                                                <item.icon className="h-5! w-5! ml-7" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Bottom */}
            <SidebarFooter className="pb-10">
                <SidebarMenu>
                    <SidebarMenuItem className="mb-3">
                        <SidebarMenuButton
                            className="flex text-lg! items-center gap-5 px-4 py-7 transition-colors text-neutral-400 hover:text-white"
                        >
                            <Settings className="h-5! w-5! ml-7" />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="mb-3">
                        <SidebarMenuButton
                            onClick={logout}
                            className="flex text-lg! items-center gap-5 px-4 py-7 transition-colors text-neutral-400 hover:text-white"
                        >
                            <LogOut className="h-5! w-5! ml-7" />
                            <span>Log Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar