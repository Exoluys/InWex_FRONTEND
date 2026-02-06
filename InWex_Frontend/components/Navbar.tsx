"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Separator } from "./ui/separator"
import { useAuth } from "@/contexts/AuthContext"

const Navbar = () => {
    const router = useRouter()
    const { user, logout } = useAuth()
    const isLoggedIn = !!user

    const handleDashboard = () => {
        router.push("/dashboard")
    }

    return (
        <header className="h-20 w-full bg-black/60 backdrop-blur-sm">
            <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer"
                    onClick={() => {
                        document.getElementById("home")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }}
                >
                    <Image src="/logo/InwexUpdatedTransparent.png" alt="InWex Logo" width={80} height={80} />
                </div>

                {/* Navigation Links */}
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    document.getElementById("features")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }}
                            >
                                Features
                            </Button>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    document.getElementById("about")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }}
                            >
                                About
                            </Button>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    document.getElementById("contact")
                                        ?.scrollIntoView({ behavior: "smooth" })
                                }}
                            >
                                Contact
                            </Button>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Auth Buttons */}
                <div className="w-50 flex justify-end">
                    <NavigationMenu>
                        {!isLoggedIn ? (
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Button variant="ghost" asChild>
                                        <Link href="/auth" className="px-4 py-2">Log in</Link>
                                    </Button>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-secondary text-secondary-foreground hover:bg-secondary/80">Sign up</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-48 gap-1">
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <Link href="/auth/org/signup" className="p-3">As Business</Link>
                                                </NavigationMenuLink>
                                            </li>
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <Link href="/auth?signup=true" className="p-3">As Employee</Link>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="h-10 w-10 cursor-pointer">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>
                                            {user.fullname?.slice(0, 2).toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="p-0 w-72">
                                    <Card className="border-none shadow-none">
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={user.avatar} />
                                                    <AvatarFallback>
                                                        {user.fullname?.slice(0, 2).toUpperCase() || "U"}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{user.fullname}</p>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <Separator />
                                        <CardContent>
                                            <Button
                                                variant="ghost"
                                                onClick={handleDashboard}
                                                className="w-full justify-start"
                                            >
                                                Dashboard
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={logout}
                                                className="w-full justify-start"
                                            >
                                                Log Out
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </NavigationMenu>
                </div>
            </div>
        </header>
    )
}

export default Navbar