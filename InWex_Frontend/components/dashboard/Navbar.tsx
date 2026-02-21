"use client"

import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
    Card,
    CardHeader,
    CardContent,
} from "../ui/card"
import { useAuth } from "@/contexts/AuthContext"
import NotificationBell from "./NotificationBell"
import { MessageSquareMore } from "lucide-react"

interface NavbarProps {
    leftContent?: React.ReactNode
}

const Navbar = ({ leftContent }: NavbarProps) => {
    const { user, role } = useAuth()

    const userRole = role?.manager
        ? "Manager"
        : role?.business
            ? "Business"
            : "Warehouse Staff"

    if (!user) return null

    return (
        <div className="flex items-center justify-between w-full px-4">
            <div className="flex-1">{leftContent}</div>

            <div className="flex items-center gap-3">
                <Button variant="secondary" size="icon">
                    <MessageSquareMore className="h-4 w-4" />
                </Button>

                <NotificationBell />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-9 w-9 cursor-pointer">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                                {user.fullname?.slice(0, 2).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="p-0">
                        <Card className="w-72 border-none shadow-none">
                            <CardHeader className="flex flex-row items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>
                                        {user.fullname?.slice(0, 2).toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>

                                <div>
                                    <p className="text-sm font-medium">{user.fullname}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                            </CardHeader>

                            <CardContent className="text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Role</span>
                                    <span className="font-medium">{userRole}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Navbar